export const SuccessAlert = (props) => {
    const { text, onClose, ...rest } = props;
    return (
      <div 
        className="
          p-4 mb-4 
          border border-green-300 
          rounded-lg 
          bg-green-50 
          text-green-800
          flex items-center
          justify-between
        " 
        {...rest}
      >
        <span>{text}</span>
        {onClose && (
          <button 
            onClick={onClose}
            className="
              ml-4 
              text-green-600 
              hover:text-green-800
              focus:outline-none
            "
          >
            &times;
          </button>
        )}
      </div>
    );
  };
  
  export const ErrorAlert = (props) => {
    const { text, onClose, ...rest } = props;
    return (
      <div 
        className="
          p-4 mb-4 
          border border-red-300 
          rounded-lg 
          bg-red-50 
          text-red-800
          flex items-center
          justify-between
        " 
        {...rest}
      >
        <span>{text}</span>
        {onClose && (
          <button 
            onClick={onClose}
            className="
              ml-4 
              text-red-600 
              hover:text-red-800
              focus:outline-none
            "
          >
            &times;
          </button>
        )}
      </div>
    );
  };
  
  export const InfoAlert = (props) => {
    const { text, onClose, ...rest } = props;
    return (
      <div 
        className="
          p-4 mb-4 
          border border-blue-300 
          rounded-lg 
          bg-blue-50 
          text-blue-800
          flex items-center
          justify-between
        " 
        {...rest}
      >
        <span>{text}</span>
        {onClose && (
          <button 
            onClick={onClose}
            className="
              ml-4 
              text-blue-600 
              hover:text-blue-800
              focus:outline-none
            "
          >
            &times;
          </button>
        )}
      </div>
    );
  };