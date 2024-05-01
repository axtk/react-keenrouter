import {createElement} from 'react';
import {useLinkClick} from './useLinkClick';
import type {AProps} from './AProps';

export const A = (props: AProps) => {
    let handleClick = useLinkClick(props);

    return createElement('a', {...props, onClick: handleClick});
};
