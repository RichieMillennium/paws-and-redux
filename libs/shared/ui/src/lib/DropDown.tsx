import * as React from 'react';

import { Classy, Color } from '../types';
import { createColorVariants } from '../tailHelpers';

const getOptionValue = (el: React.ReactElement) =>
  el.props.value === undefined ? el.props.children : el.props.value;

export const DropDownOption: React.FunctionComponent<React.PropsWithChildren> = props => (
  <option {...props} />
);

export interface IDropDown extends Classy {
  title?: string;
  color?: Color;
  bgColor?: Color;
}

export const DropDown: React.FunctionComponent<React.PropsWithChildren<IDropDown>> = ({
  title = '',
  color,
  bgColor,
  className,
  children,
  ...props
}) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(props.value || props.defaultValue);
  const firstOptionRef = React.useRef<HTMLAnchorElement | null>(null);
  const currentValue: any = props.value || props.defaultValue;
  React.useEffect(() => {
    if (currentValue !== value) {
      setValue(currentValue);
    }
  }, [currentValue]);

  const toggleOpen = () => {
    firstOptionRef.current = null;
    setOpen(wasOpen => !wasOpen);
  };

  const handleClose = () => {
    firstOptionRef.current = null;
    setOpen(false);
    return undefined;
  };

  const handleSelect = (newValue?: string) => () => {
    firstOptionRef.current = null;
    setValue(newValue);
    setOpen(false);
    const event = new CustomEvent('DropDown change', { detail: newValue });
    props.onChange && props.onChange(event);
    return undefined;
  };

  const selectOptions = React.Children.map(
    children as React.ReactElement,
    (reactChild) =>
      getOptionValue(reactChild) === value
        ? React.cloneElement(reactChild, { 'data-selected': true })
        : React.cloneElement(reactChild, { 'data-selected': false })
  );
  const selectedOption: React.ReactElement | undefined = selectOptions
    ? selectOptions.find(
      (item: React.ReactElement) => item.props['data-selected']
    )
    : undefined;
  const selectedValue = selectedOption ? selectedOption.props.children : '';

  const textColorClass =
    selectedOption === undefined ? 'text-gray-500' : 'text-gray-800';
  const useColor: Color = color || 'primary';
  const useBgColor: Color = bgColor || 'transparent';
  const bgClass = createColorVariants({ background: true, weight: useBgColor === useColor ? 100 : 200 });
  const selectBorder = open ? 'rounded-b-none' : '';
  const labelTextColor = createColorVariants({ text: true });
  const borderColor = createColorVariants({ border: true });
  const hoverBackgroundColor = createColorVariants({ hoverBackground: true });

  return (
    <div className={`${className} rounded ${bgClass[useBgColor]} mb-4 relative`}>
      {open && (
        <button
          className="fixed inset-0 w-full h-full cursor-default"
          onClick={handleClose}
        />
      )}
      <label
        className={`pt-4 pl-3 w-full leading-tight text-xs ${labelTextColor[useColor]} mt-2 cursor-text`}
      >
        {title}
        <button
          title={value}
          className={`absolute inset-0 pl-3 pr-4 pt-5 pb-1 text-left truncate w-full font-medium text-lg ${textColorClass} bg-transparent border rounded ${selectBorder} ${borderColor[useColor]} appearance-none focus:outline-none focus:shadow-outline`}
          onClick={toggleOpen}
        >
          {selectedValue || props.placeholder}
        </button>
        <select {...props} className="invisible">
          {selectOptions}
        </select>
        {open && (
          <div
            onClick={event => event.preventDefault()}
            className={`block absolute left-0 mt-6 w-full h-32 overflow-y-scroll rounded rounded-t-none border-t-0 border ${borderColor[useColor]} bg-white`}
          >
            {!props.required && value !== undefined && (
              <a
                href="#"
                tabIndex={9998}
                className={`wms-drop-down-option block p-2 cursor-pointer text-sm ${hoverBackgroundColor[useColor]} hover:text-white italic`}
                onClick={handleSelect(undefined)}
              >
                &lt;clear value&gt;
              </a>
            )}
            {React.Children.map(children, (reactChild) => (
              <a
                ref={el => {
                  if (!firstOptionRef.current && el) {
                    firstOptionRef.current = el;
                    el.focus();
                  }
                }}
                href="#"
                tabIndex={9999}
                className={`wms-drop-down-option block p-2 cursor-pointer text-sm ${hoverBackgroundColor[useColor]} hover:text-white ${
                  getOptionValue(reactChild as React.ReactElement) === value ? 'font-bold' : ''
                }`}
                onClick={handleSelect(getOptionValue(reactChild as React.ReactElement))}
              >
                {(reactChild as React.ReactElement || undefined)?.props.children}
              </a>
            ))}
          </div>
        )}
        <div
          className={`absolute right-0 -mt-2 pointer-events-none absolute pin-y pin-r flex items-center px-2 ${labelTextColor[useColor]}`}
        >
          <svg
            className="h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path
              className="fill-current"
              d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
            />
          </svg>
        </div>
      </label>
    </div>
  );
};

export default DropDown;
