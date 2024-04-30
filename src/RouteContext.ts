import {createContext} from 'react';
import {NavigationLocation} from 'navloc';

export const RouteContext = createContext(new NavigationLocation());
