export function FieldOutlined(props) {
    const { className = '', ...rest } = props;
    return (
        <input
            className={`
                w-full px-3 py-2
                border border-gray-300
                rounded-lg
                focus:outline-none
                focus:ring-2
                focus:ring-primary-blue
                focus:border-transparent
                transition-colors
                duration-200
                ${className}
            `}
            {...rest}
        />
    );
}

export function FieldFilled(props) {
    const { 
        width = 'w-full',
        height = 'h-12',
        label,
        className = '',
        ...rest 
    } = props;
    
    return (
        <div className={`${width} ${height} relative`}>
            <input
                className={`
                    w-full h-full px-3 py-2
                    bg-gray-100
                    border-b-2 border-gray-300
                    rounded-t-lg
                    focus:outline-none
                    focus:bg-white
                    focus:border-b-primary-blue
                    transition-colors
                    duration-200
                    peer
                    ${className}
                `}
                placeholder=" "
                {...rest}
            />
            <label className={`
                absolute left-3 top-2
                text-gray-500
                transition-all
                duration-200
                pointer-events-none
                peer-placeholder-shown:top-3
                peer-placeholder-shown:text-base
                peer-placeholder-shown:text-gray-400
                peer-focus:top-2
                peer-focus:text-sm
                peer-focus:text-primary-blue
            `}>
                {label}
            </label>
        </div>
    );
}

export function FieldStandard(props) {
    const { 
        width = 'w-full',
        height = 'h-10',
        label,
        className = '',
        ...rest 
    } = props;
    
    return (
        <div className={`${width} ${height} relative border-b border-gray-300`}>
            <input
                className={`
                    w-full h-full px-3
                    focus:outline-none
                    focus:border-b-2
                    focus:border-primary-blue
                    transition-colors
                    duration-200
                    peer
                    ${className}
                `}
                placeholder=" "
                {...rest}
            />
            <label className={`
                absolute left-3 top-1/2 -translate-y-1/2
                text-gray-500
                transition-all
                duration-200
                pointer-events-none
                peer-placeholder-shown:translate-y-0
                peer-placeholder-shown:text-base
                peer-placeholder-shown:text-gray-400
                peer-focus:-translate-y-1/2
                peer-focus:text-sm
                peer-focus:text-primary-blue
            `}>
                {label}
            </label>
        </div>
    );
}