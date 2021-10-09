import { isSameOrigin } from '@axtk/router';
export const isRouteEvent = (event, { href, target }) => ((!('button' in event) || event.button === 0) &&
    !event.ctrlKey && !event.shiftKey && !event.altKey && !event.metaKey &&
    (!target || target === '_self') &&
    isSameOrigin(href));
