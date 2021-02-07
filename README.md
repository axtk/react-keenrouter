# react-router

*A lightweight React router*

## Usage

```jsx
import ReactDOM from 'react-dom';
import {useRoute, useRouteLinks, withRoute} from 'react-router';

const Route = {
    HOME: '/',
    INTRO: '/intro',
    SECTION: /^\/section\/(?<id>\d+)\/?$/,
};
const allKnownRoutes = Object.values(Route);

const App = () => {
    // the hook returns [path, setPath], unused and omitted in this example
    useRoute();

    // subscribing plain links to the route object is an alternative to
    // creating a history link component
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
                {withRoute('*', (
                    <div className="footer">
                        <hr/>
                        {new Date().toDateString()}
                    </div>
                ))}
            </div>
        </div>
    );
};

ReactDOM.render(<App/>, document.querySelector('#root'));
```

## Installation

```
npm i github:axtk/react-router
```
