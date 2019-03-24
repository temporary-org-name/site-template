import debug from 'debug';

export type LevelType = 'error' | 'info';

export interface IDebugTarget {
    error: (msg: string) => void;
    info: (msg: string) => void;
}

const DEBUG_NAME = 'site';

const proxy = new Proxy<IDebugTarget>({} as IDebugTarget, {
    get(target: IDebugTarget, prop: LevelType): Function {
        return prop in target ? target[prop] : target[prop] = debug(`${DEBUG_NAME}:${prop}`);
    }
});

export default proxy;