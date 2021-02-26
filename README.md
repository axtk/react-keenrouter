[![npm](https://img.shields.io/npm/v/@axtk/react-router?labelColor=royalblue&color=royalblue&style=flat-square)](https://www.npmjs.com/package/@axtk/react-router)
![browser](https://img.shields.io/badge/browser-✓-blue?labelColor=dodgerblue&color=dodgerblue&style=flat-square)
[![SSR](https://img.shields.io/badge/SSR-✓-blue?labelColor=dodgerblue&color=dodgerblue&style=flat-square)](#ssr)

*A lightweight React router*

# Usage

```jsx
// App.jsx
import {useRoute, useRouteLinks} from '@axtk/react-router';

const Route = {
    HOME: '/',
    INTRO: '/intro',
    SECTION: /^\/section\/(?<id>\d+)\/?$/,
};
const allKnownRoutes = Object.values(Route);

export default const App = () => {
    // The `useRoute` hook enables the component's updates in response
    // to URL changes, and sets an optional callback to these changes,
    // if passed as an argument.
    const [route, withRoute] = useRoute();

    // The `useRouteLinks` hook enables navigation without page
    // reloading via plain links, which is an alternative to creating
    // a history link component.
    // (This hook will affect only same-origin links.)
    useRouteLinks('.app a');

    return (
        <div className="app">
            <div className="navbar">
                <a href={Route.HOME}
                    className={withRoute(Route.HOME, 'active', '')}>
                    Home
                </a>
                {' | '}
                <a href={Route.INTRO}
                    className={withRoute(Route.INTRO, 'active', '')}>
                    Intro
                </a>
            </div>
            <div className="main">
                {withRoute(Route.HOME, (
                    <div className="section" id="home">
                        <h1>Home</h1>
                        <ul>
                            <li>
                                <a href="/section/1">Section #1</a>
                            </li>
                            <li>
                                <a href="/section/2">Section #2</a>
                            </li>
                        </ul>
                    </div>
                ))}
                {withRoute(Route.INTRO, (
                    <div className="section" id="intro">
                        <h1>Intro</h1>
                    </div>
                ))}
                {withRoute(Route.SECTION, ({params}) => (
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

# SSR

While rendering server-side, it is convenient to provide a predefined context for the router hooks and utilities, so that the components were rendered according to the current route:

```jsx
// ...imports
import {Router} from '@axtk/react-router';

// with Express
app.get('/', (req, res) => {
    const html = ReactDOMServer.renderToString(
        <Router route={req.originalUrl}><App/></Router>
    );
    // ...
});
```

# Also

- *[router](https://github.com/axtk/router)*, the `Route` class without React hooks
