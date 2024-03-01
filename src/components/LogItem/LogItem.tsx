import { Log } from "@/types/Log";
import { Delete } from "lucide-react";
import { useState } from "react";
import { useLongPress } from "../hooks/useLongPress";

interface LogItemProps {
   index: number;
   log: Log;
   logs: Log[];
   btnAction?: () => void;
   isMobile: boolean;
}

export const LogItem = ({ index, log, logs, btnAction, isMobile }: LogItemProps) => {
   const [hover, setHover] = useState<boolean>(false);
   const [toggleAnimation, setToggleAnimation] = useState<boolean>(false);

   const [longPress, setLongPress] = useState<boolean>(false);

   const onLongPress = (e: any) => {
      setLongPress(state => !state);
   };

   const onClick = (e: any) => {
      console.log("click is triggered", e);
   };

   const longPressEvent = useLongPress({ onLongPress, onClick, options: { shouldPreventDefault: true, delay: 500 } });

   function showDelete() {
      setToggleAnimation(state => !state);
   }

   function handleMouseOver() {
      setHover(true);
   }

   function handleMouseOut() {
      setHover(false);
   }

   if (!isMobile) {
      return (
         <div className="flex-1 min-h-10">
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
                     className={`indicator-item indicator-end sm:inset-x-full -right-1/4 text-white badge badge-secondary
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
                  onMouseOver={handleMouseOver}
                  onMouseOut={handleMouseOut}
                  className={`rounded-full sm:overflow-hidden sm:transition-[width] duration-1000 ease-in-out relative sm:flex sm:items-center ${
                     hover ? "sm:w-1/3 sm:shadow-inner bg-error shadow-black" : "w-fit"
                  }`}>
                  <div
                     onClick={showDelete}
                     className={`rounded-full sticky z-10 left-0`}>
                     <Delete color="#ffffff" />
                  </div>
                  <button
                     type="button"
                     onClick={() => confirm("Deseja realmente deletar o log?")}
                     className={`btn btn-link z-0 sm:inline-flex no-underline text-white absolute right-0`}>
                     Deletar
                  </button>
               </div>
            </div>
         </div>
      );
   } else {
      return (
         <div className="flex-1 min-h-10">
            {logs[index - 1] && log.createdAt === logs[index - 1].createdAt ? (
               <></>
            ) : (
               <h3 className="divider divider-start text-left">{log.createdAt}</h3>
            )}

            <div className={`flex p-2 w-[98%] items-center justify-between`} {...longPressEvent}>
               <div className="indicator">
                  <span
                     className={`indicator-item indicator-end sm:inset-x-full -right-1/4 text-white badge badge-secondary
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
                  className={`rounded-full sm:overflow-hidden duration-1000 ease-in-out relative sm:flex sm:items-center ${
                     toggleAnimation ? "sm:w-1/3 sm:transition-[width] sm:shadow-inner bg-error shadow-black" : "w-fit"
                  }`}>
                  <button
                     type="button"
                     onClick={() => confirm("Deseja realmente deletar o log?")}
                     className={`btn btn-link z-0 sm:inline-flex no-underline text-white absolute right-0`}>
                     Deletar
                  </button>
               </div>
            </div>
         </div>
      );
   }
};
