import { Log } from "@/types/Log";
import { useState } from "react";

interface LogItemProps {
   index: number;
   log: Log;
   logs: Log[];
   btnAction?: () => void;
}

export const LogItem = ({ index, log, logs, btnAction }: LogItemProps) => {
   const [hover, setHover] = useState<boolean>(false);

   function buttonAction() {
      btnAction
        ? btnAction()
        : console.log("LOG CLICADO", index, log);
   }

   return (
      <div onMouseOver={() => setHover(true)} onMouseOut={() => setHover(false)} className="flex-1 min-h-10">
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
            <button type="button" onClick={buttonAction} className={`btn btn-ghost ${hover ? "visible" : "invisible"}`}>
               Deletar
            </button>
         </div>
      </div>
   );
};
