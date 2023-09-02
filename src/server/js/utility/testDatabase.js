import { Database } from "bun:sqlite";

const db =  new Database("./src/db/mydb.sqlite");


var test = db
.query(`select mail from login where mail = $mail `)
.get({ $mail: "aze" })

console.log(test["mail"])