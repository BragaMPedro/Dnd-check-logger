import { Log } from "@/types/Log";

export function getLog(): Promise<Log[]> {
   const logArray = localStorage.getItem("logArray");

   return logArray ? JSON.parse(logArray) : [];
}

export async function postLog(novoLog: Log) {
   const logArray = await getLog();
   logArray.push(novoLog);

   localStorage.setItem("logArray", JSON.stringify(logArray));
}

export async function postMultipleLogs(novosLogsArray: Log[]) {

   localStorage.setItem("logArray", JSON.stringify(novosLogsArray));
}

export async function deleteLog(index: number) {
   const logArray = await getLog();

   const deletedItem = logArray.splice(index, 1);
   console.log(deletedItem);

   localStorage.setItem("logArray", JSON.stringify(logArray));
}
