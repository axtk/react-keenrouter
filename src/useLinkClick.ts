import {useContext, useCallback, MouseEvent} from 'react';
import {isRouteEvent} from '../lib/isRouteEvent';
import {RouteContext} from './RouteContext';
import type {AProps} from './AProps';
import type {AreaProps} from './AreaProps';

export type UseLinkClickParams =
    | Pick<AProps, 'href' | 'target' | 'onClick'>
    | Pick<AreaProps, 'href' | 'target' | 'onClick'>;

export function useLinkClick({href, target, onClick}: UseLinkClickParams) {
    let route = useContext(RouteContext);

    return useCallback((event: MouseEvent<HTMLAnchorElement & HTMLAreaElement>) => {
        if (onClick)
            onClick(event);

        if (!event.defaultPrevented && isRouteEvent(event, {href, target})) {
            event.preventDefault();
            route.assign(href);
        }
    }, [route, href, target, onClick]);
}
