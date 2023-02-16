const path = require("path");
const fs = require("fs");
const dotenv = require("dotenv");

const baseUrl = ( url ) => {
    if( path.isAbsolute( url ) ) return url;
    else return path.join( process.env.APP_BASE_URL, url);
}

const exist = ( url ) => {
    if( path.isAbsolute( url ) == false ) url = baseUrl( url );
    return fs.existsSync( url );
}

const useenv = () => {
    const env = baseUrl(".env")
    const envProduction = baseUrl(".env.production");
    if(exist(env)) dotenv.config({path: env});
    else dotenv.config({path: envProduction});
}

module.exports = {
    baseUrl,
    exist,
    useenv
}