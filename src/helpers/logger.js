const Log4js = require('log4js');

//***   Configure lo4js using JSON type file
Log4js.configure ('./src/config/log4js.json');

exports.getLogger = (nomeArquivo) => { return Log4js.getLogger(); }