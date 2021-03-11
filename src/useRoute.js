import {useContext, useEffect, useState} from 'react';
import RouteContext from './RouteContext';

/**
 * @returns {[object, function]} - An instance of the `Route` class and `(routePattern, x, y) => x | y`
 */
export default () => {
    let route = useContext(RouteContext);
    let withRoute = route.match.bind(route);
    let [path, setPath] = useState(route.href);

    useEffect(() => {
        return route.onChange(event => setPath(event.path));
    }, [route]);

    return [route, withRoute];
};
