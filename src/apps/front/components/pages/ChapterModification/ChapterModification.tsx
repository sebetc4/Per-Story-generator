// Librairies
import { useRouter } from 'next/router';

// MUI
import { Box, Button } from '@mui/material';

// App
import { Choices, Description, ImageSection, Summary, Text, Title } from './components';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/apps/front/hooks';
import { fetchChapterDataForModification, setAlert } from '@/store';
import { ModifyChapterBody, Routes } from '@/types';
import { LoaderContainer } from '../../loader/LoaderContainer/LoaderContainer';
import { LoadingButton } from '@mui/lab';
import { api } from '@/services';

export const ChapterModification = () => {
    // Hooks
    const { query, push } = useRouter();
    const storyId = query.id as string;

    const dispatch = useAppDispatch();

    // Store
    const { modifiedData, isLoading } = useAppSelector((state) => state.chapterModification);
    const { title, text, summary, allChoices, description } = modifiedData;

    // State
    const [isInitialized, setIsInitialized] = useState(false);
    const [image, setImage] = useState<string | ArrayBuffer | null>(null);

    useEffect(() => {
        const fetchChapter = async () => {
            typeof storyId === 'string' && (await dispatch(fetchChapterDataForModification(storyId)));
            setIsInitialized(true);
        };
        storyId ? fetchChapter() : push(Routes.STORY_SCHEMA);
    }, [storyId, dispatch, push]);

    const handleModifyData = async () => {
        try {
            const modifyChapterBody: ModifyChapterBody = { title, text, summary, allChoices, description };
            if (image && typeof image === 'string') {
                modifyChapterBody.image = image;
            }
            const res = await  api.modifyOneChapter(storyId, modifyChapterBody);
            push(Routes.STORY_SCHEMA);
        } catch (err: any) {
            dispatch(setAlert({type: 'error', message: err.message}))
        }
    };

    return !isInitialized ? (
        <LoaderContainer />
    ) : (
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
                <ImageSection setImage={setImage} />
                {modifiedData.allChoices.length > 0 && <Choices />}
                {modifiedData.summary && <Summary />}
                <Description />
                <Box>
                    <LoadingButton
                        loading={isLoading}
                        disabled={isLoading}
                        variant='contained'
                        size='large'
                        onClick={handleModifyData}
                    >
                        Modifier
                    </LoadingButton>
                </Box>
            </Box>
        </>
    );
};
