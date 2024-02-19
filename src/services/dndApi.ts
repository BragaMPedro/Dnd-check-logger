import { AbilityScoreDetailsResponse, AbilityScoresResponse, SkillDetailsResponse } from '@/types/AbilityScore';
import axios, { AxiosResponse } from 'axios';

const DndApi = axios.create({
  baseURL: 'https://www.dnd5eapi.co/api'
});

export const getAbilityScores = (): Promise<AxiosResponse<AbilityScoresResponse>> =>{
    return DndApi.get("/ability-scores")
};

export const getAbilityScoresById = (index:string): Promise<AxiosResponse<AbilityScoreDetailsResponse>> => {
    return DndApi.get("/ability-scores/" + index)
};

export const getSkillById = (index:string): Promise<AxiosResponse<SkillDetailsResponse>> => {
    return DndApi.get("/skills/" + index)
};