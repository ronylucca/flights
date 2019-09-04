const express    = require ('express');
const cors       = require ('cors');
const consign    = require ('consign');
const bodyParser = require ('body-parser');
const log4js     = require ('log4js');


//Properties are taken throught env vars. If not, default values are set.
const port = process.env.PORT || 8081;

global.Property = {
    URL_PATH_DYNAMO: process.env.DynamoDBEndPoint || "http://localhost:8000",
    REGION  : process.env.DynamoDBRegion || "us-east-1",
    TABLE : process.env.DynamoDBTable || "flights",
    SOURCE_FILE : process.env.FlightsSourceFile || "/tmp/BrFlights2.csv"
}

const app = express();

const logger = log4js.getLogger();

/** configure lo4js using JSON type file */
log4js.configure('./src/config/log4js.json');

/** enable cors */
app.use(cors());

/** parse application/x-www-form-urlencoded body for @module app */
app.use(bodyParser.urlencoded({
    extended: false,
}));

/** parse application json for @module app */
app.use(bodyParser.json());

/** use consign for autoload scripts into @module app */
consign({
        cwd: __dirname,
    })
    .include('routes')
    .into(app);


    /** server listening message at @module app */

    app.listen
    (
        port, (err) => 
        {
            if (err) 
            {
                logger.error (`Failed to listen on port ${port}.`);
                return process.exit (1);
            }
        // Using migrate on node   
        //migrateService.migrateFromSourceFile(Property.SOURCE_FILE)
        return logger.info(`Listening on port ${port}.`);
        }
    );


/** * Express App. * @module app */

module.exports = app;