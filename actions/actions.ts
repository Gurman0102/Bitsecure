"use server";

import { clerkClient } from "@clerk/nextjs/server";

interface Card {
  cardNo: string;
  expDate: string;
  cvv: string;
  cardHolder: string;
}

interface Password {
  website: string;
  username: string;
  password: string;
}
/**
 * Get a Clerk client regardless of whether clerkClient is exported
 * as a function (=> await clerkClient()) or as an object.
 */
async function getClerkClient(): Promise<any> {
  // runtime check — handle both shapes
  if (typeof clerkClient === "function") {
    // clerkClient is a function that returns a Promise<ClerkClient>
    return await (clerkClient as any)();
  }
  // clerkClient is already the client object
  return clerkClient as any;
}

export async function addCardServer(
  cardNo: string,
  expDate: string,
  cvv: string,
  cardHolder: string,
  userId: string
) {
  const client = await getClerkClient(); // client is any (safe)
  // now use client.users.* as available on Clerk client
  const user = await client.users.getUser(userId);

  console.log(user.privateMetadata);

  const existingpasswords = Array.isArray(user.privateMetadata?.cards)
    ? (user.privateMetadata.cards as Card[])
    : [];

  existingpasswords.push({ cardNo, expDate, cvv, cardHolder });

  await client.users.updateUserMetadata(userId, {
    privateMetadata: {
      cards: existingpasswords,
    },
  });

  return { success: true };
}

export async function addPasswordServer(
    website: string,
    username: string,
    password: string,
  userId: string
) {
  const client = await getClerkClient(); // client is any (safe)
  // now use client.users.* as available on Clerk client
  const user = await client.users.getUser(userId);

  console.log(user.privateMetadata);

  const existingpasswords = Array.isArray(user.privateMetadata?.passwords)
    ? (user.privateMetadata.passwords as Password[])
    : [];

  existingpasswords.push({ website,username,password });

  await client.users.updateUserMetadata(userId, {
    privateMetadata: {
      passwords: existingpasswords,
    },
  });

  return { success: true };
}

