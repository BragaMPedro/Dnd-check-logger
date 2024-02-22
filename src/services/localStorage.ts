import { Log } from "@/types/Log";

export function getLog(): Log[] {
   const logArray = localStorage.getItem("logArray");

   return logArray ? JSON.parse(logArray) : [];
}

export function postLog(novoLog: Log) {
   const logArray = getLog();
   logArray.push(novoLog);

   localStorage.setItem("logArray", JSON.stringify(logArray));
}

export function deleteLog(index: number) {
   const logArray = getLog();

   const deletedItem = logArray.splice(index, 1);
   console.log(deletedItem);

   localStorage.setItem("logArray", JSON.stringify(logArray));
}
