import { useContext, useCallback, createElement } from 'react';
import { RouteContext } from './RouteContext';
import { isRouteEvent } from './isRouteEvent';
export const A = ({ href, target, onClick, ...otherProps }) => {
    let route = useContext(RouteContext);
    let handleClick = useCallback((event) => {
        if (onClick)
            onClick(event);
        if (!event.defaultPrevented && isRouteEvent(event, { href, target })) {
            event.preventDefault();
            route.assign(href);
        }
    }, [route, href, target, onClick]);
    return createElement('a', { href, target, onClick: handleClick, ...otherProps });
};
