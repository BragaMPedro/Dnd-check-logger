import { Form } from "@/components/Form/Form";
import { CacheProvider } from "@/contexts/CacheContext";
import { LocalStorageProvider } from "@/contexts/LocalStorageContext";

export default function Home() {
   return (
      <LocalStorageProvider>
         <CacheProvider>
            <main className="flex min-h-screen flex-col items-center w-full px-6 py-4 sm:px-10 sm:py-4 bg-indigo-950">
               <Form />
            </main>
         </CacheProvider>
      </LocalStorageProvider>
   );
}
