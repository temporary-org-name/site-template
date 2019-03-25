interface IMapValue {
    [key: string]: string;
}

const map = new Map<string, IMapValue>();

map.set('key', {
    text1: 'text1_ru',
    text2: 'text2_ru'
});

export default map;