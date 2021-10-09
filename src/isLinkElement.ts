export const isLinkElement = (x: any): x is HTMLAnchorElement | HTMLAreaElement => (
    x instanceof HTMLAnchorElement || x instanceof HTMLAreaElement
);
