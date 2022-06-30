export function isLinkElement(x: unknown): x is HTMLAnchorElement | HTMLAreaElement {
    return x instanceof HTMLAnchorElement || x instanceof HTMLAreaElement;
}
