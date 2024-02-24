import { Log } from "@/types/Log";
import { Delete } from "lucide-react";
import { useState } from "react";

interface LogItemProps {
   index: number;
   log: Log;
   logs: Log[];
   btnAction?: () => void;
}

export const LogItem = ({ index, log, logs, btnAction }: LogItemProps) => {
   const [hover, setHover] = useState<boolean>(false);
   const [toggleAnimation, setToggleAnimation] = useState<boolean>(false);

   function buttonAction() {
      setToggleAnimation(state => !state);
   }

   function handleMouseOver() {
      setHover(true);
   }

   function handleMouseOut() {
      setHover(false);
   }

   return (
      <div onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} className="flex-1 min-h-10">
         {logs[index - 1] && log.createdAt === logs[index - 1].createdAt ? (
            <></>
         ) : (
            <h3 className="divider divider-start text-left">{log.createdAt}</h3>
         )}

         <div
            className={`flex p-2 w-[98%] items-center justify-between
                ${hover && "bg-opacity-5 bg-white rounded-md"}`}>
            <div className="indicator">
               <span
                  className={`indicator-item indicator-end inset-x-full text-white badge badge-secondary
                    ${!log.exported ? "visible:" : "invisible"}`}>
                  new
               </span>
               <p>
                  {log.skill
                     ? `- ${log.skill} (${log.ability.toUpperCase()}) Check`
                     : `- ${log.ability.toUpperCase()} Saving Throw`}
               </p>
            </div>
            <div
               className={`bg-black bg-opacity-10 rounded-full sm;transition-shadow sm:transition-[width] sm:overflow-hidden duration-1000 ease-in-out relative sm:flex sm:items-center ${
                  toggleAnimation ? "sm:w-1/3 sm:shadow-inner shadow-black" : "w-fit"
               } ${hover || toggleAnimation ? "visible" : "invisible"}`}>
               <button type="button" onClick={buttonAction} className={`btn btn-neutral btn-circle sticky z-10 left-0`}>
                  <Delete color="#ffffff" />
               </button>
               <button
                  type="button"
                  onClick={() => alert("Função vindo em breve...\nObrigado pelo interesse")}
                  className={`btn btn-outline btn-error btn-sm rounded-full m-2 text-center text-white absolute right-0`}>
                  Deletar
               </button>
            </div>
         </div>
      </div>
   );
};
