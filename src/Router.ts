import {createElement, FC} from 'react';
import {Route} from '@axtk/router';
import {RouteContext} from './RouteContext';

export type RouterProps = {
    route?: string | null | undefined | Route;
};

export const Router: FC<RouterProps> = ({route, children}) => {
    let value;

    if (route instanceof Route)
        value = route;
    else if (route == null || typeof route === 'string')
        value = new Route(route);
    else
        throw new Error('Router route of unknown type');

    return createElement(RouteContext.Provider, {value}, children);
};
