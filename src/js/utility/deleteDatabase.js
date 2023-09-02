import { Database } from "bun:sqlite";

const db =  new Database("./src/db/mydb.sqlite");
db.query(`DROP TABLE login;`).run();