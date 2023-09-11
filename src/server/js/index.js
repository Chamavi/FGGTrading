import { register } from "./auth/register";
import { login } from "./auth/login";
import { bot } from "./bot/bot";
import crypto from "crypto";

const server = Bun.serve({
  port: 8080,
  development: true,
  async fetch(req, server) {
    let error;
    const path = new URL(req.url).pathname;
    console.log(path);
    const sessionId = crypto.randomBytes(16).toString('base64');;
    switch (path) {
            
      case "/":
        return new Response(Bun.file("./src/client/html/index.html"), {
          
          headers: {
            "Content-Type": "text/html",
            "Set-Cookie": "sessionId=" + sessionId + "; SameSite=SameSite; Secure",
          },
        });
       
      case "/index.css":
        return new Response(Bun.file("./src/client/css/index.css"), {
          headers: {
            "Content-Type": "text/css",
            "Cache-Control": "max-age=31536000",
          },
        });
      case "/register":
        error = register(await Bun.readableStreamToJSON(req.body));
        if ((await error) == 4) {
          return new Response().redirect("./src/client/html/noname.html");
        }
        return new Response(await error);
      case "/login":
        error = login(await Bun.readableStreamToJSON(req.body));

        if ((await error) == "true") {
          // string
          return new Response(Bun.file("./src/client/html/noname.html"), {
            headers: {
              "Content-Type": "text/html",
              location: "/noname",
            },
            status: 301,
          });
        } else {
          return new Response(JSON.stringify({ error: await error }), {
            headers: {
              "Content-Type": "application/json",

            },
          });
        }
      case "/favicon.ico":
      case "/img/fav.png":
        return new Response(Bun.file("./src/client/img/fav.png"), {
          headers: {
            "Content-Type": "image/png",
            "Cache-Control": "max-age=31536000",
          },
        });
      case "/img/lune.png":
        return new Response(Bun.file("./src/client/img/lune.png"), {
          headers: {
            "Content-Type": "image/png",
            "Cache-Control": "max-age=31536000",
          },
        });
      case "/img/vOn.png":
        return new Response(Bun.file("./src/client/img/vOn.png"), {
          headers: {
            "Content-Type": "image/png",
            "Cache-Control": "max-age=31536000",
          },
        });
      case "/img/vOff.png":
        return new Response(Bun.file("./src/client/img/vOff.png"), {
          headers: {
            "Content-Type": "image/png",
            "Cache-Control": "max-age=31536000",
          },
        });
      case "/img/soleil.png":
        return new Response(Bun.file("./src/client/img/soleil.png"), {
          headers: {
            "Content-Type": "image/png",
            "Cache-Control": "max-age=31536000",
          },
        });
      case "/noname":
       
        console.log(server.upgrade(req, {
          headers: {
            "Set-Cookie": `Set-Cookie=${sessionId}; SameSite=Strict`,
          },}));
        return new Response(Bun.file("./src/client/html/noname.html"), {
          headers: {
            "Content-Type": "text/html",
            "location": "/noname",
          },
          status: 200,
        });
      case "/js/noname.js":
        return new Response(Bun.file("./src/client/js/noname.js"), {
          headers: {
            "Content-Type": "application/javascript",
            "location": "/noname",
          },
          status: 200,
        });
      case "/js/biblio.js":
        return new Response(Bun.file("./src/client/js/biblio.js"), {
          headers: {
            "Content-Type": "application/javascript",
            "location": "/noname",
          },
          status: 200,
        });
      case "/js/index.js":
        return new Response(Bun.file("./src/client/js/index.js"), {
          headers: {
            "Content-Type": "application/javascript",
            "Cache-Control": "max-age=31536000",
          },
        });

      default:
        Response.redirect("/404")
        return new Response(Bun.file("./src/client/html/404.html"), {
          headers: {
            "Content-Type": "text/html",
            location: "/404",
          },
          status: 404,
        });
    }
  },
  websocket: {
    message(ws, message) {
      console.log(message);
      ws.send("Hello world");
    }
  }, // handlers
});




