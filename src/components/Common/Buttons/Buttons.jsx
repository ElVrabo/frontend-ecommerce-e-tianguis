import React from 'react';

export function ButtonContained(props) {
  const { 
    text, 
    backgroundColor = 'bg-primary-blue', 
    colorText = 'text-white', 
    width = 'w-full', 
    height = 'h-12',
    border = 'border-none',
    className = '',
    children,
    ...rest 
  } = props;
  
  return (
    <button
      className={`
        ${backgroundColor} ${colorText} ${width} ${height} ${border}
        rounded-lg
        px-4 py-2
        font-medium
        transition-colors
        duration-200
        ease-in-out
        hover:brightness-110
        focus:outline-none
        focus:ring-2
        focus:ring-offset-2
        focus:ring-primary-blue
        disabled:opacity-50
        disabled:cursor-not-allowed
        flex items-center justify-center
        ${className}
      `}
      {...rest}
    >
      {children || text}
    </button>
  );
}
export function ButtonOutlined(props) {
  const { 
    text, 
    backgroundColor = 'bg-transparent', 
    colorText = 'text-primary-blue', 
    width = 'w-full', 
    height = 'h-12',
    border = 'border border-primary-blue',
    className = '',
    ...rest 
  } = props;
  
  return (
    <button
      className={`
        ${backgroundColor} ${colorText} ${width} ${height} ${border}
        rounded-lg
        px-4 py-2
        font-medium
        transition-colors
        duration-200
        ease-in-out
        hover:bg-primary-blue/10
        focus:outline-none
        focus:ring-2
        focus:ring-offset-2
        focus:ring-primary-blue
        disabled:opacity-50
        disabled:cursor-not-allowed
        ${className}
      `}
      {...rest}
    >
      {text}
    </button>
  );
}