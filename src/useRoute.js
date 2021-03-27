import {useContext, useState, useEffect, useCallback} from 'react';
import RouteContext from './RouteContext';

const EMPTY = () => undefined;

/**
 * @returns {[object, function]} - An instance of the `Route` class and `(routePattern, x, y) => x | y`
 */
export default () => {
    let route = useContext(RouteContext);
    let [path, setPath] = useState(route.href);

    useEffect(
        () => route.onChange(event => setPath(event.path)),
        [route]
    );

    let withRoute = useCallback(
        (routePattern, x = EMPTY, y = EMPTY) => route.match(routePattern, x, y),
        [route]
    );

    return [route, withRoute];
};
