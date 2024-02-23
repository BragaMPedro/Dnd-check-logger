import { Log } from "@/types/Log";
import { useEffect, useState } from "react";

interface ExportButtonProps {
   logList: Log[];
}

export const ExportButton = ({ logList }: ExportButtonProps) => {
   const [downloadLink, setDownloadLink] = useState("");

   useEffect(() => {
      createTxtLog();
   }, [logList]);

   function createLogIdentifier() {
      if (logList && logList.length > 1) {
         return logList[logList.length - 1].createdAt.replaceAll("/", "-");
      } else {
         return "";
      }
   }

   function formatLogExport(logObjects: Log[]) {
      const formattedLog = logObjects.map((log, index) => {
         let data =
            logObjects[index - 1] && log.createdAt === logObjects[index - 1].createdAt
               ? "\n"
               : `${log.createdAt} ----------------------------------------\n`;

         let teste = log.skill
            ? `${data}- ${log.skill} (${log.ability.toUpperCase()}) Check\n`
            : `${data}- ${log.ability.toUpperCase()} Saving Throw\n`;

         return teste;
      });

      return formattedLog;
   }

   function createTxtLog() {
      const data = new Blob(formatLogExport(logList), { type: "text/plain" });

      if (downloadLink !== "") window.URL.revokeObjectURL(downloadLink);
      setDownloadLink(window.URL.createObjectURL(data));
   }

   return (
      <a href={downloadLink} className={`btn btn-info ${createLogIdentifier().length === 0 && "btn-disabled disabled"} `} download={`DnDCheckLog_${createLogIdentifier()}`}>
         Exportar
      </a>
   );
};
