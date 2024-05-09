import {useCallback, useContext, useEffect, useState} from 'react';
import {NavigationLocation} from 'navloc';
import {RouteContext} from './RouteContext';

export type WithRoute = NavigationLocation['evaluate'];

export function useRoute(): [NavigationLocation, WithRoute] {
    let route = useContext(RouteContext);
    let [, setHref] = useState(route.href);

    useEffect(
        () => route.onChange(event => setHref(event.href)),
        [route],
    );

    let withRoute: WithRoute = useCallback(
        (locationPattern, x, y) => route.evaluate(locationPattern, x, y),
        [route],
    );

    return [route, withRoute];
}
