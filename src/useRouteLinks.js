import {useEffect} from 'react';
import {route} from 'router';

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
    useEffect(() => route.subscribe(links), [links]);
};
