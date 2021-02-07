import {useEffect, useState, useCallback} from 'react';
import {route} from 'router';

/**
 * @param {function} [onRouteChange] - An optional route change handler.
 * @returns {[string, function]}
 */
export default onRouteChange => {
    let [path, setPath] = useState(route.href);

    let changeCallback = useCallback(event => {
        setPath(event.path);
        if (onRouteChange) onRouteChange(event);
    }, [onRouteChange]);

    useEffect(() => route.onChange(changeCallback), [changeCallback]);

    return [
        path,
        (path, replace = false) => replace ? route.replace(path) : route.assign(path),
    ];
};
