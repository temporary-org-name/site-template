// console.log('\x1b[32m%s\x1b[0m', `${isProd ? 'Production' : 'Development'} building`);

const mode = process.env.MODE || 'development';
const params = {mode};

module.exports = ['client', 'server']
    .reduce((allConfigs, name) => {
        const getConfigs = require('./tools/webpack/' + name + '.config.js');
        const configs = getConfigs({...params});
        return [...allConfigs, ...configs];
    }, []);
