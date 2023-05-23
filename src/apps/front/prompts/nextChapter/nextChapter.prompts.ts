import { PromptParams } from '@/types';
import { getInitialSentance } from '../common/common';
import { formatSentence } from './nextChapterformatSentence.prompt';

export const getNextChapterPrompt = ({
    isEnd,
    previousChapterText,
    summary,
    chapterTheme,
    allChoices,
    selectedChoice,
    numbOfChoice,
    allRequiredWords,
    protagonist,
}: PromptParams) =>
    `${getInitialSentance(protagonist)} Ta tâche est de générer la ${isEnd ? 'fin' : 'suite'} de cette histoire. ${
        summary ? `Voici le résumé de l'histoire: ${summary}}` : ''
    } Voici le précédent chapitre: ${previousChapterText}. ${
        allChoices
            ? `Voici mon choix pour la suite de l'histoire: ${allChoices[selectedChoice!]}.`
            : ''
    }   ${!!chapterTheme ? `Le chapitre doit aborder le thème suivant: ${chapterTheme}.` : ''} ${
        allRequiredWords && allRequiredWords?.length > 0
            ? `Le chapitre doit comporter les mots clés suivants: ${allRequiredWords.toString()}.`
            : ''
    }  ${formatSentence(numbOfChoice)}.`;
