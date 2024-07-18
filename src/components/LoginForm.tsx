"use client";

import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { loginFormValidationSchema } from "@/utils/validationsSchemas";
import { LoginFormProps } from "@/interfaces/interfaces";
import { loginInitialValues } from "@/utils/initialValues";
import { fetchData } from "@/utils/requestFunction";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { errorToast, successToast } from "@/utils/toastsUtils";

const LoginForm: React.FC<LoginFormProps> = ({ toggleForm }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { login } = useAuth();
  const router = useRouter();

  const onSubmit = async (values: typeof loginInitialValues) => {
    setIsSubmitting(true);
    setErrorMessage("");
    const data = JSON.stringify(values);
    try {
      const response = await fetchData("api/login", "POST", data);
      const newData = await response.json();
      if (response.ok) {
        login(newData.token);
        successToast(`Logado com sucesso!`);
        router.push("/dashboard");
      } else {
        setErrorMessage(`Login falhou: ${newData.error}`);
        errorToast(newData.error);
      }
    } catch (error: any) {
      setErrorMessage(`Erro ao registrar: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={loginInitialValues}
      validationSchema={loginFormValidationSchema}
      onSubmit={onSubmit}
    >
      {() => (
        <Form className="w-full bg-background-light dark:bg-background-dark shadow-md rounded-lg p-8">
          <h2 className="text-lg font-bold mb-6 text-center text-text-light dark:text-text-dark">
            Login
          </h2>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-text-light dark:text-text-dark"
            >
              Email
            </label>
            <Field
              type="text"
              id="email"
              name="email"
              placeholder="Digite seu e-mail"
              className="mt-1 p-1 block w-full border-gray-300 dark:border-gray-700 rounded-sm shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:focus:border-blue-300 dark:focus:ring-blue-300"
            />
            <ErrorMessage
              name="email"
              component="p"
              className="text-red-500 text-sm"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-text-light dark:text-text-dark"
            >
              Senha
            </label>
            <Field
              type="password"
              id="password"
              name="password"
              placeholder="Digite sua senha"
              className="mt-1 p-1 block w-full border-gray-300 dark:border-gray-700 rounded-sm shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:focus:border-blue-300 dark:focus:ring-blue-300"
            />
            <ErrorMessage
              name="password"
              component="p"
              className="text-red-500 text-sm"
            />
          </div>

          {errorMessage && (
            <div className="mb-4 bg-red-500 text-slate-100 rounded-sm py-1 text-sm text-center">
              {errorMessage}
            </div>
          )}

          <button
            type="submit"
            className={`w-full bg-blue-600 dark:bg-blue-500 text-white font-bold py-2 rounded-md transition duration-300 ${
              isSubmitting
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-blue-700 dark:hover:bg-blue-600"
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Logando..." : "Entrar"}
          </button>
          <p className="mt-4 text-center text-text-light dark:text-text-dark">
            Não tem cadastro?{" "}
            <button
              type="button"
              onClick={toggleForm}
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Registre-se
            </button>
          </p>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
