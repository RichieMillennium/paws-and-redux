import * as React from 'react';
import * as PropTypes from 'prop-types';
import { ALL_COLORS, Color, Classy } from '../types';
import { createColorVariants } from '../tailHelpers';

export interface ITextInput extends Classy {
  title?: string;
  color?: Color;
  bgColor?: Color;
}

/***
 * Tailwind Text Input
 * @param title - optional string with text contents of the label
 * @param color - optional string that matches type Color for the foreground color
 * @param bgColor - optional string that matches type Color for the background color
 * @param className - optional string
 * @param props - additional input element props (disabled, name, value, etc)
 * @constructor
 */
export const TextInput: React.FunctionComponent<ITextInput> = ({
                                                                 title = '',
                                                                 color,
                                                                 bgColor,
                                                                 className = '',
                                                                 ...props
                                                               }) => {
  const useColor: Color = color || 'primary';
  const useBgColor: Color = bgColor || 'transparent';
  const bgClass =
    useBgColor === useColor ? `bg-${useBgColor}-100` : `bg-${useBgColor}-200`;
  const textColor = createColorVariants({ text: true });
  const borderColor = createColorVariants({ border: true });

  return (
    <div className={`${className} rounded ${bgClass} mb-4 relative`}>
      <label
        className={`z-20 pt-4 pl-3 w-full leading-tight text-xs ${textColor[useColor]} mt-2 cursor-text`}
      >
        {title}
        <input
          type="text"
          {...props}
          className={`absolute left-0 w-full z-30 bg-transparent font-medium text-lg text-gray-800 border-b ${borderColor[useColor]} appearance-none h-full px-3 pt-5 pb-1 focus:outline-none focus:shadow-outline`}
        />
      </label>
    </div>
  );
};

TextInput.propTypes = {
  title: PropTypes.string,
  color: PropTypes.oneOf<Color>(ALL_COLORS),
  bgColor: PropTypes.oneOf<Color>(ALL_COLORS),
  className: PropTypes.string,
  disabled: PropTypes.bool,
  name: PropTypes.string,
  value: PropTypes.string
};

export default TextInput;
