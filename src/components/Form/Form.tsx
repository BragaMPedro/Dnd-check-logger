"use client";

import { getAbilityScores, getAbilityScoresById, getSkillById } from "@/services/dndApi";
import { SelectedAbilityProps } from "@/types/AbilityScore";
import { FormEvent, useEffect, useState } from "react";
import { Descricao } from "../Descricao/Descricao";
import { StatSelector } from "../StatSelector/StatSelector";

export const Form = () => {
   let selectedEmpty = { nome: "", descricao: [] };
   const [loading, setLoading] = useState<boolean>(false);
   const [ability, setAbility] = useState<string[]>([]);
   const [selectedAbility, setSelectedAbility] = useState<SelectedAbilityProps>(selectedEmpty);
   const [skills, setSkills] = useState<string[]>([]);
   const [selectedSkill, setSelectedSkill] = useState<SelectedAbilityProps>(selectedEmpty);
   const [savingThrow, setSavingThrow] = useState<boolean>(true);
   const [disableCheckbox, setDisableCheckbox] = useState<boolean>(false);

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
         setAbility(habilidades);
      } catch (error) {
         console.error(error);
      };

      setTimeout(()=>setLoading(false),3000)
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
      setSelectedSkill(selectedEmpty);
   }

   async function handleSkillSelect(e: string) {
      let formattedSkill = e.toLowerCase().replaceAll(" ", "-");
      const skillRes = (await getSkillById(formattedSkill)).data;

      let skill = { nome: skillRes.name, descricao: skillRes.desc };
      setSelectedSkill(skill);
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
      return (
         <div className="container mt-8 w-full h-screen space-y-12 max-w-2xl flex flex-col items-center justify-center">
            <h2 className="text-4xl text-center" >Super Duper <br/> DnD Check Logger</h2>
            <span className="loading loading-infinity loading-lg text-info"></span>
         </div>
      );
   } else {
      return (
         <form onSubmit={handleSubmit} className="container mt-8 w-full space-y-12 max-w-2xl">
            <h2 className="text-3xl text-center w-full mb-8 sm:mb-16 leading-normal" >Super Duper DnD Check Logger</h2>
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
                     onChange={() => setSavingThrow(state => !state)}
                  />
               </div>
               <Descricao content={selectedAbility} />
            </section>
            {!savingThrow && skills.length > 0 && (
               <section id="skill" className="space-y-8">
                  <label htmlFor="skill-selector" className="text-lg">
                     Selecione uma perícia:
                  </label>
                  <br />
                  <select
                     id="skill-selector"
                     name="skill"
                     className="select select-info w-full max-w-xs"
                     onChange={e => handleSkillSelect(e.target.value)}>
                     {skills.map((skill, index) => {
                        return <option key={index}>{skill}</option>;
                     })}
                  </select>
                  <Descricao content={selectedSkill} />
               </section>
            )}

            <div id="btn-container" className="w-full flex justify-end">
               <button type="submit" className="btn btn-accent">
                  Salvar
               </button>
            </div>
         </form>
      );
   }
};
