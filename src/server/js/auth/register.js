import { Database } from "bun:sqlite";

export async function register(json) {

  try {

    let mail = json["mail"];
    let username = json["username"];
    let password1 = json["password"][0];
    let password2 = json["password"][1];
    const db = new Database("./src/db/mydb.sqlite");
        if (
            db
              .query(`select mail from login where mail = $mail `)
              .get({ $mail: mail }) !== null
          ) {
            return "mail deja present";
          }

 
    if (
      db
        .query(`select username from login where username = $username `)
        .get({ $username: username }) !== null
    ) {
      return "username deja present";
    }
    if (password1 !== password2) {
      return "les mots de passes ne sont pas identique";
    }
    const bcryptHash = await Bun.password.hash(password1, {
      algorithm: "bcrypt",
      cost: 4, // number between 4-31
    });
    db.query(
      "INSERT INTO login (mail,username,password) Values ($mail, $username, $password )"
    ).run({ $mail: mail, $username: username, $password: bcryptHash });
    
    return 
  } catch (error) {
    return "Veuilleze reesayer ou contacter le site";
  }
}

