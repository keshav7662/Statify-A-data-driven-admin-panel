import React from 'react'

const InfoBlock = ({ label, value }) => {
    return (
        <div>
            <p className="text-gray-500">{label}</p>
            <p className="text-white">{value}</p>
        </div>
    )
}

export default InfoBlock