// MUI
import { useAppDispatch, useAppSelector } from '@/apps/front/hooks';
import { parents } from '@/package/constants/chapter.constants';
import { api } from '@/services';
import { Routes, StoryTitle } from '@/types';
import { Box, Divider, SelectChangeEvent, Typography, useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { LoaderContainer } from '../../loader/LoaderContainer/LoaderContainer';
import { StoryChoice } from './components';
import { fetchSelectedStory, resetStoryInProgressState, setCurrentChapter } from '@/store';

const secondChapter = new Array(3).fill('');
const thirdChapter = new Array(6).fill('');
const fourthChapter = new Array(12).fill('');
const fifthChapter = new Array(24).fill('');

export const StorySchema = () => {
    // Store
    const { storyData, isLoading } = useAppSelector((state) => state.storyInProgress);
    const { story, id: storyId } = storyData;
    const dispatch = useAppDispatch();

    // State
    const [titlesAreLoading, setTitlesAreLoading] = useState<boolean>(true);
    const [allStoryTitles, setAllStoryTitles] = useState<StoryTitle[]>([]);

    useEffect(() => {
        const fetchAllStoriesTitles = async () => {
            const { data } = await api.getAllStoryTitles();
            setAllStoryTitles(data.storyTitles);
            setTitlesAreLoading(false);
        };
        fetchAllStoriesTitles();
    }, []);

    const handleChangeSelectedStory = async (e: SelectChangeEvent) => {
        dispatch(fetchSelectedStory(e.target.value));
    };

    const handleDeleteStory = async (storyId: string) => {
        await api.deleteStory(storyId);
        setAllStoryTitles(allStoryTitles.filter((story) => story._id !== storyId));
        dispatch(resetStoryInProgressState());
    };

    return titlesAreLoading ? (
        <LoaderContainer />
    ) : (
        <>
            <Box component='section'>
                <StoryChoice
                    selectedStory={storyId}
                    allStoryTitles={allStoryTitles}
                    handleChangeSelectedStory={handleChangeSelectedStory}
                    handleDeleteStory={handleDeleteStory}
                />
            </Box>
            <Divider
                flexItem
                sx={{ mt: 8, mb: 8 }}
            />
            {isLoading ? (
                <Box>
                    <LoaderContainer />
                </Box>
            ) : (
                <>
                    {storyId === '' ? (
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Typography
                                variant='h2'
                                component='h2'
                            >
                                Aucune histoire en cours
                            </Typography>
                        </Box>
                    ) : (
                        <Box
                            component='section'
                            sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}
                        >
                            <Typography
                                variant='h2'
                                component='h2'
                                sx={{ mb: 4 }}
                            >
                                Schéma de l'histoire en cours
                            </Typography>
                            <ChapterBox
                                id={story[0][0]}
                                rowIndex={0}
                                chapterIndex={0}
                            />
                            <Box sx={{ display: 'flex', gap: {xs: 40, xl: 65} }}>
                                {secondChapter.map((_, i) => (
                                    <ChapterBox
                                        key={`1-${i}`}
                                        id={story[1][i]}
                                        rowIndex={1}
                                        chapterIndex={i}
                                    />
                                ))}
                            </Box>
                            <Box sx={{ display: 'flex',  gap: {xs: 19, xl: 30} }}>
                                {thirdChapter.map((_, i) => (
                                    <ChapterBox
                                        key={`1-${i}`}
                                        id={story[2][i]}
                                        rowIndex={2}
                                        chapterIndex={i}
                                    />
                                ))}
                            </Box>
                            <Box sx={{ display: 'flex', gap: {xs: 7.6, xl: 11.5} }}>
                                {fourthChapter.map((_, i) => (
                                    <ChapterBox
                                        key={`1-${i}`}
                                        id={story[3][i]}
                                        rowIndex={3}
                                        chapterIndex={i}
                                    />
                                ))}
                            </Box>
                            <Box sx={{ display: 'flex', gap: 2 }}>
                                {fifthChapter.map((_, i) => (
                                    <ChapterBox
                                        key={`1-${i}`}
                                        id={story[4][i]}
                                        rowIndex={4}
                                        chapterIndex={i}
                                    />
                                ))}
                            </Box>
                        </Box>
                    )}
                </>
            )}
        </>
    );
};

type ChapterBoxProps = {
    id: string;
    rowIndex: number;
    chapterIndex: number;
};

const ChapterBox = ({ id, rowIndex, chapterIndex }: ChapterBoxProps) => {
    // Hooks
    const theme = useTheme();
    const router = useRouter();
    const dispatch = useAppDispatch();

    // Store
    const { storyData } = useAppSelector((state) => state.storyInProgress);

    const parent = parents[rowIndex][chapterIndex];
    const parentRow = parent[0];
    const parentIndex = parent[1];
    const parentId = storyData.story[parentRow][parentIndex];

    const isClickable = id !== '' || parentId !== '';
    const backgroundColor =
        id !== '' ? theme.palette.success.main : parentId !== '' ? theme.palette.grey[400] : 'transparent';

    const handleClick = () => {
        if (id !== '') {
            router.push(`${Routes.CHAPTER_MODIFICATION}?id=${id}`);
        } else if (parentId !== '') {
            router.push(`${Routes.CHAPTER_GENERATOR}?id=${parentId}`);
            dispatch(setCurrentChapter({ rowIndex, chapterIndex }));
        }
    };

    return (
        <Box
            sx={{
                width: {xs: 30, xl: 60},
                height: {xs: 30, xl: 60},
                borderRadius: 2,
                border: 'grey 2px solid',
                transition: 'all 0.3s ease',
                cursor: isClickable ? 'pointer' : 'default',
                backgroundColor,
                '&:hover': {
                    border: isClickable ? `${theme.palette.primary.main} 2px solid` : 'grey 2px solid',
                },
            }}
            onClick={handleClick}
        />
    );
};
