export const LoadingScreen = () => {
   return (
      <>
         <div className="container w-full h-screen space-y-12 max-w-2xl flex flex-col items-center justify-center">
            <h2 className="text-4xl text-center">
               Super Duper <br /> D&D Check Logger
            </h2>
            <span className="loading loading-infinity loading-lg text-info"></span>
         </div>
         <p className="text-xs text-center absolute bottom-1 p-2 text-[#ffffff60] sm:text-white">
            Atenção, D&D Check Logger™ utiliza Local Storage, que salva dados nativamente no seu navegador. Caso os dados
            do seu navegador sejam limpos quaisquer dados relacionados a esse app também serão apagados.
         </p>
      </>
   );
};
