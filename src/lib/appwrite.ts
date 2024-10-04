import { Client, ID, Storage, Account, OAuthProvider } from 'appwrite';

import { PUBLIC_PROJECT_ID } from '$env/static/public';


export const client = new Client();
client
    .setEndpoint('https://api.filebasket.brainbird.org/v1')
    .setProject(PUBLIC_PROJECT_ID);

export const storage = new Storage(client);
export const account = new Account(client);
export const id = ID;

export async function isLoggedIn(sessionId: string) {
    console.log("Checking if logged in");
    try {
        const res = await account.getSession(sessionId);
        console.log(res);
        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}

export async function logout(sessionId: string) {
    console.log("Logging out");
    try {
        await account.deleteSession(sessionId);
        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}

export type Provider = 'google' | 'github' | 'discord';

const isOAuthProvider = (provider: string): provider is OAuthProvider => {
    return Object.values(OAuthProvider).includes(provider as OAuthProvider);
};

export async function login(provider: Provider) {
    console.log("Logging in");
    try {
        if (provider && isOAuthProvider(provider)) {
            account.createOAuth2Token(provider,
                window.location.origin + '/auth/callback',
                window.location.origin + '/auth/callback',
            );
            return true;
        }
    } catch (e) {
        console.log(e);
        return false;
    }
}