import {useContext, useState, useEffect, useCallback} from 'react';
import {Location} from 'histloc';
import {RouteContext} from './RouteContext';

export type WithRoute = Location['evaluate'];

export function useRoute(): [Location, WithRoute] {
    let route = useContext(RouteContext);
    let [, setHref] = useState(route.href);

    useEffect(
        () => route.onChange(event => setHref(event.href)),
        [route]
    );

    let withRoute: WithRoute = useCallback(
        (locationPattern, x, y) => route.evaluate(locationPattern, x, y),
        [route]
    );

    return [route, withRoute];
}
