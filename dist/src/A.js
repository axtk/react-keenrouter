import { useContext, useCallback, createElement } from 'react';
import { hasRouteLinkProps, getPath } from '@axtk/router';
import { RouteContext } from './RouteContext';
export const A = ({ href, target, onClick, ...otherProps }) => {
    let route = useContext(RouteContext);
    let onLinkClick = useCallback(event => {
        if (hasRouteLinkProps({ href, target })) {
            event.preventDefault();
            route.assign(getPath(href));
        }
        if (onClick)
            onClick(event);
    }, [route, href, target, onClick]);
    return createElement('a', { href, target, onClick: onLinkClick, ...otherProps });
};
