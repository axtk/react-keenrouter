import {createElement} from 'react';
import {Route} from '@axtk/router';
import RouteContext from './RouteContext';

export default ({
    route,
    includesPathName,
    includesSearchParams,
    includesHash,
    ignoresPathName,
    ignoresSearchParams,
    ignoresHash,
    children,
}) => {
    let value;

    if (route == null || typeof route === 'string')
        value = new Route(route, {
            // default: true
            pathname: includesPathName !== false && ignoresPathName !== true,
            // default: false
            search: includesSearchParams === true && ignoresSearchParams !== false,
            // default: false
            hash: includesHash === true && ignoresHash !== false,
        });
    else if (route instanceof Route)
        value = route;
    else
        throw new Error('Router route of unknown type');

    return createElement(RouteContext.Provider, {value}, children);
};
