type LangType = 'en' | 'ru';

import en from './en';
import ru from './ru';

export default (lang: LangType, key: string) => {
    if (lang === 'ru') {
        return ru.get(key);
    } else {
        return en.get(key);
    }
};