import { useLocalStorageContext } from "@/contexts/LocalStorageContext";
import { Log } from "@/types/Log";
import { Construction, Menu } from "lucide-react";

interface LogItemProps {
   index: number;
   log: Log;
   logs: Log[];
   isMobile?: any;
}
/**
 * @todo Update mobile logic
 * @todo Convert `logs` to LinkedList?
 */
export const LogItem = ({ index, log, logs, isMobile }: LogItemProps) => {
   const { deleteLog } = useLocalStorageContext();

   /**
    * LongPressLogic for Mobile
    */ 
   // const [longPress, setLongPress] = useState<boolean>(false);
   // const onLongPress = (e: any) => {
   //    console.log("onLongPress triggered", e);
   //    setLongPress(state => !state);
   // };
   // const onClick = (e: any) => {
   //    console.log("onClick triggered", e);
   // };
   // const longPressEvent = useLongPress({ onLongPress, onClick, options: { shouldPreventDefault: true, delay: 500 } });

   function handleDelete() {
      const del = confirm(
         `Deseja realmente deletar o log?\nEsta ação é permanente.\n\n${log.createdAt} ${printOutput()}`
      );
      del && deleteLog(index);
   }

   function printOutput() {
      return log.skill
         ? `- ${log.skill} (${log.ability.toUpperCase()}) Check`
         : `- ${log.ability.toUpperCase()} Saving Throw`;
   }

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
               <p>{printOutput()}</p>
            </div>
            {!isMobile && (
               <div className="dropdown dropdown-hover dropdown-top dropdown-end">
                  <button
                     tabIndex={0}
                     type="button"
                     className={
                        "rounded-full opacity-50 w-fit p-1 duration-300 ease-in-out relative sm:flex sm:items-center hover:bg-gray-700 hover:opacity-100"
                     }>
                     <Menu color="#ffffff" />
                  </button>
                  <ul
                     tabIndex={0}
                     className="dropdown-content overflow-hidden space-y-2 z-10 shadow bg-gray-700 rounded-box w-fit">
                     <li
                        className="flex items-center justify-between px-4 pt-2 space-x-8 cursor-pointer hover:underline hover:bg-white/15"
                        onClick={() => alert("Essa função ainda está em desenvolvimento.")}>
                        <p className="text-white">Editar</p>
                        <Construction color="#f0a531" />
                     </li>
                     <li
                        className="flex items-center justify-between px-4 pb-2 space-x-8 cursor-pointer hover:underline hover:bg-white/15"
                        onClick={handleDelete}>
                        <p className="text-white">Deletar</p>
                     </li>
                  </ul>
               </div>
            )}
         </div>
      </div>
   );
};
