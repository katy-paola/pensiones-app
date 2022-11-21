import { PrismaAdapter } from '@next-auth/prisma-adapter';
import NextAuth from 'next-auth/next';
import GoogleProvider from 'next-auth/providers/google';
import prisma from '../../../library/prismadb';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Username',
          type: 'email',
          placeholder: 'katy.barboza@gmail.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (user) {
          const isPasswordCorrect = credentials.password === user.password;
          if (isPasswordCorrect) {
            return user;
          }
        }
        return null;
      },
    }),
  ],
  callbacks: {
    session: async ({ session, token }) => {
      if (session?.user) {
        session.user.id = token.uid;
      }
      return session;
    },
    authorized({ req, token }) {
      if (token) return true; // If there is a token, the user is authenticated
    },
    jwt: async ({ user, token }) => {
      if (user) {
        token.uid = user.id;
      }
      return token;
    },
  },
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
    error: '/api/auth/error',
  },
  secret: process.env.AUTH_SECRET,
};

export default NextAuth(authOptions);
