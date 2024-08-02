"use client";
import ButtonAuthGoogle from "@/components/Buttons/Auth/Google";
import { Formik } from "formik";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const SignInPage: React.FC = () => {
    
    const { status } = useSession();

    const navigation = useRouter();
  
    if (status === "authenticated") {
      navigation.push('/');
    }

  return (
    <div className="w-full h-screen flex justify-center items-center flex-col gap-5">
      <div>
        <Image alt="" src="" />
      </div>
      <div
        className="p-5 bg-base-200 rounded-md flex flex-col gap-5"
      >
        <div
            className="flex flex-col items-center"
        >
            <h2 className="text-xl" >Acesse sua conta</h2>
        </div>
        <div className="flex w-full flex-col border-opacity-50">
            <div className="flex flex-col items-center">
                <ButtonAuthGoogle/>
            </div>
            <div className="divider">ou</div>
            <div className="">
                <Formik initialValues={{ login: '', password: '' }} 
                onSubmit={(values) => {
                    signIn('credentials', {...values});
                }}>
                    {({ values, handleSubmit, handleChange }) => {
                        return (
                        <form onSubmit={handleSubmit} method="POST">
                            <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Login</span>
                            </div>
                            <label className="input input-bordered flex items-center gap-2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 16 16"
                                    fill="currentColor"
                                    className="h-4 w-4 opacity-70">
                                    <path
                                    d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                                </svg>
                                <input
                                    value={values.login}
                                    onChange={handleChange('login')}
                                    type="text"
                                    placeholder="Login"
                                    className="grow"
                                />
                            </label>
                            <div className="label">
                                <span className="label-text-alt">Bottom Left label</span>
                                <span className="label-text-alt">Bottom Right label</span>
                            </div>
                            </label>
                            <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Senha</span>
                            </div>
                            <label className="input input-bordered flex items-center gap-2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 16 16"
                                    fill="currentColor"
                                    className="h-4 w-4 opacity-70">
                                    <path
                                    fillRule="evenodd"
                                    d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                                    clipRule="evenodd" />
                                </svg>
                                <input
                                    onChange={handleChange('password')}
                                    value={values.password}
                                    type="password"
                                    placeholder="Password"
                                    className="grow"
                                />
                            </label>
                            <div className="label">
                                <span className="label-text-alt">Bottom Left label</span>
                                <span className="label-text-alt">Bottom Right label</span>
                            </div>
                            </label>
                            <div className="flex flex-row-reverse" >
                                <Link className="" href="/auth/signUp" >Cadastre-se aqui!</Link>
                            </div>
                            <div className="w-full flex justify-center mt-5" >
                                <button 
                                    className="btn btn-primary w-full"
                                    type="submit"
                                >
                                    Sign-In
                                </button>
                            </div>
                        </form>
                        );
                    }}
                </Formik>
            </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
