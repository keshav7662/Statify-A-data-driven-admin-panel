import React, { createContext, useContext, useState, useEffect } from "react";
import { fetchLoggedInUserData } from "../services/adminService";

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  ('context page', profile)
  
  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const data = await fetchLoggedInUserData();
        setProfile(data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    getUserProfile();
  }, []);

  return (
    <ProfileContext.Provider value={{ profile, setProfile, loading }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);
