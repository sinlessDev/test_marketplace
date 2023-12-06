import { Client, Account } from "appwrite";
const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("657032e255d6b22b27d8");

export const account = new Account(client);

export default client;
