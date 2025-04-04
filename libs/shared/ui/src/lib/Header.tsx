import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Classy } from '../types';

export interface IHeader extends Classy {
  title: React.ReactNode;
}

/***
 * Tailwind Header
 * @param title - required string or element containing the application title
 * @param className - optional string
 * @param children - one or more HeaderGroup items
 * @constructor
 */
export const Header: React.FunctionComponent<React.PropsWithChildren<IHeader>> = ({
  title,
  className,
  children
}) => {
  return (
    <nav role="navigation">
      <div className="container mx-auto p-4 flex flex-wrap items-center md:flex-no-wrap">
        <div className="mr-4 md:mr-8">
          <a
            href="#"
            rel="home"
            className="text-primary-800 hover:text-primary-500"
          >
            {title}
          </a>
        </div>
        <div className="ml-auto md:hidden">
          <button
            className="flex items-center px-3 py-2 border rounded"
            type="button"
          >
            <svg
              className="h-3 w-3"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
        <div className={`${className} w-full md:w-auto md:flex-grow md:flex md:items-center`}>
          {children}
        </div>
      </div>
    </nav>
  );
};

Header.propTypes = {
  title: PropTypes.any.isRequired
};

export default Header;
