import React from 'react'

function FormInput({state, setState, label, type, isRequired}) {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700">{label}</label>
            <input
                type={type}
                onChange={(e) => setState(type === 'file' ? e.target.files : e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required={isRequired}
                {...(type === 'file' ? { multiple: true } : { value:state })}

            />
        </div>
    )
}

export default FormInput