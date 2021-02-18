import {useContext, useEffect, useState, useCallback} from 'react';
import {withRoute} from 'router';
import RouteContext from './RouteContext';

/**
 * @param {function} [onRouteChange] - An optional route change handler.
 * @returns {[object, function]}
 */
export default onRouteChange => {
    let route = useContext(RouteContext);
    let [path, setPath] = useState(route.href);

    let changeCallback = useCallback(event => {
        setPath(event.path);
        if (onRouteChange) onRouteChange(event);
    }, [onRouteChange]);

    useEffect(() => route.onChange(changeCallback), [route, changeCallback]);

    return [route, withRoute(route)];
};
