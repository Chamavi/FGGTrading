import { register } from "./auth/register";
import { login } from "./auth/login";
const server = Bun.serve({
  development: true,
  async fetch(req) {
    let error;
    const path = new URL(req.url).pathname;
    console.log(path);
    switch (path) {
      case "/":
        return new Response(Bun.file("./src/client/html/index.html"), {
          headers: {
            "Content-Type": "text/html",
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
          Response.redirect("/noname");
          return new Response(Bun.file("./src/client/html/noname.html"), {
            headers: {
              "Content-Type": "text/html",
              location: "/noname",
            },
            status: 302,
          });
        } else {
          return new Response(Bun.file("./src/client/html/index.html"), {
            headers: {
              "Content-Type": "text/html",
              "HX-Trigger-Data": JSON.stringify({ error: await error })
            },
          });
        }
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
        return new Response(Bun.file("./src/client/html/noname.html"), {
          headers: {
            "Content-Type": "text/html",
            "location": "/noname",
          },
          status: 200,
        });
      case "/404":
        return new Response(Bun.file("./src/client/html/404.html"), {
          headers: {
            "Content-Type": "text/html",
            location: "/404",
          },
          status: 200,
        });

      default:
        Response.redirect("/404")
        return new Response(Bun.file("./src/client/html/404.html"), {
          headers: {
            "Content-Type": "text/html",
            location: "/404",
          },
          status: 301,
        });
    }
  },
});

console.log(`Listening on http://localhost:${server.port}...`);
