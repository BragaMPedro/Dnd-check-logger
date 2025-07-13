"use client";

import { getAbilityScoresById, getSkillById } from "@/services/dndApi";
import { AbilityScoreDetailsResponse, SkillDetailsResponse } from "@/types/AbilityScore";
import { createContext, ReactNode, useContext, useState } from "react";

// Tipagem para o valor do contexto
interface CacheContextType {
    getCachedAbilityDetails: (abilityIndex: string) => Promise<AbilityScoreDetailsResponse>;
    getCachedSkillDetails: (skillIndex: string) => Promise<SkillDetailsResponse>;
}

// Criando o contexto
const CacheContext = createContext<CacheContextType | undefined>(undefined);

export const CacheProvider = ({ children }: { children: ReactNode }) => {
    // Usamos Map para um cache mais performático (O(1) para busca por chave)
    const [abilitiesCache, setAbilitiesCache] = useState<Map<string, AbilityScoreDetailsResponse>>(new Map());
    const [skillsCache, setSkillsCache] = useState<Map<string, SkillDetailsResponse>>(new Map());

    // Checa Cache e faz requisição se necessário
    const getCachedAbilityDetails = async (abilityIndex: string): Promise<AbilityScoreDetailsResponse> => {
        if (abilitiesCache.has(abilityIndex)) {
            return abilitiesCache.get(abilityIndex)!;
        }

        const { data } = await getAbilityScoresById(abilityIndex);
        
        // Atualiza o cache de forma imutável
        setAbilitiesCache(prevCache => new Map(prevCache).set(abilityIndex, data));
        
        return data;
    };

    // Função para buscar detalhes de uma Perícia (com cache)
    const getCachedSkillDetails = async (skillIndex: string): Promise<SkillDetailsResponse> => {
        if (skillsCache.has(skillIndex)) {
            return skillsCache.get(skillIndex)!;
        }

        const { data } = await getSkillById(skillIndex);

        setSkillsCache(prevCache => new Map(prevCache).set(skillIndex, data));

        return data;
    };

    const value = {
        getCachedAbilityDetails,
        getCachedSkillDetails,
    };

    return (
        <CacheContext.Provider value={value}>
            {children}
        </CacheContext.Provider>
    );
};

export const useCacheContext = () => {
    const context = useContext(CacheContext);
    if (context === undefined) {
        throw new Error("useCacheContext deve ser usado dentro de um CacheProvider");
    }
    return context;
};
