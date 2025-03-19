import NextAuth, { type NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import bcryptjs from 'bcryptjs';
import { z } from 'zod';
import prisma from './lib/prisma';

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: '/auth/login',
    newUser: '/auth/register'
  },
  callbacks: {

    // Adding data to user profile.
    jwt({ token, user }) {
      if ( user ) {
        token.data = user;
      }
      return token;
    },

    // Adding data to user profile.
    session({ session, token }) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      session.user = token.data as any;
      return session;
    },
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);
          if ( !parsedCredentials.success ) return null;

          const {email, password} = parsedCredentials.data;

          console.log("auth.config.ts");
          console.log(email, password);

          // Search for email
          const user = await prisma.user.findUnique({ where: { email: email.toLowerCase() } });
          if ( !user ) return null;

          // Password validation
          if( !bcryptjs.compareSync( password, user.password ) ) return null;

          // Removing password from data to be returned.
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { password: _, ...rest } = user;
          console.log("User authorized: ", rest)

          return rest;
      },
    }),
  ]
}

export const { signIn, signOut, auth, handlers } = NextAuth( authConfig );