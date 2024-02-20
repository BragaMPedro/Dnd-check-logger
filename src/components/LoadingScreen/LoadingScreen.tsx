export const LoadingScreen = () => {
   return (
      <div className="container mt-8 w-full h-screen space-y-12 max-w-2xl flex flex-col items-center justify-center">
         <h2 className="text-4xl text-center">
            Super Duper <br /> DnD Check Logger
         </h2>
         <span className="loading loading-infinity loading-lg text-info"></span>
      </div>
   );
};
