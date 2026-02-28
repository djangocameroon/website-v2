"use client";

import { registerUser, signinUser, signOutUser, verifyUserEmail } from '@/apis';
import { ILoginForm, IRegisterForm } from '@/models';
import { AuthInfoT } from '@/types';
import { getAuthInfoFromLocalStorage, isValidDateString, removeAuthInfoFromLocalStorage, saveAuthInfoToLocalStorage } from '@/utils';
import { AxiosError } from 'axios';
import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { toast } from 'react-hot-toast';

interface AuthContextType {
    token: AuthInfoT['token'] | null;
    user: AuthInfoT['user'] | null;
    isLoading: boolean;
    signUp: (data: IRegisterForm) => Promise<Awaited<ReturnType<typeof registerUser>> | undefined>;
    verifyEmail: (data: { email: string; otp: string; }) => Promise<Awaited<ReturnType<typeof verifyUserEmail>>>;
    login: (data: ILoginForm) => Promise<Awaited<ReturnType<typeof signinUser>> | undefined>;
    logout: (silently?: boolean) => Promise<void>;
    saveAuthInfo: (user: AuthInfoT['user'], token: AuthInfoT['token']) => void
    isAuthenticated: boolean;
}


const AuthContext = createContext<AuthContextType>({
    token: null,
    user: null,
    isLoading: true,
    signUp: async () => undefined,
    verifyEmail: async () => null,
    login: async () => undefined,
    logout: async () => { },
    saveAuthInfo: () => { },
    isAuthenticated: false,
});

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

const AuthProvider = ({ children }: { children: Readonly<React.ReactNode> }) => {
    const [token, setToken] = useState<AuthInfoT['token'] | null>(null);
    const [user, setUser] = useState<AuthInfoT['user'] | null>(null);
    const [isLoading, setIsLoading] = useState(true);


    const saveAuthInfo = useCallback((user: AuthInfoT['user'], token: AuthInfoT['token']) => {
        setUser(user);
        setToken(token);
        saveAuthInfoToLocalStorage({ user, token });
    }, [])

    const isTokenValid = useCallback((_token: AuthInfoT['token'] | null) => {
        if (!_token) return false;
        if (!isValidDateString(_token.expiresIn)) return false;
        const expiresAt = new Date(_token.expiresIn);
        const now = Date.now();

        return expiresAt.getTime() > now;
    }, []);

    // Initial token check on app load
    useEffect(() => {
        (async () => {
            const savedAuthInfo = getAuthInfoFromLocalStorage();
            setIsLoading(true);

            if (savedAuthInfo) {
                const { user: savedUser, token: savedToken } = savedAuthInfo;
                if (!isTokenValid(savedToken)) {
                    await logout(true);
                    return;
                }
                setToken(savedToken);
                setUser(savedUser);
            }
            setIsLoading(false);
        })();
    }, [isTokenValid]);

    // Auto-logout before token expires
    useEffect(() => {
        if (!token) return;

        const expiresAt = new Date(token.expiresIn);
        const now = Date.now();

        // Refresh 3 minutes before expiration
        const logoutTime = expiresAt.getTime() - now - (3 * 60 * 1000);

        if (logoutTime > 0) {
            const timeoutId = setTimeout(() => {
                console.log(`Logging out in ${logoutTime / 1000} seconds...`);
                logout(true);
            }, logoutTime);

            return () => clearTimeout(timeoutId);
        }
    }, [token]);

    const signUp = async (data: IRegisterForm) => {
        // }
        try {
            const response = await registerUser(data);
            toast.success(response.message);
            return response;
        } catch (err) {
            if (err instanceof AxiosError) {
                const { data: { errors } } = err.response!
                toast.error(errors[0] || "Registration failed");
                return;
            }
            toast.error("Registration failed")
        }
    }

    const verifyEmail = async (data: {
        email: string;
        otp: string;
    }) => {
        return await verifyUserEmail(data);
    }

    const login = async (data: ILoginForm) => {
        const response = await signinUser(data);
        if (!(response && response.status)) throw new Error("Login failed");

        toast.success(response.message);
        const { user, ...token } = response.data;
        const _user = {
            email: user.email,
            username: user.username,
            profileImage: user.profile_image,
            firstName: user.first_name,
            lastName: user.last_name,
        } satisfies AuthInfoT['user'];
        const _token = {
            accessToken: token.access_token,
            refreshToken: token.refresh_token,
            expiresIn: token.expires_in,
        } satisfies AuthInfoT['token'];
        saveAuthInfo(_user, _token);
        return response;
        // try {
        // } catch (err) {
        //     console.error(err);
        //     if (err instanceof AxiosError) {
        //         const errors = err.response?.data?.errors;
        //         toast.error(errors?.[0] || "Login failed");
        //         return;
        //     }
        //     toast.error("Login failed");
        // }
    }

    const logout = async (silently = false) => {
        setIsLoading(true);
        try {
            const res = await signOutUser();
            if (!silently) toast.success(res?.message || "");
            removeAuthInfoFromLocalStorage();
            setToken(null);
            setUser(null);
        } catch (err) {
            console.error('Logout error:', err);
            if (err instanceof AxiosError) {
                const errors = err.response?.data?.errors;
                if (!silently) toast.error(errors?.[0] || "Something went wrong while logging out.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    const value = {
        token,
        user,
        isLoading,
        signUp,
        verifyEmail,
        login,
        logout,
        saveAuthInfo,
        isAuthenticated: !!token && !!user && isTokenValid(token),
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;