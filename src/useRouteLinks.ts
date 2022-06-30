import {useContext, useEffect, RefObject} from 'react';
import {RouteContext} from './RouteContext';
import {subscribe} from './subscribe';
import {isLinkElement} from './isLinkElement';
import {isRouteEvent} from './isRouteEvent';

/**
 * Subscribes links to route changes to enable history navigation
 * without page reloading.
 *
 * The links can be represented as a selector, or an HTML element,
 * or a collection of HTML elements.
 */
export const useRouteLinks = (
    scopeRef: RefObject<Element | Document>,
    links: string | Node | Array<string | Node> | HTMLCollection | NodeList,
): void => {
    let route = useContext(RouteContext);

    useEffect(() => {
        let scope = scopeRef?.current;
        if (!scope) return;

        return subscribe({
            target: links,
            scope,
            type: 'click',
            handler: (event, element) => {
                if (
                    !event.defaultPrevented &&
                    (event instanceof MouseEvent || event instanceof TouchEvent) &&
                    isLinkElement(element) &&
                    isRouteEvent(event, element)
                ) {
                    event.preventDefault();
                    route.assign(element.href);
                }
            },
        });
    }, [route, links, scopeRef]);
};
