"use client";

import { useCacheContext } from "@/contexts/CacheContext";
import { AbilityScoreDetailsResponse, SelectedAbilityProps } from "@/types/AbilityScore";
import { ChangeEvent, Dispatch, SetStateAction, useCallback, useState } from "react";
import { DescricaoColapsable } from "../Descricao/DescricaoColapsable";
import { StatSelector } from "../StatSelector/StatSelector";

interface SkillSelectorProps {
   abilities: string[];
   savingThrow: boolean;
   setSavingThrow: Dispatch<SetStateAction<boolean>>;
   setSkills: Dispatch<SetStateAction<string[]>>;
}

export const AbilitySelector = ({
   abilities,
   savingThrow,
   setSavingThrow,
   setSkills,
}: SkillSelectorProps) => {
   const [selectedAbility, setSelectedAbility] = useState<SelectedAbilityProps | undefined>();
   const [disableCheckbox, setDisableCheckbox] = useState<boolean>(false);
   const { getCachedAbilityDetails } = useCacheContext();

   /**
    * Handles the selection of an ability score.
    * Fetches ability details, updates selected ability state, sets skills, and manages saving throw checkbox.
    * @param {string} e - value selected in the ability-selector input
    */
   const handleAbilitySelect = useCallback(
      async (e: string) => {     
         try {
            const abilityRes: AbilityScoreDetailsResponse = await getCachedAbilityDetails(e);
            let ability = { nome: abilityRes.full_name, descricao: abilityRes.desc };
            setSelectedAbility(ability);

            const skills = abilityRes.skills.map(skill => skill.name);
            setSkills(skills);
         } catch (err) {
            console.log(err);
         }

         const isCon = e === "con"
         setSavingThrow(isCon)
         setDisableCheckbox(isCon)
      },
      [getCachedAbilityDetails, setSavingThrow, setSkills]
   );

   function handleSavingThrowSwitch(e: ChangeEvent<HTMLInputElement>) {
      setSavingThrow(state => !state);
      let currentSavingThrow = e.currentTarget;

      if (!currentSavingThrow) {
         setSkills([]);
      }
   }

   return (
      <section className="space-y-8">
         <label htmlFor="ability-selector" className="text-lg">
            Selecione uma habilidade:
         </label>
         <div
            id="ability-selector-container"
            className="grid grid-rows-3 grid-cols-2 gap-8 mb-12 sm:my-4 sm:grid-rows-1 sm:grid-cols-6">
            {abilities.map((stat, index) => {
               return <StatSelector key={index} value={stat} setValue={handleAbilitySelect} />;
            })}
         </div>
         <div className="flex gap-4 items-center">
            <label htmlFor="saving-throw" className="text-lg">
               Saving Throw:
            </label>
            <input
               id="saving-throw"
               name="saving-throw"
               type="checkbox"
               checked={savingThrow}
               disabled={disableCheckbox}
               className="toggle toggle-info"
               onChange={e => handleSavingThrowSwitch(e)}
            />
         </div>
         {selectedAbility && <DescricaoColapsable content={selectedAbility} />}
      </section>
   );
};
