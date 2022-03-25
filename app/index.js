import Home from "./views/Home.js"

const pathToRegex = path => new RegExp("^" + path
  .replace(/\//g, "\\/")
  .replace(/:\w+/g, "(.+)") + "$");

const getParams = match => {
    const values = match.result.slice(1);
    const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(result => result[1]);
    return Object.fromEntries(keys.map((key, i) => {
        return [key, values[i]];
    }));
};

const navigateTo = url => {
    history.pushState(null, null, url);
    router();
};

const router = async() => {

    //https://javascript.plainenglish.io/implementing-login-case-using-localstorage-and-sessionstorage-bfddce5d2198

    //TESTING AUTHENTICATION/ADMIN ROUTES
    // sessionStorage.setItem("auth", 3);
    //sessionStorage.setItem("admin", true);

    //GET AUTH & ADMIN VALIDATION FROM LOCAL STORAGE
    // let auth = sessionStorage.getItem("auth")
    // let admin = sessionStorage.getItem("admin")

    //ROUTES AVAILABLE IF NOT LOGGED IN
    let routes = [
        { path: "/home", view: Home }
    ]

    //ROUTES AVAILABLE IF LOGGED IN
    // if (auth) {
    //     routes = routes.concat([])

    //     //ROUTES ALSO AVAILABLE IF LOGGED IN && ADMIN
    //     if (admin) {
    //         routes = routes.concat([])
    //     }
    // }

    // Test each route to see if the pathname in the URL matches the regex pattern of the path
    const potentialMatches = routes.map(route => {
        console.log(location.pathname)
        return {
            route: route,
            result: location.pathname.match(pathToRegex(route.path))
        };
    });

    //let match equal the response from above where the "result" does not equal null
    let match = potentialMatches.find(potentialMatch => potentialMatch.result !== null);

    //if there is no match, match to 404 route
    if (!match) {
        match = {
            route: routes[0],
            result: [location.pathname]
        };
    }

    //Render the view by calling the class for that view
    //e.g. of the path is "/home", new match.route.view() === new Home()
    //use "getParams" to access the params and send them in as parameters to the class
    const view = new match.route.view(getParams(match))

    document.querySelector("#app").innerHTML = await view.getHtml();
    await view.postRender();
}

//run the router when client navigates through history (e.g. clicks back button)
window.addEventListener("popstate", router)

document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", e => {
        if (e.target.matches("[data-link]")) {
            e.preventDefault()
            navigateTo(e.target.href)
        }
    })
    router();
});
