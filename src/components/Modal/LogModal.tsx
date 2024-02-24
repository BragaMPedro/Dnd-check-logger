"use client";

import { getIndicadores, getLog, postIndicadores, postMultipleLogs } from "@/services/localStorage";
import { Log } from "@/types/Log";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ExportButton } from "../ExportButton/ExportButton";
import { LogItem } from "../LogItem/LogItem";

interface LogModalProps {
   setModal: Dispatch<SetStateAction<boolean>>;
   indicator: number;
   setIndicator: Dispatch<SetStateAction<number>>;
}

export const LogModal = ({ setModal, indicator, setIndicator }: LogModalProps) => {
   const [logs, setLogs] = useState<Log[]>([]);

   useEffect(() => {
      pegarLogs();
      pegarIndicadores();

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

   async function pegarIndicadores() {
      const indicadoresStorage = await getIndicadores();

      setIndicator(indicadoresStorage);
   }

   function resetsIndicators() {
      setIndicator(0);
      const logsAtualizados = logs.map(log => {
         if (!log.exported) {
            return { ...log, exported: true };
         }
         return log;
      });

      setLogs(logsAtualizados);
      postIndicadores(0);
      postMultipleLogs(logsAtualizados);
   }

   return (
      <dialog id="my_modal_5" className="modal modal-open modal-scroll modal-bottom sm:modal-middle">
         <div className="modal-box space-y-4">
            <form method="dialog">
               <button
                  onClick={() => setModal(false)}
                  className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                  ✕
               </button>
            </form>
            <main className="flex flex-col justify-between">
               {logs.length > 0 ? (
                  logs.map((log, index) => {
                     return <LogItem key={index} index={index} log={log} logs={logs} />;
                  })
               ) : (
                  <div className="flex flex-1 items-center justify-center">
                     <h2 className="text-center text-lg">Ainda não há registros</h2>
                  </div>
               )}
            </main>
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
