"use client";

import { getLog, postMultipleLogs } from "@/services/localStorage";
import { Log } from "@/types/Log";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ExportButton } from "../ExportButton/ExportButton";

interface LogModalProps {
   setModal: Dispatch<SetStateAction<boolean>>;
   indicator: number;
   setIndicator: Dispatch<SetStateAction<number>>;
}

export const LogModal = ({ setModal, indicator, setIndicator }: LogModalProps) => {
   const [logs, setLogs] = useState<Log[]>([]);

   useEffect(() => {
      pegarLogs();

      return () => {
         setLogs([]);
      };
   }, []);

   async function pegarLogs() {
      try {
         const storageLogs = await getLog();

         setLogs(storageLogs);         
      } catch (err) {
         console.log(err);
      }
   }

   function resetsIndicators() {
      setIndicator(0);
      const logsAtualizados = logs.map(log => {
         if (!log.exported) {
            return { ...log, exported: true };
         }
         return log
      });

      setLogs(logsAtualizados);
      postMultipleLogs(logsAtualizados)
   }

   return (
      <dialog id="my_modal_5" className="modal modal-open modal-scroll modal-bottom sm:modal-middle">
         <div className="modal-box space-y-8">
            <form method="dialog">
               <button
                  onClick={() => setModal(false)}
                  className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                  ✕
               </button>
            </form>
            {logs.length > 0 ? (
               logs.map((log, index) => {
                  return (
                     <div key={index}>
                        {logs[index - 1] && log.createdAt === logs[index - 1].createdAt ? (
                           <></>
                        ) : (
                           <h3 className="divider divider-start space-y-4 text-left">{log.createdAt}</h3>
                        )}
                        <div className="indicator">
                           <span
                              className={`indicator-item indicator-end badge badge-secondary ${
                                 !log.exported ? "visible:" : "invisible"
                              }`}></span>
                           <p>
                              {log.skill
                                 ? `- ${log.skill} (${log.ability.toUpperCase()}) Check`
                                 : `- ${log.ability.toUpperCase()} Saving Throw`}
                           </p>
                        </div>
                     </div>
                  );
               })
            ) : (
               <div className="flex flex-1 items-center justify-center">
                  <h2 className="text-center text-lg">Ainda não há registros</h2>
               </div>
            )}
            <div className="modal-action">
               <ExportButton logList={logs} resetsIndicators={resetsIndicators} />
            </div>
         </div>
         <form method="dialog" className="modal-backdrop">
            <button onClick={() => setModal(false)}>close</button>
         </form>
      </dialog>
   );
};
