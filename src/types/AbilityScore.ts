export interface AbilityScoresResponse {
    count:   number;
    results: Result[];
};

export interface Result {
    index: string;
    name:  string;
    url:   string;
};

export interface AbilityScoreDetailsResponse {
    index:     string;
    name:      string;
    full_name: string;
    desc:      string[];
    skills:    CheckMinified[];
    url:       string;
};

export interface SkillDetailsResponse {
    index:         string;
    name:          string;
    desc:          string[];
    ability_score: CheckMinified;
    url:           string;
};

export interface CheckMinified {
    name:  string;
    index: string;
    url:   string;
};

export interface SelectedAbilityProps {
    nome: string;
    descricao: string[];
 };
 