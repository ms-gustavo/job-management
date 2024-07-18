import { Job, JobFormProps } from "@/interfaces/interfaces";
import { getJobInitialValues } from "@/utils/getJobInitialValues";
import { statusOptions } from "@/utils/statusOptions";
import { newJobFormValidationSchema } from "@/utils/validationsSchemas";
import { ErrorMessage, Field, Form, Formik } from "formik";

const JobForm: React.FC<JobFormProps> = ({ userId, onSubmit }) => {
  const initialValues = getJobInitialValues(userId!);

  const handleSubmit = (values: Job) => {
    onSubmit(values);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={newJobFormValidationSchema}
      onSubmit={handleSubmit}
    >
      <Form className="space-y-4">
        <div>
          <label
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
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          <ErrorMessage name="title" component="p" className="text-red-600" />
        </div>

        <div>
          <label
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
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          <ErrorMessage name="company" component="p" className="text-red-600" />
        </div>

        <div>
          <label
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
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
            htmlFor="appliedAt"
            className="dark:text-slate-200 block text-sm font-medium text-gray-700"
          >
            Data de Aplicação
          </label>
          <Field
            id="appliedAt"
            name="appliedAt"
            type="date"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          <ErrorMessage
            name="appliedAt"
            component="p"
            className="text-red-600"
          />
        </div>

        <div>
          <label
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
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          <ErrorMessage name="site" component="p" className="text-red-600" />
        </div>

        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300"
        >
          Registrar Vaga
        </button>
      </Form>
    </Formik>
  );
};

export default JobForm;
