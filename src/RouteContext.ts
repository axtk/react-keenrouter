import {createContext} from 'react';
import {Location} from 'histloc';

export const RouteContext = createContext(new Location());
