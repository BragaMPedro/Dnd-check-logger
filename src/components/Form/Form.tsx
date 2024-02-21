"use client";

import { getAbilityScores, getAbilityScoresById } from "@/services/dndApi";
import { SelectedAbilityProps } from "@/types/AbilityScore";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

import { DescricaoColapsable } from "../Descricao/DescricaoColapsable";
import { LoadingScreen } from "../LoadingScreen/LoadingScreen";
import { SkillSelector } from "../SkillSelector/SkillSelector";
import { StatSelector } from "../StatSelector/StatSelector";

export const Form = () => {
   const [loading, setLoading] = useState<boolean>(false);
   const [ability, setAbility] = useState<string[]>([]);
   const [skills, setSkills] = useState<string[]>([]);
   const [savingThrow, setSavingThrow] = useState<boolean>(false);

   const [selectedAbility, setSelectedAbility] = useState<SelectedAbilityProps | undefined>();
   const [isSkillSelected, setIsSkillSelected] = useState<boolean>(false)

   const [disableCheckbox, setDisableCheckbox] = useState<boolean>(false);

   useEffect(() => {
      getHabilidades();
   }, []);

   function handleSavingThrowSwitch(e: ChangeEvent<HTMLInputElement>) {
      setSavingThrow(state => !state);
      let currentSavingThrow = e.currentTarget;

      if (!currentSavingThrow) {
         setSkills([]);
      }
   }

   async function getHabilidades() {
      setLoading(true);
      try {
         const abilityArray = (await getAbilityScores()).data;

         let habilidades = abilityArray.results.map(stat => {
            return stat.name;
         });
         setAbility(habilidades);
      } catch (error) {
         console.error(error);
      }

      setTimeout(() => setLoading(false), 2200);
   }

   async function handleAbilitySelect(e: string) {
      const abilityRes = (await getAbilityScoresById(e)).data;

      let ability = { nome: abilityRes.full_name, descricao: abilityRes.desc };
      setSelectedAbility(ability);

      let skills = abilityRes.skills.map(skill => {
         return skill.name;
      });

      e === "con" ? (setSavingThrow(true), setDisableCheckbox(true)) : setDisableCheckbox(false);
      setSkills(skills);
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
         <form
            onSubmit={handleSubmit}
            className="container mt-8 w-full space-y-8 max-w-2xl scroll-smooth">
            <h2 className="text-3xl text-center w-full mb-8 sm:mb-16 leading-normal">Super Duper DnD Check Logger</h2>
            <section className="space-y-8">
               <label htmlFor="ability-selector" className="text-lg">
                  Selecione uma habilidade:
               </label>
               <div
                  id="ability-selector-container"
                  className="grid grid-rows-3 grid-cols-2 gap-8 mb-12 sm:my-4 sm:grid-rows-1 sm:grid-cols-6">
                  {ability.map((stat, index) => {
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
                  <button type="submit" disabled={!selectedAbility} className="btn btn-accent px-6">
                     Salvar
                  </button>
               )}
            </div>
         </form>
      );
   }
};
