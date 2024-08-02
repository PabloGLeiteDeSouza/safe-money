"use client"
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {

  const { status } = useSession();

  const navigation = useRouter();

  if (status === "unauthenticated") {
    navigation.push('/auth/signIn');
  }


  return (
    <>
      <div
        className=""
      >
        <h1 className="text-3xl font-bold text-center">Boas Vindas ao Safe-Money</h1>
        <div className="flex justify-center w-full" >
          <div>
            
          </div>
        </div>
      </div>
    </>
  );
}
