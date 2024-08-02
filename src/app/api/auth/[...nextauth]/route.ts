import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import prisma from "@/functions/connect"
import { LibSodium } from "@/classes/libsodium"
import libsodium from "libsodium-wrappers";

const handler = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
        name: 'Credentials',
        credentials: {
          login: { label: "Login", type: "text", placeholder: "jsmith" },
          password: { label: "Password", type: "password" }
        },
        async authorize(credentials, req) {
          if (credentials?.login.includes('@')) {
            const user = await prisma.user.findUnique({ where: { email: credentials.login } })
            if (user) {
              const private_key = await new LibSodium(libsodium).hex_to_uint_8_array(user.private_key),
              public_key = await new LibSodium(libsodium).hex_to_uint_8_array(user.public_key),
              decripted_password = await new LibSodium(libsodium).decrypt_with_public_and_private_keys(public_key, private_key, user.senha);
              if (decripted_password === credentials.password) {
                return { id: user.id.toString(), email: user.email, name: user.nome }
              } else {
                return null
              }
            }
          } else if (credentials?.login) {
            const usuario = await prisma.user.findUnique({ where: { usuario: credentials.login } })
            if (usuario) {
              const private_key = await new LibSodium(libsodium).hex_to_uint_8_array(usuario.private_key),
              public_key = await new LibSodium(libsodium).hex_to_uint_8_array(usuario.public_key),
              decripted_password = await new LibSodium(libsodium).decrypt_with_public_and_private_keys(public_key, private_key, usuario.senha);
              if (decripted_password === credentials.password) {
                return { id: usuario.id.toString(), email: usuario.email, name: usuario.nome }
              } else {
                return null
              }
            }
          }
          return null;
        }
    }),
    GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    })
  ],
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error',
    verifyRequest: '/auth/verify-request',
    newUser: '/auth/new-user'
  },
})

export { handler as GET, handler as POST }