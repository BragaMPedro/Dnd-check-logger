"use client";

import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Log } from "@/types/Log";
import { createContext, ReactNode, useContext } from "react";

interface LocalStorageContextType {
    logs: Log[];
    indicator: number;
    postLog: (newLog: Log) => void;
    postMultipleLogs: (newLogsArray: Log[]) => void;
    deleteLog: (index: number) => void;
    postIndicator: (newIndicator: number) => void;
}

const LocalStorageContext = createContext<LocalStorageContextType | undefined>(undefined);

export const LocalStorageProvider = ({ children }: { children: ReactNode }) => {
    const localStorageData = useLocalStorage();

    return (
        <LocalStorageContext.Provider value={localStorageData}>
            {children}
        </LocalStorageContext.Provider>
    );
};

export const useLocalStorageContext = () => {
    const context = useContext(LocalStorageContext);
    if (context === undefined) {
        throw new Error("useLocalStorageContext deve ser usado dentro de um LocalStorageProvider");
    }
    return context;
};
