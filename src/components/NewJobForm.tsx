import { Job, JobFormProps } from "@/interfaces/interfaces";
import { getJobInitialValues } from "@/utils/getJobInitialValues";
import { statusOptions } from "@/utils/statusOptions";
import { newJobFormValidationSchema } from "@/utils/validationsSchemas";
import { ErrorMessage, Field, Form, Formik } from "formik";

const JobForm: React.FC<JobFormProps> = ({
  isSubmitting,
  userId,
  onSubmit,
}) => {
  const initialValues = getJobInitialValues(userId!);

  const handleSubmit = async (
    values: Job,
    { resetForm }: { resetForm: () => void }
  ) => {
    try {
      await onSubmit(values);
      resetForm();
    } catch (error) {
      console.error("Erro ao submeter o formulário:", error);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={newJobFormValidationSchema}
      onSubmit={handleSubmit}
    >
      <Form id="new-job-form" className="space-y-4">
        <div>
          <label
            id="title-label"
            htmlFor="title"
            className="dark:text-slate-200 block text-sm font-medium text-gray-700"
          >
            Título da Vaga
          </label>
          <Field
            id="title"
            name="title"
            type="text"
            autoComplete="off"
            className="mt-1 dark:text-slate-950 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          <ErrorMessage name="title" component="p" className="text-red-600" />
        </div>

        <div>
          <label
            id="company-label"
            htmlFor="company"
            className="dark:text-slate-200 block text-sm font-medium text-gray-700"
          >
            Empresa
          </label>
          <Field
            id="company"
            name="company"
            type="text"
            autoComplete="off"
            className="mt-1 dark:text-slate-950 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          <ErrorMessage name="company" component="p" className="text-red-600" />
        </div>

        <div>
          <label
            id="status-label"
            htmlFor="status"
            className="dark:text-slate-200 block text-sm font-medium text-gray-700"
          >
            Status da Vaga
          </label>
          <Field
            as="select"
            id="status"
            name="status"
            autoComplete="off"
            className="mt-1 dark:text-slate-950 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Selecione o status</option>
            {statusOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Field>
          <ErrorMessage name="status" component="p" className="text-red-600" />
        </div>

        <div>
          <label
            id="application-label"
            htmlFor="appliedAt"
            className="dark:text-slate-200 block text-sm font-medium text-gray-700"
          >
            Data de Aplicação
          </label>
          <Field
            id="appliedAt"
            name="appliedAt"
            type="date"
            className="mt-1 dark:text-slate-950 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          <ErrorMessage
            name="appliedAt"
            component="p"
            className="text-red-600"
          />
        </div>

        <div>
          <label
            id="site-label"
            htmlFor="site"
            className="dark:text-slate-200 block text-sm font-medium text-gray-700"
          >
            Site da Vaga
          </label>
          <Field
            id="site"
            name="site"
            type="text"
            autoComplete="off"
            className="mt-1 dark:text-slate-950 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          <ErrorMessage name="site" component="p" className="text-red-600" />
        </div>

        <button
          id="new-job-button"
          type="submit"
          className={`bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300 ${
            isSubmitting
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-blue-700 dark:hover:bg-blue-600"
          }`}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Registrando..." : "Registrar Vaga"}
        </button>
      </Form>
    </Formik>
  );
};

export default JobForm;
