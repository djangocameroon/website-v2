"use client";

import { registerUser, signinUser, signOutUser, verifyUserEmail } from '@/apis';
import { ILoginForm, IRegisterForm } from '@/models';
import { LoggedInUser } from '@/types';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import React, { createContext, useContext, useState } from 'react';
import { toast } from 'react-hot-toast';

interface AuthContextType {
    user: LoggedInUser | null;
    isLoading: boolean;
    signUp: (data: IRegisterForm) => Promise<Awaited<ReturnType<typeof registerUser>> | undefined>;
    verifyEmail: (data: { email: string; otp: string; }) => Promise<Awaited<ReturnType<typeof verifyUserEmail>>>;
    login: (data: ILoginForm) => Promise<Awaited<ReturnType<typeof signinUser>> | undefined>;
    logout: (silently?: boolean, sendRequest?: boolean) => Promise<void>;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    isLoading: false,
    signUp: async () => undefined,
    verifyEmail: async () => null,
    login: async () => undefined,
    logout: async () => { },
    isAuthenticated: false,
});

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

const AuthProvider = ({ children, initialUser = null }: {
    children: Readonly<React.ReactNode>;
    initialUser?: LoggedInUser | null;
}) => {
    // The session lives in an httpOnly cookie managed by /api/auth/* route
    // handlers; the server layout seeds the user here on every request.
    const [user, setUser] = useState<LoggedInUser | null>(initialUser);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const signUp = async (data: IRegisterForm) => {
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
        setUser(response.data.user);
        router.refresh();
        return response;
    }

    const logout = async (silently = false, sendRequest = true) => {
        if (sendRequest) {
            setIsLoading(true);
            try {
                const res = await signOutUser();
                if (!silently) toast.success(res?.message || "");
            } catch (err) {
                console.error('Logout error:', err);
                if (err instanceof AxiosError) {
                    const errors = err.response?.data?.errors;
                    if (!silently) toast.error(errors?.[0] || "Something went wrong while logging out.");
                }
            } finally {
                setIsLoading(false);
            }
        }

        setUser(null);
        router.refresh();
    };

    const value = {
        user,
        isLoading,
        signUp,
        verifyEmail,
        login,
        logout,
        isAuthenticated: !!user,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
