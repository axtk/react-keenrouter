import {useContext, useState, useEffect, useCallback} from 'react';
import type {Route, RoutePattern} from '@axtk/router';
import {RouteContext} from './RouteContext';

export interface RouteMatchPayload {
    path: string;
    params: {
        [key: string]: string;
    };
}
export type RouteMatchHandler = (payload?: RouteMatchPayload) => any;

export type EitherOf<X, Y> = (
    (X extends RouteMatchHandler ? ReturnType<X> : X) |
    (Y extends RouteMatchHandler ? ReturnType<Y> : Y)
);
export type WithRoute = <X, Y = X>(routePattern: RoutePattern, matchOutput?: X, unmatchOutput?: Y) => EitherOf<X, Y>;

export const useRoute = (): [Route, WithRoute] => {
    let route = useContext(RouteContext);
    let [path, setPath] = useState(route.href);

    useEffect(
        () => route.onChange(event => setPath(event.path)),
        [route]
    );

    let withRoute = useCallback(
        <X, Y>(routePattern: RoutePattern, matchOutput?: X, unmatchOutput?: Y): EitherOf<X, Y> => {
            let matches = route.match(routePattern);
            let payload = {path: route.href, params: matches || {}};

            return matches === null ?
                (typeof unmatchOutput === 'function' ? unmatchOutput(payload) : unmatchOutput) :
                (typeof matchOutput === 'function' ? matchOutput(payload) : matchOutput);
        },
        [route]
    );

    return [route, withRoute];
};
