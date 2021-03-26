[![npm](https://img.shields.io/npm/v/@axtk/react-router?labelColor=royalblue&color=royalblue&style=flat-square)](https://www.npmjs.com/package/@axtk/react-router)
![browser](https://img.shields.io/badge/browser-✓-blue?labelColor=dodgerblue&color=dodgerblue&style=flat-square)
[![SSR](https://img.shields.io/badge/SSR-✓-blue?labelColor=dodgerblue&color=dodgerblue&style=flat-square)](#ssr)

*A lightweight React router*

## Usage

```jsx
// App.jsx
import {useRoute, A} from '@axtk/react-router';
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

export default const App = () => {
    // The `useRoute` hook enables the component's updates in response
    // to URL changes.
    const [route, withRoute] = useRoute();
    // `route` is an instance of the `Route` class providing a
    //     `window.location`-like API for interaction with the URL
    //     history and allowing for subscription to URL path changes
    //     (see @axtk/router).
    // `withRoute(routePattern, x, y)` is a function acting somewhat
    //     similar to the ternary operator (`?:`); it returns `x` if
    //     `routePattern` matches the current route and `y` otherwise.
    //     `x` and `y` can also be functions of `({path, params})` with
    //     `params` containing the values of the capturing groups (both
    //     named and unnamed) if `routePattern` is a regular expression.

    return (
        <div className="app">
            <div className="navbar">
                <A href={AppRoute.HOME}
                    className={withRoute(AppRoute.HOME, 'active', '')}>
                    Home
                </A>
                {' | '}
                <A href={AppRoute.INTRO}
                    className={withRoute(AppRoute.INTRO, 'active', '')}>
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
                    <div className="section" id="section">
                        <h1>Section #{params.id}</h1>
                    </div>
                ))}
                {withRoute(allKnownRoutes, null, (
                    <div className="section" id="404">
                        <h1>404 Not found</h1>
                    </div>
                ))}
                <div className="footer">
                    <hr/>
                    {new Date().toDateString()}
                </div>
            </div>
        </div>
    );
};
```

```jsx
// index.js
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(<App/>, document.querySelector('#root'));
```

Generally, `route` returned from the `useRoute` hook is provided by the wrapping `<Router>` component. If there is no `<Router>` up the React node tree (as with `<App/>` in the example above), a default `route` based on the current page location is used. The wrapping `<Router>` is therefore unnecessary unless it should have prop values (`route`, `includesSearchParams`, `includesHash`) different from the default.

&rarr; *[Route API](https://github.com/axtk/router/blob/master/README.md#usage)*

## Server-side rendering (SSR)

On the server, the current route location can be passed to the application by means of the `<Router>` component (in essentially the same way as it can be done in the client-side code):

```jsx
// ...imports
import {Router} from '@axtk/react-router';

// with Express
app.get('/', (req, res) => {
    const html = ReactDOMServer.renderToString(
        <Router route={req.originalUrl}><App/></Router>
    );

    // Sending the resulting HTML to the client.
});
```

## Converting plain links

In some cases, it can be necessary to make plain HTML links navigable without page reloading. For instance:

- if the plain links are part of a server-fetched chunk of content, or
- if the plain links are part of a fixed internationalization string, or
- if the plain links have already been used in many parts of the application.

In these cases, the `useRouteLinks` hook can be helpful.

```js
// With this hook, the plain links matching the selector will become
// navigable without page reloading.
useRouteLinks('.content a');
```

## Also

- *[@axtk/router](https://github.com/axtk/router)*, the `Route` class without React hooks
