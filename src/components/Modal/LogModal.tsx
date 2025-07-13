"use client";

import { useLocalStorageContext } from "@/contexts/LocalStorageContext";
import { Dispatch, SetStateAction } from "react";
import { ExportButton } from "../ExportButton/ExportButton";
import { LogItem } from "../LogItem/LogItem";
interface LogModalProps {
   setModal: Dispatch<SetStateAction<boolean>>;
}

export const LogModal = ({ setModal }: LogModalProps) => {
   const { logs, setLogArray, setCurrentIndicator } = useLocalStorageContext();
   const isMobile = checkPlatform();

   function checkPlatform() {
      return (
         navigator.userAgent.match(/Android/i) ||
         navigator.userAgent.match(/webOS/i) ||
         navigator.userAgent.match(/iPhone/i) ||
         navigator.userAgent.match(/iPad/i) ||
         navigator.userAgent.match(/iPod/i) ||
         navigator.userAgent.match(/BlackBerry/i) ||
         navigator.userAgent.match(/Windows Phone/i)
      );
   }

   function resetsIndicators() {
      const logsAtualizados = logs.map(log => {
         if (!log.exported) {
            return { ...log, exported: true };
         }
         return log;
      });

      setCurrentIndicator(0);
      setLogArray(logsAtualizados);
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
            <main className={`flex flex-col justify-between ${isMobile && "space-y-6"}`}>
               {logs.length > 0 ? (
                  logs.map((log, index) => {
                     return <LogItem key={index} index={index} log={log} logs={logs} isMobile={isMobile} />;
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
