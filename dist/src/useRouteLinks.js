import { useContext, useEffect } from 'react';
import { RouteContext } from './RouteContext';
/**
 * Subscribes links to route changes to enable history navigation
 * without page reloading.
 *
 * The links can be represented as a selector, or an HTML element,
 * or a collection of HTML elements.
 */
export const useRouteLinks = (scopeRef, links) => {
    let route = useContext(RouteContext);
    useEffect(() => {
        let scope = scopeRef && scopeRef.current;
        if (scope)
            return route.subscribe(links, scope);
    }, [route, links, scopeRef]);
};
