"use client";

import { useCacheContext } from "@/contexts/CacheContext";
import { SelectedAbilityProps, SkillDetailsResponse } from "@/types/AbilityScore";
import { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useState } from "react";
import { DescricaoColapsable } from "../Descricao/DescricaoColapsable";

interface SkillSelectorProps {
   skills: string[];
   savingThrow: boolean;
   setIsSkillSelected: Dispatch<SetStateAction<boolean>>;
}

export const SkillSelector = ({ skills, setIsSkillSelected, savingThrow }: SkillSelectorProps) => {
   const [selectedSkill, setSelectedSkill] = useState<SelectedAbilityProps | undefined>();
   const { getCachedSkillDetails } = useCacheContext();

   useEffect(() => {
      return selectedSkill && handleSkillsReset()
   }, [savingThrow, skills]);

   function handleSkillsReset(reason?: string) {
      setSelectedSkill(undefined);
      setIsSkillSelected(false);
      reason && console.log("SkillSelectorReset: %s", reason);
   }

   const handleSkillSelect = useCallback(
      async (e: string) => {
         try {
            const formattedSkill = e.toLowerCase().replaceAll(" ", "-");
            const skillRes: SkillDetailsResponse = await getCachedSkillDetails(formattedSkill);
            const skill = { nome: skillRes.name, descricao: skillRes.desc };

            setSelectedSkill(skill);
            setIsSkillSelected(true);
         } catch (err) {
            console.log(err);
         }
      },
      [getCachedSkillDetails, setIsSkillSelected]
   );

   const skillOptions = useMemo(() => {
      return skills.map((skill, index) => <option key={index}>{skill}</option>);
   }, [skills]);

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
            value={selectedSkill ? selectedSkill.nome : ""}
            className="select select-info w-full max-w-xs"
            onChange={e => handleSkillSelect(e.target.value)}>
            <option disabled></option>
            {skillOptions}
         </select>
         {selectedSkill && <DescricaoColapsable content={selectedSkill} />}
      </section>
   );
};
