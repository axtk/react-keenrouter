import { useContext, useCallback, createElement } from 'react';
import { isRouteLink, getPath } from '@axtk/router';
import { RouteContext } from './RouteContext';
export const A = ({ href, target, onClick, ...otherProps }) => {
    let route = useContext(RouteContext);
    let onLinkClick = useCallback(event => {
        if (isRouteLink({ href, target })) {
            event.preventDefault();
            route.assign(getPath(href));
        }
        if (onClick)
            onClick(event);
    }, [route, href, target, onClick]);
    return createElement('a', { href, target, onClick: onLinkClick, ...otherProps });
};
