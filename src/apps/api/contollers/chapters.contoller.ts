import { CustomError } from '@/package/classes';
import { cloudinary } from '../configs';
import { Chapter, Story } from '../models';
import { authUser, catchControllerError } from '../utils';

export const createChapter = catchControllerError(async (req, res) => {
    const { title, text, summary, allChoices, description, rowIndex, chapterIndex, storyId } = req.body;
    const user = await authUser(req);
    const chapter = await Chapter.create({
        author: user.id,
        title,
        text,
        summary,
        allChoices,
        description,
    });
    const story = await Story.findById(storyId);
    const newStory = story.story.map((row: string[], i: number) => {
        if (i !== rowIndex) {
            return row;
        } else {
            return row.map((id: string, j: number) => {
                return j !== chapterIndex ? id : chapter.id;
            });
        }
    });
    story.story = newStory;
    await story.save();
    res.status(201).json({ chapterId: chapter.id });
});

export const getOneChapter = catchControllerError(async (req, res) => {
    const chapterId = req.query.id;
    const user = await authUser(req);
    const chapter = await Chapter.findById(chapterId);
    if (!user.isAuthor(chapter.author)) {
        throw CustomError.BAD_REQUEST
    }
    res.status(200).json({ chapter });
});

export const modifyOneChapter = catchControllerError(async (req, res) => {
    const chapterId = req.query.id;
    const { title, text, summary, allChoices, description, image } = req.body;
    const user = await authUser(req);
    const chapter = await Chapter.findById(chapterId);
    if (!user.isAuthor(chapter.author)) {
        throw CustomError.BAD_REQUEST
    }
    chapter.title = title;
    chapter.text = text;
    chapter.description = description;
    if (summary) {
        chapter.summary = summary;
    }
    chapter.allChoices = allChoices;
    if (image) {
        chapter.image.public_id && cloudinary.destroy(chapter.image.public_id);
        const result = await cloudinary.upload(image, {
            folder: `afrikanan-book`,
        });
        chapter.image = {
            public_id: result.public_id,
            url: result.secure_url,
        };
    }
    await chapter.save();
    res.status(200).json({ messgae: 'Chapter is Saved' });
});
