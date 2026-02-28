import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import CryptoJS from 'crypto-js';
import { SAVED_AUTH_INFO_KEY, SECRET_KEY } from "./constants";
import { AuthInfoT } from "@/types";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const encryptObject = (obj: object) => {
    const stringifiedObj = JSON.stringify(obj);
    return CryptoJS.AES.encrypt(stringifiedObj, SECRET_KEY).toString();
};

export const decryptObject = <T = object>(encryptedString: string | null): T | null => {
    try {
        if (!encryptedString)
            return null
        const bytes = CryptoJS.AES.decrypt(encryptedString, SECRET_KEY);
        const decryptedString = bytes.toString(CryptoJS.enc.Utf8);
        return JSON.parse(decryptedString) as T;
    }
    catch {
        return null;
    }
};


export const getAuthInfoFromLocalStorage = () => {
    const authInfoEncryptedString = localStorage.getItem(SAVED_AUTH_INFO_KEY);
    return decryptObject<AuthInfoT>(authInfoEncryptedString);
}

export const saveAuthInfoToLocalStorage = (authInfo: AuthInfoT) => {
    const encryptedString = encryptObject(authInfo);
    localStorage.setItem(SAVED_AUTH_INFO_KEY, encryptedString);
};

export const removeAuthInfoFromLocalStorage = () => {
    localStorage.removeItem(SAVED_AUTH_INFO_KEY);
}

export const isValidDateString = (dateString: string): boolean => {
    const date = new Date(dateString);
    return !isNaN(date.getTime());
};
