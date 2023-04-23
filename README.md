[![npm](https://img.shields.io/npm/v/postrouter?labelColor=royalblue&color=royalblue&style=flat-square)](https://www.npmjs.com/package/postrouter) [![github](https://img.shields.io/badge/-github-royalblue?labelColor=royalblue&color=royalblue&style=flat-square&logo=github)](https://github.com/axtk/postrouter) ![react](https://img.shields.io/badge/%23-react-345?labelColor=345&color=345&style=flat-square) [![ssr](https://img.shields.io/badge/%23-ssr-345?labelColor=345&color=345&style=flat-square)](#server-side-rendering-ssr) ![typescript](https://img.shields.io/badge/%23-typescript-345?labelColor=345&color=345&style=flat-square)

# postrouter

*Componentless React router*

## Example

```jsx
import {createRoot} from 'react-dom/client';
import {useRoute, A} from 'postrouter';

const AppRoute = {
    HOME: '/',
    INTRO: '/intro',
    SECTION: /^\/section\/(?<id>\d+)\/?$/,
};
const allKnownRoutes = Object.values(AppRoute);

const App = () => {
    // the `useRoute()` hook subscribes the component to URL changes
    const [route, withRoute] = useRoute();

    return (
        <div className="app">
            <nav>
                {/* the route link component `A` looks similar to the
                    plain HTML link as it serves a similar purpose */}
                <A href={AppRoute.HOME}
                    // `withRoute()` checks the current location and
                    // works similar to the conditional ternary operator;
                    // below, it roughly means:
                    // `home location ? 'active' : undefined`
                    // (the omitted third argument is `undefined`)
                    className={withRoute(AppRoute.HOME, 'active')}>
                    Home
                </A>
                {' | '}
                <A href={AppRoute.INTRO}
                    className={withRoute(AppRoute.INTRO, 'active')}>
                    Intro
                </A>
            </nav>
            {withRoute(AppRoute.HOME, (
                <main id="home">
                    <h1>Home</h1>
                    <ul>
                        <li>
                            <A href="/section/1">Section #1</A>
                        </li>
                        <li>
                            <A href="/section/2">Section #2</A>
                        </li>
                    </ul>
                </main>
            ))}
            {/* although `withRoute()` calls may appear in groups like
                in this example, they work independently from each other
                and may as well be used uncoupled in different places of
                an application */}
            {withRoute(AppRoute.INTRO, (
                <main className="section" id="intro">
                    <h1>Intro</h1>
                </main>
            ))}
            {/* the second and the third argument of `withRoute()` can
                be functions of `{href, params}`, with `params`
                containing the capturing groups of the location pattern
                if it is a regular expression */}
            {withRoute(AppRoute.SECTION, ({params}) => (
                <main className="section">
                    <h1>Section #{params.id}</h1>
                </main>
            ))}
            {/* below, rendering `null` if the current location
                matches `allKnownRoutes`, and the 404 error screen
                otherwise */}
            {withRoute(allKnownRoutes, null, (
                <main className="error section">
                    <h1>404 Not found</h1>
                </main>
            ))}
            <footer>
                <hr/>
                <button onClick={() => {
                    // `route` has a `window.location`-like API and can
                    // be handy for direct manipulation of the location
                    route.assign(AppRoute.HOME);
                }}>
                    Home
                </button>
            </footer>
        </div>
    );
};

createRoot(document.querySelector('#app')).render(<App/>);
```

The `route` object returned from the `useRoute()` hook is an instance of the [`Location`](https://www.npmjs.com/package/histloc) class provided by the wrapping `<Router>` component. If there is no `<Router>` up the React node tree (like with `<App/>` in the example above), a default `route` based on the current page location is used. A wrapping `<Router>` can be useful to provide a custom `route` prop value that accepts either a string location or a `Location` class instance.

## Custom routing

The default `route` object returned from the `useRoute()` hook responds to changes in the entire URL, with `pathname`, `search`, and `hash` combined. This can be changed by providing an instance of a [customized](https://www.npmjs.com/package/histloc#custom-behavior) extension of the `Location` class to the `Router` component.

```jsx
import {createRoot} from 'react-dom/client';
import {Router, Location, getPath} from 'postrouter';

export class PathLocation extends Location {
    deriveHref(location) {
        // disregarding `search` and `hash`
        return getPath(location, {search: false, hash: false});
    }
}

createRoot(document.querySelector('#app')).render(
    <Router route={new PathLocation()}>
        <App/>
    </Router>
);
```

Extending the `Location` class gives plenty of room for customization. This approach allows in fact to go beyond the URL-based routing altogether.

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

The `useRouteLinks()` hook can be helpful when it's necessary to convert plain HTML links to SPA route links if the route link component is not applicable right away (for instance, in a server-fetched static chunk of HTML content):

```js
useRouteLinks(containerRef, '.content a');
// `containerRef` is a value returned from the React's `useRef()` hook.
```
