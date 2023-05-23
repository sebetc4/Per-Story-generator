// Librairie
import { useState } from 'react';
// MUI
import { Box, Button, Container, Divider, TextField, Typography } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
// App
import { setAlert, setFirstChapterData, createStory } from '@/store';
import { LoadingButton } from '@mui/lab';
import { useRouter } from 'next/router';
import { Routes } from '@/types';
import { useAppDispatch, useAppSelector } from '@/apps/front/hooks';
import { generateFirstChapter, isValidOpenAiKey } from '@/apps/front/utils';
import { CustomAutoResize } from '../../CustomAutoResize/CustomAutoResize';
import { StoryTitleModal } from './components';
import { logIf, logPrompt } from '@/package/constants';
import { getFirstChapterTextPrompt } from '@/apps/front/prompts';

type GeneratedData = {
    text: string;
    title: string;
    description: string;
} 

const initialGeneratedData = {
    text: '',
    title: '',
    description: '',
}

export const FirstChapterGenerator = () => {
    //Hooks
    const dispatch = useAppDispatch();
    const router = useRouter();

    //Store
    const { openAiKey } = useAppSelector((state) => state.openAiKey);

    // User inouts
    const [userText, setUserText] = useState('');
    const [protagonist, setProtagonist] = useState('');
    // Generated data
    const [generatedData, setGeneratedData] = useState<GeneratedData>(initialGeneratedData)
    // Story title
    const [openStoryTitleModal, setOpenStoryTitleModal] = useState(false);
    const [storyTitle, setStoryTitle] = useState('');
    // Loading
    const [isLoading, setIsLoading] = useState(false);

    const handleGenerateFirstChapter = async () => {
        try {
            setIsLoading(true);
            if (openAiKey === '') {
                throw new Error('Pas de clée openAI');
            }
            if (!isValidOpenAiKey(openAiKey)) {
                throw new Error("Cette clée openAI n'est pas valide");
            }
            const prompt = getFirstChapterTextPrompt(userText, protagonist);
            logIf(logPrompt, prompt);
            const firstChapter = await generateFirstChapter(prompt, openAiKey);
            setGeneratedData({
                text: firstChapter!.text,
                title: firstChapter!.title,
                description: firstChapter!.description,
            })
            setIsLoading(false);
            dispatch(setAlert({ type: 'success', message: 'Chapitre généré avec succès' }));
        } catch (err: any) {
            dispatch(setAlert({ type: 'error', message: err.message }));
            setIsLoading(false);
        }
    };

    const handleCreateStory = async () => {
        try {
            await dispatch(createStory({
                storyTitle,
                chapterTitle: generatedData.title,
                text: generatedData.text,
                description: generatedData.description,
                protagonist
            }))
            dispatch(setFirstChapterData({ text: generatedData.text, title: generatedData.title }));
            router.push(Routes.CHAPTER_GENERATOR);
        } catch (err: any) {
            dispatch(setAlert({ type: 'error', message: err.message }));
        }
    };

    const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setGeneratedData(prev => ({ ...prev, title: e.target.value }));
    };
    const handleChangeText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setGeneratedData(prev => ({ ...prev, text: e.target.value }));
    };
    const handleChangeDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setGeneratedData(prev => ({ ...prev, description: e.target.value }));
    };

    const disabledGeneratorButton = userText === '' || protagonist === '';
    const disabledValidButton =
        generatedData.text === '' || generatedData.title === '' || generatedData.description === '' || protagonist === '';

    return (
        <Container maxWidth='md'>
            <Box
                component='section'
                sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}
            >
                <Typography
                    variant='h2'
                    component='h2'
                    textAlign='center'
                >
                    Résumé du premier chapitre
                </Typography>
                <CustomAutoResize
                    placeholder='Le résumé de votre premier chapitre...'
                    minRows={8}
                    maxRows={12}
                    onChange={(e) => setUserText(e.target.value)}
                    value={userText}
                />
                <TextField
                    label='Nom du personnage principal'
                    onChange={(e) => setProtagonist(e.target.value)}
                    value={protagonist}
                    sx={{
                        width: '300px',
                        alignSelf: 'center',
                    }}
                />
                <LoadingButton
                    loading={isLoading}
                    loadingPosition='end'
                    disabled={disabledGeneratorButton}
                    onClick={handleGenerateFirstChapter}
                    variant='contained'
                    size='large'
                    sx={{
                        alignSelf: 'center',
                    }}
                    endIcon={<RefreshIcon />}
                >
                    Générer
                </LoadingButton>
            </Box>
            <Divider
                flexItem
                sx={{ mt: 6, mb: 6 }}
            />
            <Box
                component='section'
                sx={{ display: 'flex', flexDirection: 'column', mt: 2, gap: 4 }}
            >
                <Typography
                    variant='h2'
                    component='h2'
                    textAlign='center'
                    sx={{ mb: 2 }}
                >
                    Le premier chapitre
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 4, justifyContent: 'center' }}>
                    <Typography
                        sx={{
                            fontSize: '1.5rem',
                            fontWeight: 'bold',
                        }}
                    >
                        Titre:
                    </Typography>
                    <TextField
                        value={generatedData.title}
                        onChange={handleChangeTitle}
                        sx={{ minWidth: '500px' }}
                        variant='standard'
                    />
                </Box>
                <CustomAutoResize
                    placeholder='Le premier chapitre...'
                    minRows={8}
                    maxRows={12}
                    onChange={handleChangeText}
                    value={generatedData.text}
                />
                <Box sx={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                    <Typography sx={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Descriptions du chapitre</Typography>
                    <CustomAutoResize
                        placeholder='Description du chapitre...'
                        minRows={2}
                        maxRows={4}
                        onChange={handleChangeDescription}
                        value={generatedData.description}
                    />
                </Box>
                <Button
                    disabled={disabledValidButton}
                    onClick={() => setOpenStoryTitleModal(true)}
                    variant='contained'
                    size='large'
                    sx={{
                        alignSelf: 'center',
                    }}
                >
                    Valider
                </Button>
            </Box>
            <StoryTitleModal
                isOpen={openStoryTitleModal}
                handleClose={() => setOpenStoryTitleModal(false)}
                storyTitle={storyTitle}
                setStoryTitle={setStoryTitle}
                handleValid={handleCreateStory}
            />
        </Container>
    );
};
