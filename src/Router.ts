import {createElement, ReactNode} from 'react';
import {Location} from 'histloc';
import {RouteContext} from './RouteContext';

export type RouterProps = {
    route?: string | null | undefined | Location;
    children?: ReactNode;
};

export const Router = ({route, children}: RouterProps) => {
    let value;

    if (route instanceof Location)
        value = route;
    else if (route == null || typeof route === 'string')
        value = new Location(route);
    else
        throw new Error('Router route of unknown type');

    return createElement(RouteContext.Provider, {value}, children);
};
