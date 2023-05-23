import { Box, Divider, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
    ChapterTheme,
    PreviousChapter,
    PreviousChapterChoices,
    PreviousSummary,
    RequiredWords,
    SendRequest,
} from './components';
import { fetchChapterDataForGeneration } from '@/store';
import { useAppDispatch } from '@/apps/front/hooks';
import { LoaderContainer } from '../../loader/LoaderContainer/LoaderContainer';

export const ChapterGenerator = () => {
    // Hooks
    const { query } = useRouter();
    const dispatch = useAppDispatch();

    // State
    const [isInitilized, setIsInitialized] = useState(false);

    useEffect(() => {
        const storyId = query.id;
        const fetchChapter = async () => {
            typeof storyId === 'string' && (await dispatch(fetchChapterDataForGeneration(storyId)));
            setIsInitialized(true);
        };
        storyId ? fetchChapter() : setIsInitialized(true);
    }, [query.id, dispatch]);

    return !isInitilized ? (
        <LoaderContainer />
    ) : (
        <>
            <Box
                sx={{
                    display: 'flex',
                    gap: 12,
                }}
            >
                <Box
                    sx={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 8,
                    }}
                >
                    <Typography
                        component='h2'
                        variant='h2'
                        textAlign='center'
                    >
                        Chapitre précédent
                    </Typography>
                    <PreviousChapter />
                    <Divider sx={{ ml: 16, mr: 16 }} />
                    <PreviousChapterChoices />
                    <Divider sx={{ ml: 16, mr: 16 }} />
                    <PreviousSummary />
                </Box>
                <Box
                    sx={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 8,
                    }}
                >
                    <Typography
                        component='h2'
                        variant='h2'
                        textAlign='center'
                    >
                        Prochain chapitre
                    </Typography>
                    <ChapterTheme />
                    <Divider sx={{ ml: 16, mr: 16 }} />
                    <RequiredWords />
                </Box>
            </Box>
            <Divider
                flexItem
                sx={{ mt: 6, mb: 6 }}
            />
            <SendRequest />
        </>
    );
};
