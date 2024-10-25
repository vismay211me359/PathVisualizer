import React from 'react'

const ButtonComponent = ({theButtonClass,isDisabled,theOnClickHandler,theContent,theTitle}) => {
    return (
        <div>
            <button className={theButtonClass} disabled={isDisabled} onClick={theOnClickHandler} title={theTitle ? theTitle : ""}>
                {theContent}
            </button>
        </div>
    )
}

export default ButtonComponent;
