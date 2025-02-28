import React from "react";

const ProfileCard = ({ profile }) => {
    if (!profile) {
        return <p className="text-white">Loading profile...</p>;
    }
    return (
        <div className="my-5 border border-gray-700 rounded-xl flex justify-between items-center p-4 shadow-lg">
            <div className="flex gap-6 items-center">
                <div className="flex flex-col items-center">
                    <div className="w-20 h-20 rounded-full overflow-hidden">
                        <img
                            src={profile?.userProfileImage}
                            alt="Profile"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* <TbCircleLetterK size={60} className="text-green-400" /> */}
                    {/* Change Avatar Button */}
                    <button className="mt-2 text-sm text-gay-400 border border-gray-600 px-3 py-1 rounded-md hover:bg-gray-500 hover:text-white transition">
                        Change Avatar
                    </button>
                </div>

                <div className="space-y-2">
                    <h2 className="font-bold text-2xl text-white">{profile.userName}</h2>
                    <span className="bg-green-500 text-white text-sm px-3 py-1 rounded-full  inline-block  mt-2">
                        {profile.role}
                    </span>
                    <p className="text-gray-400">{profile.country}</p>
                </div>
            </div>
        </div>
    );
};

export default ProfileCard;
