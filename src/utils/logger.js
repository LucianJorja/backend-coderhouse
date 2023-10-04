import { createLogger, format, transports } from "winston";

const { combine, printf, timestamp, colorize } = format;

export const LOG_LEVELS = {
    DEBUG: 'debug',
    HTTP: 'http',
    INFO: 'info',
    WARNING: 'warning',
    ERROR: 'error',
};


const consoleFormat = combine(
    colorize(),
    timestamp({
        format: 'MMM-DD-YYYY HH:mm:ss'
    }),
    printf((info) => `${info.level} | ${info.timestamp} | ${info.message}`)
);

export const logger = createLogger({
    level: LOG_LEVELS.DEBUG,
    format: consoleFormat,
    transports: [new transports.Console()]
});


