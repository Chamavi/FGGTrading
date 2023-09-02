import { register } from "./auth/register";
import { login } from "./auth/login";

const server = Bun.serve({
  async fetch(req) {
    let error;
    const path = new URL(req.url).pathname;
    console.log(path);
    switch (path) {
      case "/":
        return new Response(Bun.file("./src/html/index.html"), {
          headers: {
            "Content-Type": "text/html",
          },
        });
      case "/index.css":
        return new Response(Bun.file("./src/css/index.css"), {
          headers: {
            "Content-Type": "text/css",
            "Cache-Control": "max-age=31536000",
          },
        });
      case "/register":
        error = register(await Bun.readableStreamToJSON(req.body))
        if (await error == 4){
          return new Response().redirect("./src/html/noname.html");
        }
        return new Response(await error);
      case "/login":
         error = login(await Bun.readableStreamToJSON(req.body))
        if (await error == "true"){
          return new Response().redirect("./src/html/noname.html");
        }
        return new Response(await error);
      default:
        return new Response(Bun.file("./src/html/404.html"), {
          headers: {
            /**
             *  ! PAGE NON FAITE
             */

            "Content-Type": "txt/html",
          },
        });
    }
  },

});

console.log(`Listening on http://localhost:${server.port}...`);
