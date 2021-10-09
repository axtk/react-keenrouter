import type {MouseEvent as ReactMouseEvent, TouchEvent as ReactTouchEvent} from 'react';
import {isSameOrigin} from '@axtk/router';

export type LinkProps = {
    href?: string | null | undefined;
    target?: string | null | undefined;
};

export const isRouteEvent = (
    event: MouseEvent | TouchEvent | ReactMouseEvent | ReactTouchEvent,
    {href, target}: LinkProps | HTMLAnchorElement | HTMLAreaElement,
): boolean => (
    (!('button' in event) || event.button === 0) &&
    !event.ctrlKey && !event.shiftKey && !event.altKey && !event.metaKey &&
    (!target || target === '_self') &&
    isSameOrigin(href)
);
