import {createElement} from 'react';
import {Route} from 'router';
import RouteContext from './RouteContext';

export default ({route, children}) => {
    return createElement(RouteContext.Provider, {value: route || new Route()}, children);
};
