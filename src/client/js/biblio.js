

function switchTheme() {
    if (document.getElementById("body").classList.contains("ui-dark-theme")) {
        document.getElementById("body").classList.replace("ui-dark-theme", "ui-light-theme")
        document.getElementById("modeImage").src = "./../img/lune.png"
        let img = document.getElementById("vOn");
        let img2 = document.getElementById("vOff");
        img.classList.replace("light", "dark");
        img2.classList.replace("light", "dark");

    } else {
        document.getElementById("body").classList.replace("ui-light-theme", "ui-dark-theme")
        document.getElementById("modeImage").src = "./../img/soleil.png"
        let img = document.getElementById("vOn");
        let img2 = document.getElementById("vOff");
        img.classList.replace("dark", "light");
        img2.classList.replace("dark", "light");

    }

}

async function register() {
    let mail = document.getElementsByName("mail").value;
    let username = document.getElementsByName("username").value;
    let password = document.getElementsByName("password").value;
    let password2 = document.getElementsByName("password2").value;
    if (password !== password2) {
        document.getElementsByName("error").innerHTML = "Les mots de passe ne correspondent pas";
    } else {
        // post to /register this information in json format
        fetch("/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE",
                "Access-Control-Max-Age": "3600",
                "Access-Control-Allow-Credentials": "true",
                "X-Requested-With": "XMLHttpRequest",
                "X-CSRF-TOKEN": "{{ csrf_token() }}",


            },
            body: JSON.stringify({
                mail: mail,
                username: username,
                password: password
            }),

        })
    }
    return res;
};

async function login() {

    let username = document.getElementsByName("username")[0].value;
    let password = document.getElementsByName("password")[0].value;
    console.log(username);
    // post to /login this information in json format
    let res = await fetch("/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE",
            "Access-Control-Max-Age": "3600",
            "Access-Control-Allow-Credentials": "true",
            "X-Requested-With": "XMLHttpReqest",
            "X-CSRF-TOKEN": "{{ csrf_token() }}",
        },
        body: JSON.stringify({
            username: username,
            password: password
        }),
    });
    if (res.status === 200 && res.headers.get("Location") === "/noname") {
        switchUrl("/noname ");





        //function for create a cookie when is connected

    } else {
        //json to string
        //get the value of  error in error who is equalt to Object { error: "mot de passe incorrect" }
        let error = await res.json();



        document.getElementById("error").innerHTML = error.error;
    };
    return res;
}

function switchUrl(url) {
    window.location.href = url;

}

function viewMDP() {
    const input = document.getElementsByName("password");
    console.log(input);
    for (const element of input) {
        console.log(element)
        if (element.getAttribute("type") === "password") {
            element.setAttribute("type", "text");
        } else {
            element.setAttribute("type", "password");
        }
    }



}

function send(socket, message) {
    socket.send(message);
}


export { register, login, switchTheme, switchUrl,viewMDP, send }