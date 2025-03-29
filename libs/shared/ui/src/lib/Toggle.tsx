import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Classy,  Color, ALL_COLORS } from '../types';
import { createColorVariants } from '../tailHelpers';

interface IToggle extends Classy {
  onClick: () => void;
  active: boolean;
  color?: Color;
  slim?: boolean;
  transparent?: boolean;
}

/**
 * Tailwind toggle button
 * @param active - required boolean that indicates whether the toggle is in active state
 * @param onClick - required handler function for the toggle click event
 * @param color - optional string that matches type Color
 * @param slim - optional boolean that uses slimmer styles if true
 * @param transparent - optional boolean that uses a transparent background if true
 * @param className - optional string
 * @param props - additional button element props (disabled, name, onClick, etc)
 * @constructor
 */
export const Toggle: React.FunctionComponent<IToggle> = ({
  active,
  onClick,
  color,
  slim = false,
  transparent = false,
  className,
  ...props
}) => {
  const useColor: Color = color || 'primary';
  const textColors = createColorVariants({ text: !className?.match(/text-[a-z]+-[0-9]+/) });
  const colorClasses = `${textColors[useColor]}`;
  const bgClasses = transparent ? ' bg-transparent' : ' bg-contrast';
  const needsHeight = !className?.match(/(^|\W)h-[0-9a0z]+/);
  const sizeClasses = slim
    ? `py-0 font-medium ${needsHeight ? 'h-full' : ''}`
    : `py-2 font-semibold ${needsHeight ? 'h-auto' : ''}`;
  const lineClass = active ? 'underline' : '';
  return (
    <button
      onClick={onClick}
      {...props}
      className={`${className} ${colorClasses} ${bgClasses} ${lineClass} text-lg font-thin leading-relaxed ${sizeClasses} px-4 mr-2 focus:outline-none`}
    />
  );
};

Toggle.propTypes = {
  color: PropTypes.oneOf<Color>(ALL_COLORS),
  slim: PropTypes.bool,
  transparent: PropTypes.bool,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  name: PropTypes.string,
  active: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
};

export default Toggle;
