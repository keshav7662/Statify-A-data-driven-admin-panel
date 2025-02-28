import React, { useEffect } from "react";
import ProfileCard from "./components/ProfileCard";
import PersonalInfo from "./components/PersonalInfo";
import Address from "./components/Address";
import { useProfile } from "../../../context/ProfileProvider";

const Settings = () => {
  const { profile } = useProfile();
  return (
    <div className="min-h-screen">
      <div>
        <ProfileCard profile={profile} />
        <PersonalInfo profile={profile} />
        <Address profile={profile} />
      </div>
    </div>
  );
};

export default Settings;
