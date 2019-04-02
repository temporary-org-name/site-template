/* import createBrowserHistory from 'history/createBrowserHistory';
import config from 'lib/config';

const history = createBrowserHistory({
    basename: config.appBasePath
});
const defaultSearchParams: URLSearchParams = new URLSearchParams('');

export default history;

export function setDefaultSearchParam(key: string, value: string): void {
    defaultSearchParams.set(key, value);
    push(history.location.pathname);
}

export function push(path: string | any): void {
    if (typeof path === 'object') {
        path = {
            ...path,
            search: defaultSearchParams.toString()
        };
    } else {
        path = {
            pathname: path,
            search: defaultSearchParams.toString()
        };
    }
    history.push(path);
} */