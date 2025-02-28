import React from 'react'
import InfoBlock from './InfoBlock'

const Address = ({ profile }) => {
    if (!profile) {
        return <p className="text-white">Loading profile...</p>;
    }
    return (
        <div className="my-5 border border-gray-700 rounded-xl p-4  shadow-lg">
            <div className="flex justify-between items-center w-full ">
                <h2 className="text-xl font-semibold text-white">Address</h2>

            </div>

            <div className="grid grid-cols-2 gap-x-8 gap-y-4 mt-1">
                <InfoBlock label="Continent" value={profile.continent || '--'} />
                <InfoBlock label="Country" value={profile.country || '--'} />
                <InfoBlock label="Postal Code" value={profile.pincode || '--'} />
                <InfoBlock label="City" value={profile.city || '--'} />
            </div>
        </div>
    )
}

export default Address