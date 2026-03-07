import { useState, useEffect } from "react";

export default function BootSequence({ onComplete }: { onComplete: () => void }) {
  const [logs, setLogs] = useState<string[]>([]);
  
  const bootMessages = [
    "NORDSTERN_OS v4.0.2 STARTING...",
    "CHECKING SECTOR 0x004 (COFEE-0)...",
    "DECRYPTING CORE DATA...",
    "CRITICAL: DATA FRAGMENTATION DETECTED",
    "BYPASSING DANIEL M. SECURITY PROTOCOLS...",
    "RECOVERING SECRETS FROM VOID...",
    "SUCCESS: FILE READY FOR VIEWING."
  ];

  useEffect(() => {
    let currentLine = 0;
    const interval = setInterval(() => {
      if (currentLine < bootMessages.length) {
        setLogs(prev => [...prev, bootMessages[currentLine]]);
        currentLine++;
      } else {
        clearInterval(interval);
        console.log("Boot finalizado. Chamando onComplete..."); // Veja isso no F12
        setTimeout(() => {
          onComplete(); 
        }, 500);
      }
    }, 300); 

    return () => clearInterval(interval);
  }, []); // Removi a dependência de onComplete para evitar loops

  return (
    <div className="fixed inset-0 z-[100] bg-[#02060a] flex items-center justify-center font-mono p-6">
      <div className="max-w-md w-full">
        <div className="space-y-1 mb-4 min-h-[150px]">
          {logs.map((log, i) => (
            <div key={i} className={`text-xs ${log.includes("CRITICAL") ? "text-red-500" : "text-cyan-400"}`}>
              {`> ${log}`}
            </div>
          ))}
        </div>
        <div className="h-1 w-full bg-gray-800">
          <div 
            className="h-full bg-cyan-400 transition-all duration-300" 
            style={{ width: `${(logs.length / bootMessages.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}