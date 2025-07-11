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
            setLogs(JSON.parse(storedLogs));
        }
        if (storedIndicator) {
            setIndicator(JSON.parse(storedIndicator));
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
    const postLog = (newLog: Log) => {
        setLogs([...logs, newLog]);
    };

    /**
     * Updates `logs` State
     * Replaces entire log array with `newLogsArray`
     * 
     * @param newLogsArray 
     */
    const postMultipleLogs = (newLogsArray: Log[]) => {
        setLogs(newLogsArray);
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
    const postIndicator = (newIndicator: number) => {
        setIndicator(newIndicator);
    };

    return {
        logs,
        indicator,
        postLog,
        postMultipleLogs,
        deleteLog,
        postIndicator,
    };
};