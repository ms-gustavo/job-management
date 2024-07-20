import {
  FetchUserDataProps,
  HandleJobDeleteProps,
  HandleJobSubmitProps,
  HandleUpdateStatusProps,
} from "@/interfaces/interfaces";
import { fetchData } from "./requestFunction";

export const fetchUserData = async ({
  token,
  setUserData,
  errorToast,
}: FetchUserDataProps) => {
  try {
    const response = await fetchData("/api/user-data", "GET", undefined, {
      Authorization: `Bearer ${token}`,
    });
    const data = await response.json();
    if (response.ok) {
      setUserData(data.user);
    } else {
      console.log(data);
    }
  } catch (error: any) {
    errorToast(
      `Erro ao resgatar dados do usuário, por favor, tente novamente.`
    );
    console.error(`Erro: ${error.message}`);
  }
};

export const handleJobSubmit = async ({
  values,
  setIsSubmitting,
  setHasJobChanged,
  successToast,
  errorToast,
}: HandleJobSubmitProps) => {
  setIsSubmitting(true);
  const data = JSON.stringify(values);
  try {
    setHasJobChanged(false);
    const response = await fetchData("api/new-job", "POST", data);
    const newData = await response.json();
    if (response.ok) {
      successToast(`Aplicação criada com sucesso!`);
      setHasJobChanged(true);
    } else {
      console.error(`Erro ao salvar: ${newData.error}`);
      errorToast(`Ocorreu um erro, tente novamente mais tarde.`);
    }
  } catch (error: any) {
    console.error(error.message);
  } finally {
    setIsSubmitting(false);
  }
};

export const handleJobDelete = async ({
  jobId,
  token,
  setUserData,
  successToast,
  errorToast,
  setIsSubmitting,
}: HandleJobDeleteProps) => {
  setIsSubmitting(true);
  try {
    const response = await fetchData(
      `/api/jobs/${jobId}`,
      "DELETE",
      undefined,
      {
        Authorization: `Bearer ${token}`,
      }
    );
    if (response.ok) {
      setUserData((prevData) => {
        if (!prevData) return prevData;
        return {
          ...prevData,
          jobs: prevData.jobs.filter((job) => job.id !== jobId),
        };
      });
      successToast(`Vaga excluída com sucesso!`);
    } else {
      const error = await response.json();
      errorToast(`Erro: ${error.message}`);
    }
  } catch (error: any) {
    console.error(`Erro: ${error.message}`);
  } finally {
    setIsSubmitting(false);
  }
};

export const handleUpdateStatus = async ({
  jobId,
  updatedStatus,
  setHasJobChanged,
  token,
  errorToast,
}: HandleUpdateStatusProps) => {
  try {
    setHasJobChanged(false);
    const response = await fetchData(
      `/api/updatejobs/${jobId}`,
      "PUT",
      JSON.stringify({ jobId, updatedStatus }),
      {
        Authorization: `Bearer ${token}`,
      }
    );

    if (response.ok) {
      setHasJobChanged(true);
    } else {
      errorToast("Erro ao atualizar status.");
    }
  } catch (error) {
    console.error("Erro:", error);
  }
};
