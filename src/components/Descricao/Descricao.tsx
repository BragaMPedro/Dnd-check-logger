import { SelectedAbilityProps } from "@/types/AbilityScore";

interface DescricaoProps{
    content: SelectedAbilityProps
}

export const Descricao = ({content}: DescricaoProps) => {
    return (
        <div id="ability-descricao" className="space-y-2">
            <h2 className={"mb-6"}>{content.nome}</h2>
            <p>{content.descricao[0]}</p>
            <p>{content.descricao[1]}</p>
         </div>
    )
};