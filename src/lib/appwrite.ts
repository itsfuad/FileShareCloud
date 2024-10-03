import { Client, ID, Storage, Account } from 'appwrite';

import { PUBLIC_PROJECT_ID } from '$env/static/public';
import { browser } from '$app/environment';

const client = new Client();
client
.setEndpoint('https://cloud.appwrite.io/v1')
.setProject(PUBLIC_PROJECT_ID);

export const storage = new Storage(client);
export const account = new Account(client);
export const id = ID;

export async function check() {
    if (await isLoggedIn()) {
        console.log("Already logged in");
        return true;
    } else {
        console.log("Not logged in");
        return false;
    }
}

export async function isLoggedIn() {
    console.log("Checking if logged in");
    console.log(browser);
    if (browser === false) {
        return false;
    }
    try {
        const res = await account.get();
        console.log(res);
        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}

export async function isEmailVerified() {
    console.log("Checking if email verified");
    if (browser === false) {
        return false;
    }
    try {
        const user = await account.get();
        return user.emailVerification;
    } catch (e) {
        console.log(e);
        return false;
    }
}

export async function changePassword(old: string, newPass: string) {
    if (browser === false) {
        return false;
    }
    console.log("Changing password");
    try {
        await account.updatePassword(old, newPass);
        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}

export async function changeEmail(email: string, password: string) {
    if (browser === false) {
        return false;
    }
    console.log("Changing email");
    try {
        await account.updateEmail(email, password);
        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}

export async function logout() {
    if (browser === false) {
        return false;
    }
    console.log("Logging out");
    try {
        await account.deleteSession('current');
        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}