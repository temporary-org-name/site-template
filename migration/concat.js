const fs = require('fs');

const RESULT_FILE = `${__dirname}/result.pgsql`;
try {
    fs.unlinkSync(RESULT_FILE);
} catch (e) {}

const fileNames = [];

fileNames.forEach((name) => {
    const data = fs.readFileSync(`${__dirname}/${name}.pgsql`);
    fs.appendFileSync(RESULT_FILE, data);
});

