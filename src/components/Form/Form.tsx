"use client";

import { getAbilityScores } from "@/services/dndApi";
import { FormEvent, useEffect, useState } from "react";

import { AbilitySelector } from "../AbilitySelector/AbilitySelector";
import { LoadingScreen } from "../LoadingScreen/LoadingScreen";
import { SkillSelector } from "../SkillSelector/SkillSelector";

export const Form = () => {
   const [loading, setLoading] = useState<boolean>(false);
   const [abilities, setAbilities] = useState<string[]>([]);
   const [skills, setSkills] = useState<string[]>([]);
   const [savingThrow, setSavingThrow] = useState<boolean>(false);

   const [isAbilitySelected, setIsAbilitySelected] = useState<boolean>(false);
   const [isSkillSelected, setIsSkillSelected] = useState<boolean>(false);

   useEffect(() => {
      getHabilidades();
   }, []);

   async function getHabilidades() {
      setLoading(true);
      try {
         const abilityArray = (await getAbilityScores()).data;

         let habilidades = abilityArray.results.map(stat => {
            return stat.name;
         });
         setAbilities(habilidades);
      } catch (error) {
         console.error(error);
      }

      setTimeout(() => setLoading(false), 2200);
   }

   function handleSubmit(e: FormEvent<HTMLFormElement>) {
      e.preventDefault();

      const formData = new FormData(e.currentTarget);
      const ability = formData.get("ability");
      const skill = formData.get("skill");
      const savingThrow = Boolean(formData.get("saving-throw"));

      console.table(Array.from(formData.entries()));
   }

   if (loading) {
      return <LoadingScreen />;
   } else {
      return (
         <form onSubmit={handleSubmit} className="container mt-8 w-full space-y-8 max-w-2xl scroll-smooth">
            <h2 className="text-3xl text-center w-full mb-8 sm:mb-16 leading-normal">Super Duper DnD Check Logger</h2>
            <AbilitySelector
               abilities={abilities}
               savingThrow={savingThrow}
               setSkills={setSkills}
               setSavingThrow={setSavingThrow}
               setIsAbilitySelected={setIsAbilitySelected}
            />
            <div className="divider"></div>
            {!savingThrow && skills.length > 0 && (
               <>
                  <SkillSelector skills={skills} setIsSkillSelected={setIsSkillSelected} savingThrow={savingThrow} />
                  <div className="divider"></div>
               </>
            )}

            <div id="btn-container" className="w-full flex items-center justify-end space-x-4">
               {/* <button type="reset" disabled={!selectedAbility} className="btn border border-[#00cdb7] text-[#00cdb7] bg-transparent px-6 hover:border-0 hover:bg-[#00cdb750]">
                  Limpar
               </button> */}
               {!savingThrow ? (
                  <button type="submit" disabled={!isSkillSelected} className="btn btn-accent px-6">
                     Salvar
                  </button>
               ) : (
                  <button type="submit" disabled={!isAbilitySelected} className="btn btn-accent px-6">
                     Salvar
                  </button>
               )}
            </div>
         </form>
      );
   }
};
