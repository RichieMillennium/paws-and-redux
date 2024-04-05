import * as React from 'react';
import { Classy } from '../types';

/***
 * Children of the HeaderGroup component
 * @param children - any elements
 * @param props - additional list item element props
 * @constructor
 */
export const HeaderItem: React.FunctionComponent<React.PropsWithChildren<Classy>> = ({ children, ...props }) => (
  <li {...props}>{children}</li>
);

export default HeaderItem;
