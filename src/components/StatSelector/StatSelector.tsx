"use client";

import { ChangeEvent } from "react";

interface StatSelectorProps {
   value: string;
   setValue: (e: string) => void;
}

export const StatSelector = ({ value, setValue }: StatSelectorProps) => {
   let formattedName = value.toLowerCase();

   const handleSelector = (e: ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
   };

   return (
         <div id={"option-container"} className="flex gap-4 items-center justify-center hover:brightness-200">
            <input
               id={formattedName + "-radio"}
               required
               type="radio"
               name={"ability"}
               className="radio radio-info"
               value={value.toLowerCase()}
               onChange={handleSelector}
            />
            <label htmlFor={formattedName + "-radio"} className="min-w-12">
               {value}
            </label>
         </div>
   );
};
