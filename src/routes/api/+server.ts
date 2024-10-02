

import { Account, Client } from "node-appwrite";
import { PUBLIC_PROJECT_ID } from "$env/static/public";

const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(PUBLIC_PROJECT_ID);

const account = new Account(client);

const user = await account.createSession('email', 'password');
