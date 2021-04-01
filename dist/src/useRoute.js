import { useContext, useState, useEffect, useMemo } from 'react';
import { withRoute as withRouteFactory } from '@axtk/router';
import { RouteContext } from './RouteContext';
export const useRoute = () => {
    let route = useContext(RouteContext);
    let [path, setPath] = useState(route.href);
    useEffect(() => route.onChange(event => setPath(event.path)), [route]);
    let withRoute = useMemo(() => withRouteFactory(route), [route]);
    return [route, withRoute];
};
