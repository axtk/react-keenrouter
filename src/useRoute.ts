import {useContext, useState, useEffect, useMemo} from 'react';
import {withRoute as withRouteFactory, Route} from '@axtk/router';
import {RouteContext} from './RouteContext';

export type WithRoute = ReturnType<typeof withRouteFactory>;

export const useRoute = (): [Route, WithRoute] => {
    let route = useContext(RouteContext);
    let [path, setPath] = useState(route.href);

    useEffect(
        () => route.onChange(event => setPath(event.href)),
        [route]
    );

    let withRoute = useMemo(() => withRouteFactory(route), [route]);
    return [route, withRoute];
};
