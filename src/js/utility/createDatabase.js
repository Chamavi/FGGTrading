import { Database } from "bun:sqlite";

const db =  new Database("./src/db/mydb.sqlite");
db.query(`create table login(
    id INTEGER Primary Key AUTOINCREMENT,
    mail TEXT NOT NULL,
    username TEXT NOT NULL,
    password TEXT NOT NULL
);`).run();