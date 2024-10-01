import { Client, ID, Storage, Account } from 'appwrite';

import { PUBLIC_PROJECT_ID } from '$env/static/public';

const client = new Client();
client
.setEndpoint('https://cloud.appwrite.io/v1')
.setProject(PUBLIC_PROJECT_ID);

export const storage = new Storage(client);
export const account = new Account(client);
export const id = ID;