import { getInitialSentance } from "../common/common";

export const getFirstChapterTextPrompt = (firstChapterDetails: string, protagonist: string) => `${getInitialSentance(protagonist)} Ta tâche est la de générer le premier chapitre d'une histoire. Voici quelques détails concernant le chapitre ${firstChapterDetails}. L'histoire doit être sous forme d'un objet JSON avec le format suivant:
{
    "title": "Le titre du chapitre",
    "text": "Le chapitre",
    "description": "Une courte description de la scène afin de générer une image (environ 10 mots)",
}`