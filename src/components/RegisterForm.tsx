"use client";

import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { registerFormValidationSchema } from "@/utils/validationsSchemas";
import { LoginFormProps } from "@/interfaces/interfaces";

const RegisterForm: React.FC<LoginFormProps> = ({ toggleForm }) => {
  const initialValues = { name: "", email: "", password: "" };

  const onSubmit = (values: typeof initialValues) => {
    console.log(values);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={registerFormValidationSchema}
      onSubmit={onSubmit}
    >
      {() => (
        <Form className="w-full bg-white shadow-md rounded-lg p-8">
          <h2 className="text-lg font-bold mb-6 text-center text-gray-800">
            Registre-se
          </h2>

          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Nome
            </label>
            <Field
              type="text"
              id="name"
              name="name"
              placeholder="Digite seu nome"
              className="mt-1 px-1 block w-full border-gray-300 rounded-sm shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            <ErrorMessage
              name="name"
              component="p"
              className="text-red-500 text-sm"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <Field
              type="text"
              id="email"
              name="email"
              placeholder="Digite seu e-mail"
              className="mt-1 px-1 block w-full border-gray-300 rounded-sm shadow-sm focus:border-blue-500 focus:ring-blue-500"
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
              className="block text-sm font-medium text-gray-700"
            >
              Senha
            </label>
            <Field
              type="password"
              id="password"
              name="password"
              placeholder="Digite sua senha"
              className="mt-1 px-1 block w-full border-gray-100 rounded-sm shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            <ErrorMessage
              name="password"
              component="p"
              className="text-red-500 text-sm"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-bold py-2 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Entrar
          </button>
          <p className="mt-4 text-center text-gray-600">
            Já tem cadastro?{" "}
            <button
              onClick={toggleForm}
              className="text-blue-600 hover:underline"
            >
              Faça o login
            </button>
          </p>
        </Form>
      )}
    </Formik>
  );
};

export default RegisterForm;
