import { CustomError } from '@/package/classes';
import { Chapter, Story } from '../models';
import { authUser } from '../utils';
import { catchControllerError } from '../utils/error.utils';
import { onSuccess } from '../utils/success.utils';

export const getOneStory = catchControllerError(async (req, res) => {
    const storyId = req.query.id;
    const user = await authUser(req);
    const story = await Story.findById(storyId);
    if (!user.isAuthor(story.author)) {
        throw CustomError.BAD_REQUEST
    }
    onSuccess(200, { story }, res);
});

export const getAllStoryTitles = catchControllerError(async (req, res) => {
    const user = await authUser(req);
    const storyTitles = await Story.find({author: user.id}, ['title']);
    onSuccess(200, { storyTitles }, res);
});

export const createStory = catchControllerError(async (req, res) => {
    const { storyTitle, chapterTitle, text, description, protagonist } = req.body;
    const user = await authUser(req);
    const chapter = await Chapter.create({ title: chapterTitle, text, description });
    const firstChapter = [chapter.id];
    const secondChapter = new Array(3).fill('');
    const thirdChapter = new Array(6).fill('');
    const fourthChapter = new Array(12).fill('');
    const fifthChapter = new Array(24).fill('');
    const story = await Story.create({
        author: user.id,
        title: storyTitle,
        story: [firstChapter, secondChapter, thirdChapter, fourthChapter, fifthChapter],
        protagonist,
    });
    onSuccess(201, { chapterId: chapter.id, storyId: story.id, storyTitle, protagonist }, res);
});

export const deleteStory = catchControllerError(async (req, res) => {
    const storyId = req.query.id;
    const user = await authUser(req);
    const story = await Story.findByIdAndDelete(storyId);
    if (!user.isAuthor(story.author)) {
        throw CustomError.BAD_REQUEST
    }
    story.story.forEach((row: string[]) => {
        row.forEach(async (chapterId: string) => {
            if (chapterId !== '') {
                 await Chapter.findByIdAndDelete(chapterId);
            }
        });
    });
    onSuccess(200, { message: 'Story successfully deleted' }, res);
});
