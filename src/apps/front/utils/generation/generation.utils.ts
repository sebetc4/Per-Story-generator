// Librairies
import { Configuration, OpenAIApi } from 'openai';
// App
import { ChapterType, GeneratedChapterType } from '@/types';
import { logIf, logOpenAiRequest, logOpenAiResponse, logParsedData } from '@/package/constants';


const isObject = (obj: any): boolean => Object.prototype.toString.call(obj) === '[object Object]';

const isTypeOfString = (value: any): boolean => {
    return typeof value === 'string';
};

const validFirstChapter = (obj: any) => {
    const requiredFields = ['title', 'text', 'description'];
    return isObject(obj) && requiredFields.every((field) => isTypeOfString(obj[field]));
};

const validNextChapter = (obj: any, numbOfChoice: number) => {
    const requiredFields = ['title', 'text', 'summary', 'description'];
    const additionalFields = ['choice1', 'choice2', 'choice3'];

    const fieldsToCheck =
        numbOfChoice === 0 ? requiredFields : [...requiredFields, ...additionalFields.slice(0, numbOfChoice)];

    return isObject(obj) && fieldsToCheck.every((field) => isTypeOfString(obj[field]));
};

function convertToChapterType(generatedChapter: GeneratedChapterType): ChapterType {
    const allChoices: string[] = [];

    // Push all choice values to the allChoices array, if they exist
    for (const key in generatedChapter) {
        if (key.startsWith('choice')) {
            const choice = generatedChapter[key];
            if (choice) {
                allChoices.push(choice);
            }
        }
    }
    return {
        title: generatedChapter.title,
        text: generatedChapter.text,
        summary: generatedChapter.summary,
        allChoices,
        description: generatedChapter.description,
    };
}

const requestTextOptions = {
    model: 'text-davinci-003',
    max_tokens: 3000,
    temperature: 1,
};

export const generateFirstChapter = async (prompt: string, apiKey: string) => {
    return await generateData(prompt, 0, apiKey, true);
};

export const generateNextChapter = async (prompt: string, numbOfChoice: number, apiKey: string) => {
    const generatedData = await generateData(prompt, numbOfChoice, apiKey, false);
    return convertToChapterType(generatedData!);
};

const generateData = async (prompt: string, numbOfChoice: number, apiKey: string, firstChapter: boolean) => {
    const configuration = new Configuration({ apiKey });
    const openai = new OpenAIApi(configuration);
    let count = 0;
    while (true) {
        let openAiResponse;
        try {
            // Send Request to OpenAI
            logIf(logOpenAiRequest, `Send OpenAI request at ${Date()}`);
            openAiResponse = await openai.createCompletion({ ...requestTextOptions, prompt });
            logIf(logOpenAiRequest, `OpenAI response received at ${Date()}`);
            // Parse the response
            const generatedData = openAiResponse!.data.choices[0].text;
            generatedData?.trim().replace('\n', '');
            logIf(logOpenAiResponse, { generatedData });
            const paredsedData: GeneratedChapterType = JSON.parse(generatedData!);
            logIf(logParsedData, { paredsedData });
            // Check if the data is valid
            if (
                generatedData &&
                (firstChapter ? validFirstChapter(paredsedData) : validNextChapter(paredsedData, numbOfChoice))
            ) {
                return paredsedData
            } else {
                console.error(`La donnée n\'est pas valide | tententative ${count + 1}/3`);
            }
        } catch (err) {
            console.error(`Erreur lors du parrsage des données: ${err}`);
        }
        if (++count >= 3) {
            alert('Echec lors de la génération des données');
            break;
        }
    }
};
