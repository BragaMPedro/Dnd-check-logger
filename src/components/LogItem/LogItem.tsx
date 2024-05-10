import { Log } from "@/types/Log";
import { Menu } from "lucide-react";
import { useState } from "react";
import { useLongPress } from "../../hooks/useLongPress";

interface LogItemProps {
   index: number;
   log: Log;
   logs: Log[];
   btnAction?: () => void;
   isMobile: boolean;
}

export const LogItem = ({ index, log, logs, btnAction, isMobile }: LogItemProps) => {
   const [longPress, setLongPress] = useState<boolean>(false);

   const onLongPress = (e: any) => {
      console.log("onLongPress triggered", e);
      setLongPress(state => !state);
   };

   const onClick = (e: any) => {
      console.log("onClick triggered", e);
   };

   const longPressEvent = useLongPress({ onLongPress, onClick, options: { shouldPreventDefault: true, delay: 500 } });

   if (!isMobile) {
      return (
         <div className="flex-1 min-h-10">
            {logs[index - 1] && log.createdAt === logs[index - 1].createdAt ? (
               <></>
            ) : (
               <h3 className="divider divider-start text-left">{log.createdAt}</h3>
            )}

            <div className={`flex p-2 w-[98%] items-center justify-between`}>
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
               <div className="dropdown dropdown-hover dropdown-top dropdown-end">
                  <button
                     tabIndex={0}
                     type="button"
                     className={
                        "rounded-full opacity-50 w-fit p-1 duration-300 ease-in-out relative sm:flex sm:items-center hover:bg-gray-700 hover:opacity-100"
                     }>
                     <Menu color="#ffffff" />
                  </button>
                  <ul tabIndex={0} className="dropdown-content space-y-2 z-10 menu px-4 py-2 shadow bg-gray-700 rounded-box w-fit">
                     <li
                        className={"no-underline text-gray-500"}
                        onClick={() => alert("Essa função ainda está em desenvolvimento.")}>
                        Editar
                     </li>
                     <li
                        className={"text-white cursor-pointer hover:underline"}
                        onClick={() => confirm("Deseja realmente deletar o log?")}>
                        Deletar
                     </li>
                  </ul>
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

            <div className={`flex p-2 w-[96%] items-center justify-between`} {...longPressEvent}>
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
            </div>
         </div>
      );
   }
};
