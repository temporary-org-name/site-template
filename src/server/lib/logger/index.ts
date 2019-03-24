import consoleLogger, {LevelType} from 'server/lib/logger/console-logger';
import fileLogger from 'server/lib/logger/file-logger';
import env from 'server/lib/env';

type LoggerType = 'app' | 'db';

const formMessage = (type: LoggerType, msg: string) => {
    return `[${type}]: ${msg}`;
};

export default (level: LevelType, type: LoggerType, msg: string) => {
    const msgResult = formMessage(type, msg);

    const f = env === 'development' ? consoleLogger : fileLogger;
    (f as any)[level](msgResult);
};