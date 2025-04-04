import { Color } from './types';

interface IOptions {
  hoverBackground?: boolean;
  text?: boolean;
  hoverText?: boolean;
  border?: boolean;
  background?: boolean;
  tag?: boolean;
  svg?: boolean;
  weight?: number;
  hoverWeight?: number;
}

type TColorVariants = Record<Color, string>;

export const createColorVariants = (options: IOptions): TColorVariants => {
  let response = {
    white: '',
    gray: '',
    blue: '',
    teal: '',
    green: '',
    yellow: '',
    orange: '',
    red: '',
    pink: '',
    indigo: '',
    purple: '',
    primary: '',
    secondary: '',
    neutral: '',
    transparent: '',
  };

  if (options.hoverBackground) {
    return {
      white: 'hover:bg-white',
      gray: 'hover:bg-gray-500',
      blue: 'hover:bg-blue-500',
      teal: 'hover:bg-teal-500',
      green: 'hover:bg-green-500',
      yellow: 'hover:bg-yellow-500',
      orange: 'hover:bg-orange-500',
      red: 'hover:bg-red-500',
      pink: 'hover:bg-pink-500',
      indigo: 'hover:bg-indigo-500',
      purple: 'hover:bg-purple-500',
      primary: 'hover:bg-primary-500',
      secondary: 'hover:bg-secondary-500',
      neutral: 'hover:bg-neutral-500',
      transparent: 'hover:bg-transparent',
    }
  }
  if (options.hoverText) {
    return {
      white: 'hover:text-white',
      gray: 'hover:text-gray-500',
      blue: 'hover:text-blue-500',
      teal: 'hover:text-teal-500',
      green: 'hover:text-green-500',
      yellow: 'hover:text-yellow-500',
      orange: 'hover:text-orange-500',
      red: 'hover:text-red-500',
      pink: 'hover:text-pink-500',
      indigo: 'hover:text-indigo-500',
      purple: 'hover:text-purple-500',
      primary: 'hover:text-primary-500',
      secondary: 'hover:text-secondary-500',
      neutral: 'hover:text-neutral-500',
      transparent: 'hover:text-transparent',
    }
  }
  if (options.text) {
    return {
      white: 'text-white',
      gray: 'text-gray-500',
      blue: 'text-blue-500',
      teal: 'text-teal-500',
      green: 'text-green-500',
      yellow: 'text-yellow-500',
      orange: 'text-orange-500',
      red: 'text-red-500',
      pink: 'text-pink-500',
      indigo: 'text-indigo-500',
      purple: 'text-purple-500',
      primary: 'text-primary-500',
      secondary: 'text-secondary-500',
      neutral: 'text-neutral-500',
      transparent: 'text-transparent',
    }
  }
  if (options.border) {
    return {
      white: 'border-white',
      gray: 'border-gray-500',
      blue: 'border-blue-500',
      teal: 'border-teal-500',
      green: 'border-green-500',
      yellow: 'border-yellow-500',
      orange: 'border-orange-500',
      red: 'border-red-500',
      pink: 'border-pink-500',
      indigo: 'border-indigo-500',
      purple: 'border-purple-500',
      primary: 'border-primary-500',
      secondary: 'border-secondary-500',
      neutral: 'border-neutral-500',
      transparent: 'border-transparent',
    }
  }
  if (options.tag) {
    return {
      white: 'text-gray-700 border-white hover:border-gray-700',
      gray: 'text-gray-700 border-gray-200 hover:border-gray-700',
      blue: 'text-blue-700 border-blue-200 hover:border-blue-700',
      teal: 'text-teal-700 border-teal-200 hover:border-teal-700',
      green: 'text-green-700 border-green-200 hover:border-green-700',
      yellow: 'text-yellow-700 border-yellow-200 hover:border-yellow-700',
      orange: 'text-orange-700 border-orange-200 hover:border-orange-700',
      red: 'text-red-700 border-red-200 hover:border-red-700',
      pink: 'text-pink-700 border-pink-200 hover:border-pink-700',
      indigo: 'text-indigo-700 border-indigo-200 hover:border-indigo-700',
      purple: 'text-purple-700 border-purple-200 hover:border-purple-700',
      primary: 'text-primary-700 border-primary-200 hover:border-primary-700',
      secondary: 'text-secondary-700 border-secondary-200 hover:border-secondary-700',
      neutral: 'text-neutral-700 border-neutral-200 hover:border-neutral-700',
      transparent: 'border-transparent',
    }
  }
  if (options.svg) {
    return {
      white: 'stroke-current hover:stroke-gray-200 hover:fill-gray-200',
      gray: 'stroke-current hover:stroke-gray-200 hover:fill-gray-200',
      blue: 'stroke-current hover:stroke-blue-200 hover:fill-blue-200',
      teal: 'stroke-current hover:stroke-teal-200 hover:fill-teal-200',
      green: 'stroke-current hover:stroke-green-200 hover:fill-green-200',
      yellow: 'stroke-current hover:stroke-yellow-200 hover:fill-yellow-200',
      orange: 'stroke-current hover:stroke-orange-200 hover:fill-orange-200',
      red: 'stroke-current hover:stroke-red-200 hover:fill-red-200',
      pink: 'stroke-current hover:stroke-pink-200 hover:fill-pink-200',
      indigo: 'stroke-current hover:stroke-indigo-200 hover:fill-indigo-200',
      purple: 'stroke-current hover:stroke-purple-200 hover:fill-purple-200',
      primary: 'stroke-current hover:stroke-primary-200 hover:fill-primary-200',
      secondary: 'stroke-current hover:stroke-secondary-200 hover:fill-secondary-200',
      neutral: 'stroke-current hover:stroke-neutral-200 hover:fill-neutral-200',
      transparent: 'stroke-current',
    }
  }
  if (options.background && options.weight === 100) {
    response = {
      white: 'bg-white',
      gray: 'bg-gray-100',
      blue: 'bg-blue-100',
      teal: 'bg-teal-100',
      green: 'bg-green-100',
      yellow: 'bg-yellow-100',
      orange: 'bg-orange-100',
      red: 'bg-red-100',
      pink: 'bg-pink-100',
      indigo: 'bg-indigo-100',
      purple: 'bg-purple-100',
      primary: 'bg-primary-100',
      secondary: 'bg-secondary-100',
      neutral: 'bg-neutral-100',
      transparent: 'bg-transparent',
    }
  }
  if (options.background && options.weight === 200) {
    response = {
      white: 'bg-white',
      gray: 'bg-gray-200',
      blue: 'bg-blue-200',
      teal: 'bg-teal-200',
      green: 'bg-green-200',
      yellow: 'bg-yellow-200',
      orange: 'bg-orange-200',
      red: 'bg-red-200',
      pink: 'bg-pink-200',
      indigo: 'bg-indigo-200',
      purple: 'bg-purple-200',
      primary: 'bg-primary-200',
      secondary: 'bg-secondary-200',
      neutral: 'bg-neutral-200',
      transparent: 'bg-transparent',
    }
  }
  if (options.background && options.weight === 300) {
    response = {
      white: 'bg-white',
      gray: 'bg-gray-300',
      blue: 'bg-blue-300',
      teal: 'bg-teal-300',
      green: 'bg-green-300',
      yellow: 'bg-yellow-300',
      orange: 'bg-orange-300',
      red: 'bg-red-300',
      pink: 'bg-pink-300',
      indigo: 'bg-indigo-300',
      purple: 'bg-purple-300',
      primary: 'bg-primary-300',
      secondary: 'bg-secondary-300',
      neutral: 'bg-neutral-300',
      transparent: 'bg-transparent',
    }
  }
  if (options.background && options.weight === 500) {
    response = {
      white: 'bg-white',
      gray: 'bg-gray-500',
      blue: 'bg-blue-500',
      teal: 'bg-teal-500',
      green: 'bg-green-500',
      yellow: 'bg-yellow-500',
      orange: 'bg-orange-500',
      red: 'bg-red-500',
      pink: 'bg-pink-500',
      indigo: 'bg-indigo-500',
      purple: 'bg-purple-500',
      primary: 'bg-primary-500',
      secondary: 'bg-secondary-500',
      neutral: 'bg-neutral-500',
      transparent: 'bg-transparent',
    }
  }
  if (options.background && options.weight === 800) {
    response = {
      white: 'bg-white',
      gray: 'bg-gray-800',
      blue: 'bg-blue-800',
      teal: 'bg-teal-800',
      green: 'bg-green-800',
      yellow: 'bg-yellow-800',
      orange: 'bg-orange-800',
      red: 'bg-red-800',
      pink: 'bg-pink-800',
      indigo: 'bg-indigo-800',
      purple: 'bg-purple-800',
      primary: 'bg-primary-800',
      secondary: 'bg-secondary-800',
      neutral: 'bg-neutral-800',
      transparent: 'bg-transparent',
    }
  }
  if (options.background && options.hoverWeight === 100) {
    return {
      white: response.white,
      gray: `${response.gray} hover:bg-gray-100`,
      blue: `${response.blue} hover:bg-blue-100`,
      teal: `${response.teal} hover:bg-teal-100`,
      green: `${response.green} hover:bg-green-100`,
      yellow: `${response.yellow} hover:bg-yellow-100`,
      orange: `${response.orange} hover:bg-orange-100`,
      red: `${response.red} hover:bg-red-100`,
      pink: `${response.pink} hover:bg-pink-100`,
      indigo: `${response.indigo} hover:bg-indigo-100`,
      purple: `${response.purple} hover:bg-purple-100`,
      primary: `${response.primary} hover:bg-primary-100`,
      secondary: `${response.secondary} hover:bg-secondary-100`,
      neutral: `${response.neutral} hover:bg-neutral-100`,
      transparent: response.transparent,
    }
  }
  if (options.background && options.hoverWeight === 800) {
    return {
      white: response.white,
      gray: `${response.gray} hover:bg-gray-800`,
      blue: `${response.blue} hover:bg-blue-800`,
      teal: `${response.teal} hover:bg-teal-800`,
      green: `${response.green} hover:bg-green-800`,
      yellow: `${response.yellow} hover:bg-yellow-800`,
      orange: `${response.orange} hover:bg-orange-800`,
      red: `${response.red} hover:bg-red-800`,
      pink: `${response.pink} hover:bg-pink-800`,
      indigo: `${response.indigo} hover:bg-indigo-800`,
      purple: `${response.purple} hover:bg-purple-800`,
      primary: `${response.primary} hover:bg-primary-800`,
      secondary: `${response.secondary} hover:bg-secondary-800`,
      neutral: `${response.neutral} hover:bg-neutral-800`,
      transparent: response.transparent,
    }
  }
  return response;
};
