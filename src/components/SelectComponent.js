import React from 'react'

const SelectComponent = ({labelName,selectValue,onChangehandler,theClassName,isDisabled,theShowCaseValues}) => {
    return (
        <div>
            <label className="text-sm block">{labelName}</label>
            <select
                value={selectValue}
                onChange={onChangehandler}
                className={theClassName}
                disabled={isDisabled}
            >
                {theShowCaseValues.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default SelectComponent
