import {MouseEvent, useCallback, useContext} from 'react';
import {isRouteEvent} from '../lib/isRouteEvent';
import type {AProps} from './AProps';
import type {AreaProps} from './AreaProps';
import {getNavigationMode} from './getNavigationMode';
import {RouteContext} from './RouteContext';

export type UseLinkClickParams = AProps | AreaProps;

export function useLinkClick(props: UseLinkClickParams) {
    let {href, target, onClick} = props;
    let route = useContext(RouteContext);

    return useCallback((event: MouseEvent<HTMLAnchorElement & HTMLAreaElement>) => {
        if (onClick)
            onClick(event);

        if (!event.defaultPrevented && isRouteEvent(event, {href, target})) {
            event.preventDefault();

            if (getNavigationMode(props) === 'replace')
                route.replace(href);
            else route.assign(href);
        }
    }, [route, href, target, onClick]);
}
