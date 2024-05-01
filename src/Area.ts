import {createElement} from 'react';
import {useLinkClick} from './useLinkClick';
import type {AreaProps} from './AreaProps';

export const Area = (props: AreaProps) => {
    let handleClick = useLinkClick(props);

    return createElement('area', {...props, onClick: handleClick});
};
