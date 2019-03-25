interface IMapValue {
    [key: string]: string;
}

const map = new Map<string, IMapValue>();

map.set('key', {
    text1: 'text1_en',
    text2: 'text2_en'
});

export default map;