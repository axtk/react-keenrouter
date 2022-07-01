[![npm](https://img.shields.io/npm/v/postrouter?labelColor=royalblue&color=royalblue&style=flat-square)](https://www.npmjs.com/package/postrouter) [![github](https://img.shields.io/badge/-github-royalblue?labelColor=royalblue&color=royalblue&style=flat-square&logo=github)](https://github.com/axtk/postrouter) ![react](https://img.shields.io/badge/%23-react-345?labelColor=345&color=345&style=flat-square) [![ssr](https://img.shields.io/badge/%23-ssr-345?labelColor=345&color=345&style=flat-square)](#server-side-rendering-ssr) ![typescript](https://img.shields.io/badge/%23-typescript-345?labelColor=345&color=345&style=flat-square)

# postrouter

- the route link component looks similar to a plain HTML link (which makes the route link immediately familiar and interchangeable with the ordinary HTML link);
- route matching is easily applicable to both components and prop values;
- plain HTML links (e.g. in a chunk of static content) are easily convertable to route links;
- the server-side rendering (SSR) setup is identical to the client-side setup.

## Usage

```jsx
import {createRoot} from 'react-dom/client';
import {useRoute, A} from 'postrouter';
// `A` is a link component enabling navigation without page reloading.
// (To comply with the History API, it won't require page reloads as
// long as the `href` prop value is a same-origin location. With
// non-same-origin URLs, `A` will act as a plain HTML link.)

const AppRoute = {
    HOME: '/',
    INTRO: '/intro',
    SECTION: /^\/section\/(?<id>\d+)\/?$/,
};
const allKnownRoutes = Object.values(AppRoute);

const App = () => {
    // The `useRoute` hook enables the component's updates in response
    // to URL changes.
    const [route, withRoute] = useRoute();
    // `route` is a utility object providing a `window.location`-like
    //    API for the interaction with the app's route and allowing
    //    for subscription to URL path changes.
    // `withRoute(routePattern, x, y)` is a function acting somewhat
    //    similar to the ternary operator (`?:`); it returns `x` if
    //    `routePattern` matches the current route and `y` otherwise.
    //    `x` and `y` can also be functions of `({path, params})` with
    //    `params` containing the values of the capturing groups (both
    //    named and unnamed) if `routePattern` is a regular expression.

    return (
        <div className="app">
            <div className="navbar">
                <A href={AppRoute.HOME}
                    className={withRoute(AppRoute.HOME, 'active')}>
                    Home
                </A>
                {' | '}
                <A href={AppRoute.INTRO}
                    className={withRoute(AppRoute.INTRO, 'active')}>
                    Intro
                </A>
            </div>
            <div className="main">
                {withRoute(AppRoute.HOME, (
                    <div className="section" id="home">
                        <h1>Home</h1>
                        <ul>
                            <li>
                                <A href="/section/1">Section #1</A>
                            </li>
                            <li>
                                <A href="/section/2">Section #2</A>
                            </li>
                        </ul>
                    </div>
                ))}
                {withRoute(AppRoute.INTRO, (
                    <div className="section" id="intro">
                        <h1>Intro</h1>
                    </div>
                ))}
                {withRoute(AppRoute.SECTION, ({params}) => (
                    <div className="section">
                        <h1>Section #{params.id}</h1>
                    </div>
                ))}
                {withRoute(allKnownRoutes, null, (
                    <div className="error section">
                        <h1>404 Not found</h1>
                    </div>
                ))}
                <div className="footer">
                    <hr/>
                    <button onClick={() => {
                        // `route` can be handy where `<A>` and
                        // `withRoute` are not applicable
                        route.assign(AppRoute.HOME);
                    }}>
                        Home
                    </button>
                </div>
            </div>
        </div>
    );
};

createRoot(document.querySelector('#app')).render(<App/>);
```

The `route` object returned from the `useRoute()` hook is provided by the wrapping `<Router>` component. If there is no `<Router>` up the React node tree (like with `<App/>` in the example above), a default `route` based on the current page location is used. Therefore, a wrapping `<Router>` can only be useful to provide a custom `route` prop value (which is either a string location or a `Location` class instance).

## Server-side rendering (SSR)

For the initial render on the server, the `<Router>` component can be used to pass the current route location to the application in essentially the same way as it can be done in the client-side code:

```jsx
// On the Express server
app.get('/', (req, res) => {
    const html = ReactDOMServer.renderToString(
        <Router route={req.originalUrl}><App/></Router>
    );

    // Sending the resulting HTML to the client.
});
```

## Converting plain links

In some cases, it can be necessary to convert plain HTML links to SPA route links (that is to make them navigable without page reloading), where the route link component (shown in the example above) is not applicable right away. For instance:

- if the plain links are part of a server-fetched chunk of content, or
- if the plain links are part of a fixed internationalization string, or
- if the plain links have already been used in many parts of the application.

In these cases, the `useRouteLinks()` hook can be helpful.

```js
// With this hook, the plain links matching the selector will become
// navigable without page reloading.
useRouteLinks(componentRef, '.content a');
// `componentRef` is a value returned from the React's `useRef` hook.
```
