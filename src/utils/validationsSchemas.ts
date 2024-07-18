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

export const newJobFormValidationSchema = Yup.object().shape({
  title: Yup.string().required(`O título da vaga é obrigatório`),
  company: Yup.string().required(`A empresa da vaga é obrigatória`),
  status: Yup.string().required(`O status da vaga é obrigatório`),
  appliedAt: Yup.date().required(`A data de aplicação é obrigatória`),
  site: Yup.string().required(`O site de aplicação é obrigatório`),
});
