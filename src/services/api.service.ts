import { SignUpReq } from '@/package/types/request.types';
import {
    CreateChapterBody,
    CreateChapterRes,
    CreateStoryBody,
    CreateStoryRes,
    GetAllStoryTitlesRes,
    GetOneChapterRes,
    GetOneStoryRes,
    ModifyChapterBody,
} from '@/types';
import axios, { AxiosInstance } from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_URL!;

class ApiService {
    api: AxiosInstance;

    constructor() {
        this.api = axios.create({
            baseURL,
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json',
            },
        });
    }
    /*
    /   Auth
    */
   signUp(body: SignUpReq) {
         return this.api.post('/auth/signup', body);
    }

    /*
    /   Stories
    */
    createStory(body: CreateStoryBody) {
        return this.api.post<CreateStoryRes>('/stories', body);
    }
    getOneStory(storyId: string) {
        return this.api.get<GetOneStoryRes>(`/stories/${storyId}`);
    }
    getAllStoryTitles() {
        return this.api.get<GetAllStoryTitlesRes>('/stories');
    }
    deleteStory(storyId: string) {
        return this.api.delete(`/stories/${storyId}`)
    } 

    /*
    /   Chhapter
    */
    createChapter(body: CreateChapterBody) {
        return this.api.post<CreateChapterRes>('/chapters', body);
    }
    getOneChapter(chapterId: string) {
        return this.api.get<GetOneChapterRes>(`/chapters/${chapterId}`);
    }
    modifyOneChapter(chapterId: string, body: ModifyChapterBody) {
        return this.api.put(`/chapters/${chapterId}`, body);
    }
}

export const api = new ApiService();
