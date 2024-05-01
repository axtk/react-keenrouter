import type {LinkExtraProps} from './LinkExtraProps';
import type {NavigationMode} from './NavigationMode';

export function getNavigationMode(attrs: LinkExtraProps | DOMStringMap): NavigationMode {
    if (attrs instanceof DOMStringMap)
        return attrs.navigationMode as NavigationMode;

    return attrs['data-navigation-mode'];
}
