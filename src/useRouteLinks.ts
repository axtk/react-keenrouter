import {useContext, useEffect} from 'react';
import {RouteContext} from './RouteContext';

/**
 * Subscribes links to route changes to enable history navigation
 * without page reloading.
 *
 * The links can be represented as a selector, or an HTML element,
 * or a collection of HTML elements.
 */
export const useRouteLinks = (
    links: string | Node | Array<string | Node> | HTMLCollection | NodeList
): void => {
    let route = useContext(RouteContext);
    useEffect(() => route.subscribe(links), [route, links]);
};
