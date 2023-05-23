export const formatSentence = (numbOfChoice: number): string => {
    const commonFormat = `L'histoire doit être sous forme d'un objet JSON avec le format suivant:
        {
            "title": "titre du chapitre (maximum 10 mots)",
            "text": "Le chapitre",
            "summary": "le résumé de l'histoire depuis le début (environ 500 mots)",
            "description": "Une courte description de la scène afin de générer une image (environ 10 mots)",
        `;

    const choiceOptions = [
        '',
        `"choice1": "Le premier choix",`,
        `"choice1": "Le premier choix",
        "choice2": "Le second choix",`,
    ];

    return `${commonFormat}${choiceOptions[numbOfChoice]}}`;
};
