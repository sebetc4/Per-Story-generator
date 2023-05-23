// Librairies
import { useRouter } from 'next/router';

// MUI
import { Box, Button } from '@mui/material';

// App
import { Routes } from '@/types';
import { Choices, Description, Summary, Text, Title } from './components';
import { useAppDispatch, useAppSelector } from '@/apps/front/hooks';
import { api } from '@/services';
import { resetChapterGeneratorState, resetChapterValidationState, setChapterIsCompleted } from '@/store';

export const ChapterValidation = () => {
    // Hooks
    const router = useRouter();
    const dispatch = useAppDispatch();

    //Store
    const { storyData } = useAppSelector((state) => state.storyInProgress);
    const { currentChapter, id: storyId } = storyData;
    const { generatedData } = useAppSelector((state) => state.chapterValidation);
    const { text, allChoices, summary, title, description } = generatedData;

    const handleValidData = async () => {
        const { data } = await api.createChapter({
            text,
            allChoices,
            summary,
            title,
            description,
            rowIndex: currentChapter[0],
            chapterIndex: storyData.currentChapter[1],
            storyId,
        });
        dispatch(
            setChapterIsCompleted({ id: data.chapterId, rowIndex: currentChapter[0], chapterIndex: currentChapter[1] })
        );
        dispatch(resetChapterGeneratorState());
        router.push(Routes.STORY_SCHEMA);
    };

    const handleBack = () => {
        dispatch(resetChapterGeneratorState())
        dispatch(resetChapterValidationState())
        router.push(Routes.CHAPTER_GENERATOR);
    }

    return (
        <>
            <Box
                component='main'
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 6,
                }}
            >
                <Title />
                <Text />
                {<Choices />}
                <Summary />
                <Description />
                <Box sx={{ display: 'flex', gap: 4 }}>
                    <Button
                        variant='contained'
                        size='large'
                        onClick={handleBack}
                    >
                        Retour
                    </Button>
                    <Button
                        variant='contained'
                        size='large'
                        onClick={handleValidData}
                    >
                        Continuer
                    </Button>
                </Box>
            </Box>
        </>
    );
};
