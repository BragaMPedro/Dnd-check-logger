import { Log } from "@/types/Log";
import { useEffect, useState } from "react";

export const useLocalStorage = () => {
    const [logs, setLogs] = useState<Log[]>([]);
    const [indicator, setIndicator] = useState<number>(0);

    //Initial Logs and Indicator values
    useEffect(() => {
        const storedLogs = localStorage.getItem("logArray");
        const storedIndicator = localStorage.getItem("exportsFalse");

        if (storedLogs) {
            const storeLogsObject = JSON.parse(storedLogs);
            (Array.isArray(storeLogsObject) && storeLogsObject.length > 0) && setLogs(storeLogsObject);
        }

        if (storedIndicator) {
            const storeIndicatorObject = JSON.parse(storedIndicator);
            (typeof storeIndicatorObject === "number" && storeIndicatorObject > 0) && setIndicator(storeIndicatorObject);
        }
    }, []);
    
    //Updates Log Storage
    useEffect(() => {
        localStorage.setItem("logArray", JSON.stringify(logs));
                
    }, [logs]);
    //Updates Indicator Storage
    useEffect(() => {
        localStorage.setItem("exportsFalse", JSON.stringify(indicator));
    }, [indicator]);

    /**
     * Updates `logs` State
     * Adds `newLog` to the log array
     * 
     * @param newLog 
     */
    const setNewLog = (newLog: Log) => {
        setLogs([...logs, newLog]);
    };

    /**
     * Updates `logs` State
     * Replaces entire log array with `newLogArray`
     * 
     * @param newLogArray 
     */
    const setLogArray = (newLogArray: Log[]) => {
        setLogs(newLogArray);
    };

    /**
     * Updates `logs` State
     * Deletes element with `index` from logs array
     * 
     * @param index 
     */
    const deleteLog = (index: number) => {
        const newLogs = [...logs];
        newLogs.splice(index, 1);
        setLogs(newLogs);
    };

    /**
     * Updates `indicator` State
     * 
     * @param newIndicator 
     */
    const setCurrentIndicator = (newIndicator: number) => {
        setIndicator(newIndicator);
    };

    return {
        logs,
        indicator,
        setNewLog,
        setLogArray,
        deleteLog,
        setCurrentIndicator,
    };
};