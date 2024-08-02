"use client";

import { Formik } from "formik";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { FaEye, FaEyeSlash, FaKey, FaUser } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import * as Yup from "yup";

const SignUpSchema = Yup.object().shape({
  nome: Yup.string().required("O campo não pode ser vázio!"),
  usuario: Yup.string().required("O campo não pode ser vázio!"),
  data_de_nascimento: Yup.date()
  .max(new Date(), 'Não é possível incluir uma data futura')
  .test('age', 'Você deve ter pelo menos 18 anos', value => {
    const eighteenYearsAgo = new Date();
    eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);
    return new Date(value as Date) <= eighteenYearsAgo;
  })
  .required("O campo não pode ser vázio!"),
  email: Yup.string()
    .default("O campo não pode ser vázio!")
    .email("O email deve ser válido"),
  confirmarEmail: Yup.string()
    .default("O campo não pode ser vázio!")
    .email("O email é inválido")
    .oneOf([Yup.ref<string>("email"),], "Os emails estão divergentes!"),
  senha: Yup.string()
    .default("O campo não pode ser vázio!")
    .min(8, "A senha deve ter no mínimo 8 caracteres")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      "A senha deve conter letras maiúsculas, minúsculas, números e caracteres especiais"
    ),
  confirmarSenha: Yup.string()
    .default("O campo não pode ser vázio!")
    .oneOf([Yup.ref("senha")], "As senhas estão divergentes!")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      "A senha deve conter letras maiúsculas, minúsculas, números e caracteres especiais"
    ),
});

const SignUpPage: React.FC = (props: any) => {

  const { status } = useSession();

  const navigation = useRouter();

  if (status === "authenticated") {
    navigation.push('/');
  }

  const [passwordsVisibility, setPasswordsVisibility] = React.useState({
    password: false,
    confirm_password: false,
  });
  
  const router = useRouter();


  return (
    <div className="flex justify-center w-full min-h-screen items-center">
      <div>
        <Image src="" alt="" />
      </div>
      <div className="bg-base-200 flex flex-col items-center justify-center gap-5 p-5 rounded-md">
        <div className="flex justify-center">
          <h2 className="text-xl">Cadastre-se Abaixo:</h2>
        </div>
        <Formik
          validationSchema={SignUpSchema}
          initialValues={{
            nome: "",
            usuario: "",
            data_de_nascimento: new Date().toDateString(),
            email: "",
            confirmarEmail: "",
            senha: "",
            confirmarSenha: "",
            termos_de_uso: false,
          }}
          onSubmit={async (values) => {
            try {
              const { termos_de_uso, confirmarEmail, confirmarSenha, ...data } = values;
              if (!termos_de_uso) {
                  alert("Você precisa aceitar os termos de uso!");
                  return;
              }
              console.log(data);
              const rsp = await fetch('http://localhost:3000/api/users/create', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
              });
              const resp = await rsp.json();
              if (resp.error) {
                alert("Erro não foi possível criar o usuário")
                alert(resp.message);
                return;
              }
              alert("Usuário criado com sucesso!");
              router.push('/auth/signIn');
            } catch (error) {
              console.error(error);
              alert((error as Error).message)
            }
            
            
          }}
        >
          {({ handleSubmit, values, errors, handleChange, setFieldValue }) => {
            return (
              <form
                className="flex justify-center flex-col items-center"
                onSubmit={handleSubmit}
              >
                <div className="flex flex-row gap-5 w-full">
                  <label className="form-control w-full max-w-xs">
                    <div className="label">
                      <span className="label-text">Nome completo</span>
                    </div>
                    <label
                      className={`input input-bordered ${
                        errors.nome ? "input-error" : ""
                      } flex items-center gap-2`}
                    >
                      <FaUser />
                      <input value={values.nome} onChange={handleChange('nome')} type="text" className="grow" placeholder="Nome" />
                    </label>
                    <div className="label">
                      <span className="label-text-alt text-error">
                        {errors.nome}
                      </span>
                    </div>
                  </label>
                  <label className="form-control w-full max-w-xs">
                    <div className="label">
                      <span className="label-text">Usuário</span>
                    </div>
                    <label
                      className={`input input-bordered ${
                        errors.usuario ? "input-error" : ""
                      } flex items-center gap-2`}
                    >
                      <FaUser />
                      <input
                        value={values.usuario}
                        onChange={handleChange('usuario')}
                        type="text"
                        className="grow"
                        placeholder="Usuário"
                      />
                    </label>
                    <div className="label">
                      <span className="label-text-alt text-error">
                        {errors.usuario}
                      </span>
                    </div>
                  </label>
                </div>
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text">Data de nascimento</span>
                  </div>
                  <label
                    className={`input input-bordered ${
                      errors.data_de_nascimento ? "input-error" : ""
                    } flex items-center gap-2`}
                  >
                    <input value={values.data_de_nascimento} onChange={handleChange('data_de_nascimento')} type="date" className="grow" placeholder="Nome" />
                  </label>
                  <div className="label">
                    <span className="label-text-alt text-error">
                      {errors.data_de_nascimento}
                    </span>
                  </div>
                </label>
                <div className="flex flex-row gap-5 w-full">
                  <label className="form-control w-full max-w-xs">
                    <div className="label">
                      <span className="label-text">E-mail</span>
                    </div>
                    <label
                      className={`input input-bordered ${
                        errors.email ? "input-error" : ""
                      } flex items-center gap-2`}
                    >
                      <MdEmail />
                      <input
                        value={values.email}
                        onChange={handleChange('email')}
                        type="email"
                        className="grow"
                        placeholder="ex: teste@teste.com"
                      />
                    </label>
                    <div className="label">
                      <span className="label-text-alt text-error">
                        {errors.email}
                      </span>
                    </div>
                  </label>
                  <label className="form-control w-full max-w-xs">
                    <div className="label">
                      <span className="label-text">Confirma E-mail</span>
                    </div>
                    <label
                      className={`input input-bordered ${
                        errors.confirmarEmail ? "input-error" : ""
                      } flex items-center gap-2`}
                    >
                      <MdEmail />
                      <input
                        value={values.confirmarEmail}
                        onChange={handleChange('confirmarEmail')}
                        type="email"
                        className="grow"
                        placeholder="ex: teste@teste.com"
                      />
                    </label>
                    <div className="label">
                      <span className="label-text-alt text-error">
                        {errors.confirmarEmail}
                      </span>
                    </div>
                  </label>
                </div>
                <div className="flex flex-row gap-5">
                  <label className="form-control w-full max-w-xs">
                    <div className="label">
                      <span className="label-text">Senha</span>
                    </div>
                    <label
                      className={`input input-bordered ${
                        errors.senha ? "input-error" : ""
                      } flex items-center gap-2`}
                    >
                      <FaKey />
                      <input
                        value={values.senha}
                        onChange={handleChange('senha')}
                        type={
                          passwordsVisibility.password ? "text" : "password"
                        }
                        className="grow"
                        placeholder="*********"
                      />
                      <button
                        onClick={() =>
                          setPasswordsVisibility({
                            ...passwordsVisibility,
                            password: !passwordsVisibility.password,
                          })
                        }
                      >
                        {passwordsVisibility.password ? (
                          <FaEyeSlash />
                        ) : (
                          <FaEye />
                        )}
                      </button>
                    </label>
                    <div className="label">
                      <span className="label-text-alt text-error">
                        {errors.senha}
                      </span>
                    </div>
                  </label>
                  <label
                    className={`form-control ${
                      errors.confirmarSenha ? "input-error" : ""
                    } w-full max-w-xs`}
                  >
                    <div className="label">
                      <span className="label-text">Confirma Senha</span>
                    </div>
                    <label className="input input-bordered flex items-center gap-2">
                      <FaKey />
                      <input
                        value={values.confirmarSenha}
                        onChange={handleChange('confirmarSenha')}
                        type={
                          passwordsVisibility.confirm_password
                            ? "text"
                            : "password"
                        }
                        className="grow"
                        placeholder="*********"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setPasswordsVisibility({
                            ...passwordsVisibility,
                            confirm_password:
                              !passwordsVisibility.confirm_password,
                          })
                        }
                      >
                        {passwordsVisibility.confirm_password ? (
                          <FaEyeSlash />
                        ) : (
                          <FaEye />
                        )}
                      </button>
                    </label>
                    <div className="label">
                      <span className="label-text-alt text-error">
                        {errors.confirmarSenha}
                      </span>
                    </div>
                  </label>
                </div>
                <div className="form-control w-full">
                  <label className="label cursor-pointer justify-center gap-5">
                    <input
                        checked={values.termos_de_uso}
                        type="checkbox"
                        className="checkbox checkbox-sm checkbox-primary"
                        onChange={(e) => { setFieldValue('termos_de_uso', e.target.checked); }}
                    />
                    <span className="label-text">
                      Li e concordo com os{" "}
                      <Link href="/termos-de-uso">Termos de Uso</Link>
                    </span>
                  </label>
                </div>
                <div className="w-full flex justify-center mt-5">
                  <button className="btn btn-primary w-full" type="submit">
                    Sign-Up
                  </button>
                </div>
              </form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default SignUpPage;
