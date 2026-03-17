export type LoggedInUser = {
    email: string;
    username: string;
    profileImage: string;
    firstName: string;
    lastName: string;
}

export type TokenType = {
    accessToken: string;
    refreshToken: string;
    expiresIn: string
}

export type AuthInfoT = {
    user: LoggedInUser;
    token: TokenType
}