// import  { createContext, useState, useEffect, type ReactNode } from "react";

// interface User {
//   id: string;
//   email: string;
// }

// interface AuthContextType {
//   isLoggedIn: boolean;
//   user: User | null;
//   login: (token: string, user: User) => void;
//   logout: () => void;
// }

// export const AuthContext = createContext<AuthContextType>({
//   isLoggedIn: false,
//   user: null,
//   login: () => {},
//   logout: () => {},
// });

// export const AuthProvider = ({ children }: { children: ReactNode }) => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [user, setUser] = useState<User | null>(null);

//   useEffect(() => {
//     const token = localStorage.getItem("clinic_portal_token");
//     const savedUser = localStorage.getItem("clinic_portal_user");

//     if (token && savedUser) {
//       setIsLoggedIn(true);
//       setUser(JSON.parse(savedUser));
//     }
//   }, []);

//   const login = (token: string, user: User) => {
//     localStorage.setItem("clinic_portal_token", token);
//     localStorage.setItem("clinic_portal_user", JSON.stringify(user));
//     setIsLoggedIn(true);
//     setUser(user);
//   };

//   const logout = () => {
//     localStorage.removeItem("clinic_portal_token");
//     localStorage.removeItem("clinic_portal_user");
//     setIsLoggedIn(false);
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
import {
  createContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  isLoggedIn: boolean;
  user: User | null;
  logout: () => void;
  login: (token: string) => void;
}

export const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  user: null,
  logout: () => {},
    login: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = Cookies.get("patientToken");

    if (token) {
      try {
        const decoded: any = jwtDecode(token);

        setUser({
          id: decoded.id,
          name: decoded.name,
          email: decoded.email,
        });

        setIsLoggedIn(true);
        setUser(user)
      } catch (error) {
        console.error("Invalid Token:", error);
        Cookies.remove("patientToken");
      }
    }
  }, []);




  const login = (token: string) => {
  const decoded: any = jwtDecode(token);

  setUser({
    id: decoded.id,
    name: decoded.name,
    email: decoded.email,
  });

  setIsLoggedIn(true);
  Cookies.set("patientToken", token, { expires: 7 });
};


  const logout = () => {
    Cookies.remove("patientToken");
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn,login, user, logout}}>
      {children}
    </AuthContext.Provider>
  );
};
