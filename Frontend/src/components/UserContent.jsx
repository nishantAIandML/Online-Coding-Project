import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);   // store user data globally
  const [loading, setLoading] = useState(true);

  // Fetch user from backend on app load
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("${process.env.AWS_URL}/api/v1/users/me", {
          credentials: "include", // send cookies
        });
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};
