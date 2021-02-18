import {useContext, useEffect} from 'react';
import RouteContext from './RouteContext';

/**
 * Subscribes links to route changes to enable history navigation
 * without page reloading.
 *
 * The links can be represented as a selector, or an HTML element,
 * or a collection of HTML elements.
 *
 * @param {string | string[] | HTMLElement | HTMLElement[] | HTMLCollection | NodeList} links
 */
export default links => {
    let route = useContext(RouteContext);
    useEffect(() => route.subscribe(links), [route, links]);
};
