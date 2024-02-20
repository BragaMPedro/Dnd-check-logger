import { SelectedAbilityProps } from "@/types/AbilityScore";

interface DescricaoColapsableProps {
   content: SelectedAbilityProps;
}

export const DescricaoColapsable = ({ content }: DescricaoColapsableProps) => {
   return (
      <div className="collapse collapse-arrow bg-[#00b5ff30]">
         <input type="checkbox" name="details-collapsable" />
         <div className="collapse-title text-lg font-medium">{content.nome + " Details"}</div>
         <div className="collapse-content text-sm space-y-2">
            <p>{content.descricao[0]}</p>
            <p>{content.descricao[1]}</p>
         </div>
      </div>
   );
};
