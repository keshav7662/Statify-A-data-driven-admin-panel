import React from "react";
import InfoBlock from "./InfoBlock";

const PersonalInfo = ({profile}) => {
    
    if (!profile) {
        return <p className="text-white">Loading profile...</p>;
    }

    return (
        <div className="my-5 border border-gray-700 rounded-xl p-4  shadow-lg">
            <div className="flex justify-between items-center w-full ">
                <h2 className="text-xl font-semibold text-white">Personal Information</h2>
            </div>

            <div className="grid grid-cols-2 gap-x-8 gap-y-4 mt-2">
                <InfoBlock label="Username" value={profile.userName || "--"} />
                <InfoBlock label="Email Address" value={profile.email || "--"} />
                <InfoBlock label="Phone" value={profile.phone || "--"} />
                <InfoBlock label="Role" value={profile.role || "--"} />
                <InfoBlock label="Last Login" value={profile.lastLogin || "--"} />
                <InfoBlock label="Account Created On" value={profile.createdAt || "--"} />
                <InfoBlock label="Status" value={profile.status || "--"} />
                <InfoBlock label="Password" value="*********" />
            </div>
        </div>
    );
};

export default PersonalInfo;
