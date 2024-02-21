"use client";

import { getSkillById } from "@/services/dndApi";
import { SelectedAbilityProps } from "@/types/AbilityScore";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { DescricaoColapsable } from "../Descricao/DescricaoColapsable";

interface SkillSelectorProps {
   skills: string[];
   savingThrow: boolean;
   setIsSkillSelected: Dispatch<SetStateAction<boolean>>;
}

export const SkillSelector = ({ skills, setIsSkillSelected, savingThrow }: SkillSelectorProps) => {
   const [selectedSkill, setSelectedSkill] = useState<SelectedAbilityProps | undefined>();

   useEffect(() => {
      handleSavingThrowChange();

      return () => {
         setIsSkillSelected(false);
         setSelectedSkill(undefined);         
      };
   }, [savingThrow]);

   function handleSavingThrowChange() {
      if (savingThrow) {
         setSelectedSkill(undefined);
         setIsSkillSelected(false);
      }
   }

   async function handleSkillSelect(e: string) {
      let skill;

      try {
         const formattedSkill = e.toLowerCase().replaceAll(" ", "-");

         const skillRes = (await getSkillById(formattedSkill)).data;
         skill = { nome: skillRes.name, descricao: skillRes.desc };

         setSelectedSkill(skill);
         setIsSkillSelected(true);
      } catch (err) {
         console.log(err);
      }
   }

   return (
      <section id="skill" className="space-y-8">
         <label htmlFor="skill-selector" className="text-lg">
            Selecione uma perícia:
         </label>
         <br />
         <select
            id="skill-selector"
            name="skill"
            required
            defaultValue={""}
            className="select select-info w-full max-w-xs"
            onChange={e => handleSkillSelect(e.target.value)}>
            <option disabled></option>
            {skills.map((skill, index) => {
               return <option key={index}>{skill}</option>;
            })}
         </select>
         {selectedSkill && <DescricaoColapsable content={selectedSkill} />}
      </section>
   );
};
