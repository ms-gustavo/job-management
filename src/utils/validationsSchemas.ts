import * as Yup from "yup";

export const loginFormValidationSchema = Yup.object().shape({
  email: Yup.string().email("Email inválido.").required("Email é obrigatório."),
  password: Yup.string().required("Senha é obrigatória."),
});

export const registerFormValidationSchema = Yup.object().shape({
  name: Yup.string().required("Nome é obrigatório."),
  email: Yup.string().email("Email inválido.").required("Email é obrigatório."),
  password: Yup.string().required("Senha é obrigatória."),
});
