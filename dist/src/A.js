import { useContext, useCallback, createElement } from 'react';
import { hasRouteLinkProps, getPath } from '@axtk/router';
import { RouteContext } from './RouteContext';
export const A = ({ href, target, onClick, ...otherProps }) => {
    let route = useContext(RouteContext);
    let onLinkClick = useCallback((event) => {
        if (onClick)
            onClick(event);
        if (event.defaultPrevented)
            return;
        let hasModifierKey = event.ctrlKey || event.shiftKey || event.altKey || event.metaKey;
        let isDefaultClick = event.button === 0 && !hasModifierKey;
        if (isDefaultClick && hasRouteLinkProps({ href, target })) {
            event.preventDefault();
            route.assign(getPath(href));
        }
    }, [route, href, target, onClick]);
    return createElement('a', { href, target, onClick: onLinkClick, ...otherProps });
};
