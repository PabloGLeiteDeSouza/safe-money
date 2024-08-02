import prisma from "@/functions/connect";
import { NextRequest, NextResponse } from "next/server";
import { UserCreateData } from "./types";
import { LibSodium } from "@/classes/libsodium";
import libsodium from "libsodium-wrappers";

async function handler(req: NextRequest) {
  switch (req.method) {
    case "POST":
      try {
        const data: UserCreateData = await req.json(),
          { privateKey, publicKey } = await new LibSodium(libsodium).generate_key_pair(),
          public_key = await new LibSodium(libsodium).uint_8_array_to_hex(publicKey),
          private_key = await new LibSodium(libsodium).uint_8_array_to_hex(privateKey),
          pass = await new LibSodium(libsodium).encrypt_with_public_and_private_keys(
            publicKey,
            privateKey,
            data.senha
          ),
          result = await prisma.user.create({
            data: {
              ...data,
              senha: pass,
              data_de_nascimento: new Date(data.data_de_nascimento),
              private_key,
              public_key,
            },
          });
        return new NextResponse(JSON.stringify(result), { status: 201 });
      } catch (error) {
        console.error((error as Error).message);
        return new NextResponse(
          JSON.stringify({
            error: true,
            message:
              "Internal Server Error. Caused By: " + (error as Error).message,
          }),
          {
            status: 500,
          }
        );
      }

    default:
      return new NextResponse(
        JSON.stringify({
          error: true,
          message: "Invalid request method",
        }),
        { status: 400 }
      );
  }
}

export { handler as POST, handler as GET, handler as PUT, handler as DELETE };
