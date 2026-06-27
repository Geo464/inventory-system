const sql = require("mssql");

const configure = {
    user: "geoAdmon",
    password: "geo2027YT",
    server: "localhost",
    database: "inventory_system",
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
};

const ConnectSQL = new sql.ConnectionPool(configure).connect()
.then(    
    pool => {
        console.log("Servidor Conectado");
        return pool;
    }
).catch(
    err => {
        console.log("Base de datos no conectada a servidor" , err);
    }
);
module.exports = {
    sql, 
    ConnectSQL
};