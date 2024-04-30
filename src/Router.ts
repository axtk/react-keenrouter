import {createElement, ReactNode} from 'react';
import {NavigationLocation} from 'navloc';
import {RouteContext} from './RouteContext';

export type RouterProps = {
    route?: string | null | undefined | NavigationLocation;
    children?: ReactNode;
};

export const Router = ({route, children}: RouterProps) => {
    let value;

    if (route instanceof NavigationLocation)
        value = route;
    else if (route == null || typeof route === 'string')
        value = new NavigationLocation(route);
    else
        throw new Error('Router route of unknown type');

    return createElement(RouteContext.Provider, {value}, children);
};
