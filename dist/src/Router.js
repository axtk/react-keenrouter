import { createElement } from 'react';
import { Route } from '@axtk/router';
import { RouteContext } from './RouteContext';
export const Router = ({ route, includesPath, includesSearchParams, includesHash, ignoresPath, ignoresSearchParams, ignoresHash, children, }) => {
    let value;
    if (route instanceof Route)
        value = route;
    else if (route == null || typeof route === 'string')
        value = new Route(route, {
            // default: true
            pathname: includesPath !== false && ignoresPath !== true,
            // default: false
            search: includesSearchParams === true && ignoresSearchParams !== false,
            // default: false
            hash: includesHash === true && ignoresHash !== false,
        });
    else
        throw new Error('Router route of unknown type');
    return createElement(RouteContext.Provider, { value }, children);
};
