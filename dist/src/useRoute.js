import { useContext, useState, useEffect, useCallback } from 'react';
import { RouteContext } from './RouteContext';
export const useRoute = () => {
    let route = useContext(RouteContext);
    let [path, setPath] = useState(route.href);
    useEffect(() => route.onChange(event => setPath(event.path)), [route]);
    let withRoute = useCallback((routePattern, matchOutput, unmatchOutput) => {
        let matches = route.match(routePattern);
        let payload = { path: route.href, params: matches || {} };
        return matches === null ?
            (typeof unmatchOutput === 'function' ? unmatchOutput(payload) : unmatchOutput) :
            (typeof matchOutput === 'function' ? matchOutput(payload) : matchOutput);
    }, [route]);
    return [route, withRoute];
};
