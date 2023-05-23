// Librairies
import { useRouter } from 'next/router';
// MUI
import { Box } from '@mui/material';
// App
import { setAlert, setGeneratedData, setIsLoading } from '@/store';
import { PromptParams, Routes } from '@/types';
import { useAppDispatch, useAppSelector } from '@/apps/front/hooks';
import { generateNextChapter, isValidOpenAiKey } from '@/apps/front/utils';
import { CustomLoadingButton } from '@/apps/front/components';
import { logIf, logPrompt, numbOfChoiceByRow } from '@/package/constants';
import { checkEvenNumber } from '@/apps/front/utils/number/number.utils';
import { getNextChapterPrompt } from '@/apps/front/prompts';

export const SendRequest = () => {
    // Hooks
    const dispatch = useAppDispatch();
    const router = useRouter();

    // Store
    const { previousChapter, nextChapter, isLoading } = useAppSelector((state) => state.chapterGenerator);
    const { openAiKey } = useAppSelector((state) => state.openAiKey);
    const { storyData } = useAppSelector((state) => state.storyInProgress);

    const selectedChoice = checkEvenNumber(storyData.currentChapter[1]);

    const handleGenerateNextChapter = async () => {
        dispatch(setIsLoading(true));
        try {
            if (openAiKey === '') {
                throw new Error('Pas de clée openAI');
            }
            if (!isValidOpenAiKey(openAiKey)) {
                throw new Error("Cette clée openAI n'est pas valide");
            }
            if (nextChapter.themeIsEnabled && nextChapter.theme === '') {
                throw new Error('Vous devez choisir un thème ou désactiver le thème');
            }
            const numbOfChoice = numbOfChoiceByRow[storyData.currentChapter[0]];

            const promptParams: PromptParams = {
                isEnd: storyData.currentChapter[0] === 3,
                previousChapterText: previousChapter.text,
                chapterTheme: nextChapter.theme,
                numbOfChoice,
                allChoices: previousChapter.allChoices,
                selectedChoice,
                allRequiredWords: nextChapter.allRequiredWords,
                protagonist: storyData.protagonist,
                summary: previousChapter.summary,
            };
            const prompt = getNextChapterPrompt(promptParams);
            logIf(logPrompt, { prompt });
            const chapterData = await generateNextChapter(prompt, numbOfChoice, openAiKey);
            dispatch(setGeneratedData(chapterData!));
            dispatch(setIsLoading(false));
            router.push(Routes.CHAPTER_VALIDATION);
        } catch (err: any) {
            dispatch(setIsLoading(false));
            dispatch(setAlert({ type: 'error', message: err.message }));
        }
    };

    return (
        <Box sx={{ flex: 2, display: 'flex', justifyContent: 'center' }}>
            <CustomLoadingButton
                variant='contained'
                onClick={handleGenerateNextChapter}
                loading={isLoading}
                disabled={isLoading}
                sx={{
                    p: 3,
                    borderRadius: 6,
                }}
            >
                Générer le chapitre
            </CustomLoadingButton>
        </Box>
    );
};
