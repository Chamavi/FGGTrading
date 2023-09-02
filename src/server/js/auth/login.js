import { Database } from "bun:sqlite";

export async function login(json) {
  try {
    let username = json["username"];
    let password1 = json["password"];
    console.log(1);
    const db = new Database("./src/db/mydb.sqlite");
    const test = db
      .query(`select username, password from login where username = $username `)
      .get({ $username: username });
    console.log(json);
    if (test !== null) {
      let hash = test["password"];
      const isMatch = await Bun.password.verify(password1[0], hash);
      if (isMatch) {
        return "true";
      } else {
        return "mot de passe incorrect";
      }
    } else {
      return "username ou mail inconnu";
    }

  } catch (error) {
    return "Veuillee reesayer ou contacter le site";
  }
}
