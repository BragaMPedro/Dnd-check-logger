import { Log } from "@/types/Log";

interface ExportButtonProps {
   logList: Log[];
   resetsIndicators: () => void
}

export const ExportButton = ({ logList, resetsIndicators }: ExportButtonProps) => {
   function createLogIdentifier() {
      if (logList && logList.length > 0) {
         return logList[logList.length - 1].createdAt.replaceAll("/", "-");
      } else {
         return "";
      };
   };

   function formatLogExport(logObjects: Log[]) {
      const formattedLog = logObjects.map((log, index) => {
         let data =
            logObjects[index - 1] && log.createdAt === logObjects[index - 1].createdAt
               ? "\n"
               : `${log.createdAt} ----------------------------------------\n`;

         const teste = log.skill
            ? `${data}- ${log.skill} (${log.ability.toUpperCase()}) Check\n`
            : `${data}- ${log.ability.toUpperCase()} Saving Throw\n`;

         return teste;
      });

      return formattedLog;
   }

   function handleExport() {
      // 1. Cria o Blob e a URL para o download
      const blob = new Blob(formatLogExport(logList), { type: "text/plain" });
      const url = window.URL.createObjectURL(blob);

      // 2. Cria um elemento <a> temporário para iniciar o download
      const link = document.createElement('a');
      link.href = url;
      link.download = `DnDCheckLog_${createLogIdentifier()}`;

      // 3. Adiciona, clica e remove o link <a> do DOM
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // 4. Libera a memória revogando a URL do objeto
      window.URL.revokeObjectURL(url);
      resetsIndicators();
   }

   return (
      <button
         onClick={handleExport}
         className={`btn btn-info`}
         disabled={logList.length === 0}
      >
         Exportar
      </button>
   );
};
