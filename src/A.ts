import {useContext, useCallback, createElement, MouseEvent, HTMLProps} from 'react';
import {isRouteLink, getPath, HTMLLinkLikeElement} from '@axtk/router';
import {RouteContext} from './RouteContext';

export interface AProps extends HTMLProps<HTMLLinkLikeElement> {
    href?: string;
    target?: string;
    onClick?: (event: MouseEvent<HTMLLinkLikeElement>) => void;
}

export const A = ({href, target, onClick, ...otherProps}: AProps) => {
    let route = useContext(RouteContext);

    let onLinkClick = useCallback((event: MouseEvent<HTMLLinkLikeElement>) => {
        if (isRouteLink({href, target})) {
            event.preventDefault();
            route.assign(getPath(href));
        }

        if (onClick) onClick(event);
    }, [route, href, target, onClick]);

    return createElement('a', {href, target, onClick: onLinkClick, ...otherProps});
};
