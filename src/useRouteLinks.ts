import {useContext, useEffect, RefObject} from 'react';
import {subscribe} from '../lib/subscribe';
import {isLinkElement} from '../lib/isLinkElement';
import {isRouteEvent} from '../lib/isRouteEvent';
import {getNavigationMode} from './getNavigationMode';
import {RouteContext} from './RouteContext';

/**
 * Subscribes links to route changes to enable history navigation
 * without page reloading.
 *
 * The links can be represented as a selector, or an HTML element,
 * or a collection of HTML elements.
 */
export function useRouteLinks(
    scopeRef: RefObject<Element | Document>,
    links: string | Node | Array<string | Node> | HTMLCollection | NodeList,
): void {
    let route = useContext(RouteContext);

    useEffect(() => {
        let scope = scopeRef?.current;
        if (!scope) return;

        return subscribe({
            target: links,
            scope,
            handler: (event, element) => {
                if (
                    !event.defaultPrevented &&
                    (event instanceof MouseEvent || event instanceof TouchEvent) &&
                    isLinkElement(element) &&
                    isRouteEvent(event, element)
                ) {
                    event.preventDefault();

                    if (getNavigationMode(element.dataset) === 'replace')
                        route.replace(element.href);
                    else route.assign(element.href);
                }
            },
        });
    }, [route, links, scopeRef]);
}
