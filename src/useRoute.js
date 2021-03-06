import {useContext, useEffect, useState} from 'react';
import {withRoute} from '@axtk/router';
import RouteContext from './RouteContext';

/**
 * @returns {[object, function]} - An instance of the `Route` class and `(routePattern, x, y) => x | y`
 */
export default () => {
    let route = useContext(RouteContext);
    let [path, setPath] = useState(route.href);

    useEffect(() => {
        return route.onChange(event => setPath(event.path));
    }, [route]);

    return [route, withRoute(route)];
};
