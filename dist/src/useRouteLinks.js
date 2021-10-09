import { useContext, useEffect } from 'react';
import { RouteContext } from './RouteContext';
import { subscribe } from './subscribe';
import { isLinkElement } from './isLinkElement';
import { isRouteEvent } from './isRouteEvent';
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
        if (!scope)
            return;
        return subscribe(links, scope, 'click', (event, element) => {
            if (!event.defaultPrevented &&
                (event instanceof MouseEvent || event instanceof TouchEvent) &&
                isLinkElement(element) &&
                isRouteEvent(event, element)) {
                event.preventDefault();
                route.assign(element.href);
            }
        });
    }, [route, links, scopeRef]);
};
