"use client"
import { signIn, signOut, useSession } from "next-auth/react";
import { FaGoogle } from "react-icons/fa6";

const ButtonAuthGoogle: React.FC = () => {

    const { status, data } = useSession()

    return (
        status === "authenticated" ? (
            <button className="" onClick={() => signOut()} type="button" >Sing Out</button>
        ) : (
            <button className="btn btn-outline" type="button" onClick={() => signIn('google')} ><FaGoogle/> Sign In With Google</button>
        )
    )
}

export default ButtonAuthGoogle;