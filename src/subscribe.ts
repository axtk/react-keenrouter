type SubscribeParams = {
    target: string | Node | Array<string | Node> | HTMLCollection | NodeList;
    scope?: Node;
    type?: string;
    handler: (event: Event, element?: Element) => void;
};

export function subscribe({
    target,
    scope = document,
    type = 'click',
    handler,
}: SubscribeParams) {
    if (typeof target === 'string') {
        let extendedHandler = (event: Event) => {
            let element = event.target instanceof Element ? event.target.closest(target) : null;
            if (element) handler(event, element);
        };
        scope.addEventListener(type, extendedHandler);
        return () => scope.removeEventListener(type, extendedHandler);
    }
    else if (target instanceof Element) {
        let extendedHandler = (event: Event) => {
            if (scope.contains(target)) handler(event, target);
        };
        target.addEventListener(type, extendedHandler);
        return () => target.removeEventListener(type, extendedHandler);
    }
    else if (Array.isArray(target) || target instanceof NodeList || target instanceof HTMLCollection) {
        let unsubscriptions = Array.from(target)
            .map(item => subscribe({target: item, scope, type, handler}));
        return () => {
            for (let unsubscribe of unsubscriptions)
                unsubscribe();
        };
    }
    return () => {};
}
