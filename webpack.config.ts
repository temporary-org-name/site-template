import env from './src/server/lib/env';
console.log('\x1b[32m%s\x1b[0m', `Building in mode: ${env}`);

const params = {mode: env};

module.exports = ['client', 'server']
    .reduce((allConfigs, name) => {
        const getConfigs = require('./tools/webpack/' + name + '.config.js');
        const configs = getConfigs({...params});
        return [...allConfigs, ...configs];
    }, []);
