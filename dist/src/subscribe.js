export const subscribe = (target, scope, type, handler) => {
    if (typeof target === 'string') {
        let extendedHandler = (event) => {
            let element = event.target instanceof Element ? event.target.closest(target) : null;
            if (element)
                handler(event, element);
        };
        scope.addEventListener(type, extendedHandler);
        return () => scope.removeEventListener(type, extendedHandler);
    }
    else if (target instanceof Element) {
        let extendedHandler = (event) => handler(event, target);
        target.addEventListener(type, extendedHandler);
        return () => target.removeEventListener(type, extendedHandler);
    }
    else if (Array.isArray(target) || target instanceof NodeList || target instanceof HTMLCollection) {
        let unsubscriptions = Array.from(target).map(item => subscribe(item, scope, type, handler));
        return () => {
            for (let unsubscribe of unsubscriptions)
                unsubscribe();
        };
    }
    return () => { };
};
