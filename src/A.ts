import {useContext, useCallback, createElement, AnchorHTMLAttributes, MouseEvent} from 'react';
import {isSameOrigin} from '@axtk/router';
import {RouteContext} from './RouteContext';
import {isRouteEvent} from './isRouteEvent';

export const A = ({href, target, onClick, ...otherProps}: AnchorHTMLAttributes<HTMLAnchorElement>) => {
    let route = useContext(RouteContext);

    let handleClick = useCallback((event: MouseEvent<HTMLAnchorElement>) => {
        if (onClick)
            onClick(event);

        if (!event.defaultPrevented && isRouteEvent(event, {href, target})) {
            event.preventDefault();
            route.assign(href);
        }
    }, [route, href, target, onClick]);

    return createElement('a', {href, target, onClick: handleClick, ...otherProps});
};
