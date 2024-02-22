import { Log } from "@/types/Log";
import { Dispatch, SetStateAction } from "react";
import { ExportButton } from "../ExportButton/ExportButton";

interface LogModalProps {
   logs: Log[];
   setModal: Dispatch<SetStateAction<boolean>>;
}

export const LogModal = ({ logs, setModal }: LogModalProps) => {
   return (
      <dialog id="my_modal_5" className="modal modal-open modal-scroll modal-bottom sm:modal-middle">
         <div className="modal-box space-y-8">
            {logs.map((log, index) => {
               return (
                  <div key={index}>
                     <form method="dialog">
                        <button
                           onClick={() => setModal(false)}
                           className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                           ✕
                        </button>
                     </form>
                     {logs[index - 1] && log.createdAt === logs[index - 1].createdAt ? (
                        <></>
                     ) : (
                        <div className="divider divider-start space-y-4 text-left">{log.createdAt}</div>
                     )}
                     {log.skill
                        ? `- ${log.skill} (${log.ability.toUpperCase()}) Check`
                        : `- ${log.ability.toUpperCase()} Saving Throw`}
                  </div>
               );
            })}
            <div className="modal-action">
               <ExportButton logList={logs} />
            </div>
         </div>
         <form method="dialog" className="modal-backdrop">
            <button onClick={() => setModal(false)}>close</button>
         </form>
      </dialog>
   );
};
