# react-router

This package extends *[router](https://github.com/axtk/router)* with the React hooks:

- `useRoute(onRouteChange?)`,
- `useRouteLinks(links)`,

and the `<Router>` component.

## Example

```jsx
// App.jsx
import {useRoute, useRouteLinks} from 'react-router';

const Route = {
    HOME: '/',
    INTRO: '/intro',
    SECTION: /^\/section\/(?<id>\d+)\/?$/,
};
const allKnownRoutes = Object.values(Route);

export default const App = () => {
    // the following hook enables the component's updates in response to URL changes,
    // and sets an optional callback to these changes, if passed as an argument
    const [route, withRoute] = useRoute();

    // the following hook enables navigation without page reloading via plain links,
    // which is an alternative to creating a history link component
    // (this hook will affect only same-origin links)
    useRouteLinks('.app a');

    return (
        <div className="app">
            <div className="navbar">
                <a href={Route.HOME} className={withRoute(Route.HOME, 'active', '')}>
                    Home
                </a>
                {' | '}
                <a href={Route.INTRO} className={withRoute(Route.INTRO, 'active', '')}>
                    Intro
                </a>
            </div>
            <div className="main">
                {withRoute(Route.HOME, (
                    <div className="section" id="home">
                        <h1>Home</h1>
                        <ul>
                            <li><a href="/section/1">Section #1</a></li>
                            <li><a href="/section/2">Section #2</a></li>
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

The browser environment allows the underlying context of the `<Router>` component to come up with a reasonable default route from the global context under the hood, and therefore wrapping the `<App/>` with a `<Router>` in the client-side code is unnecessary (although not impossible).

## SSR

While rendering server-side, it is convenient to provide a predefined context for the router hooks and utilities, so that the components were rendered according to the current route:

```jsx
// ...imports
import {Router} from 'react-router';

// with Express
app.get('/', (req, res) => {
    const html = ReactDOMServer.renderToString(
        <Router route={req.originalUrl}><App/></Router>
    );
    // ...
});
```

## Installation

```
npm i github:axtk/react-router
```
