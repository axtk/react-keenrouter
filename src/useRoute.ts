import {useContext, useState, useEffect, useCallback} from 'react';
import {Location} from 'histloc';
import {RouteContext} from './RouteContext';

export type WithRoute = Location['evaluate'];

export const useRoute = (): [Location, WithRoute] => {
    let route = useContext(RouteContext);
    let [path, setPath] = useState(route.href);

    useEffect(
        () => route.onChange(event => setPath(event.href)),
        [route]
    );

    let withRoute: WithRoute = useCallback(
        (locationPattern, x, y) => route.evaluate(locationPattern, x, y),
        [route]
    );

    return [route, withRoute];
};
