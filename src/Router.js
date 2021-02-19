import {createElement} from 'react';
import {Route} from 'router';
import RouteContext from './RouteContext';

export default ({route, children}) => {
    let value = typeof route === 'string' ? new Route(route) : (route || new Route());
    return createElement(RouteContext.Provider, {value}, children);
};
