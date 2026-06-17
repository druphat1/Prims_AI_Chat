export interface LogEntry {
  timestamp: string;
  level: "info" | "warn" | "error" | "debug";
  message: string;
  traceId?: string;
  userId?: string;
  metadata?: Record<string, any>;
}
export const logger ={
    info: (message: string, metadata?: Record<string, any>) => {
        console.log(JSON.stringify({
            timestamp: new Date().toISOString(),
            level: "info",
             message,
            ...metadata,
        }as LogEntry))
    },
    warn(message:string, metadata?: Record<string,any>){
        console.warn(JSON.stringify({
             timestamp: new Date().toISOString(),
             level: "warn",
             message,
             ...metadata,
        } as LogEntry))
    },
    error(message:string ,err?: Error, metadata?: Record<string,any>){
        console.error(JSON.stringify({
      timestamp: new Date().toISOString(),
      level: "error",
      message,
      error: err?.message,
      stack: err?.stack,
      ...metadata,
    } as LogEntry));
    },
    debug: (message: string, metadata?: Record<string, any>) => {
    if (process.env.DEBUG) {
      console.log(JSON.stringify({
        timestamp: new Date().toISOString(),
        level: "debug",
        message,
        ...metadata,
      } as LogEntry));
    }
  },

}