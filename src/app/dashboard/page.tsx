"use client";

import JobList from "@/components/JobList";
import JobForm from "@/components/NewJobForm";
import ThemeToggle from "@/components/ThemeToggle";
import UserActions from "@/components/UserActions";
import WelcomeUser from "@/components/WelcomeUser";
import { useAuth } from "@/context/AuthContext";
import { Job, User } from "@/interfaces/interfaces";
import { fetchData } from "@/utils/requestFunction";
import { errorToast, successToast } from "@/utils/toastsUtils";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Dashboard: React.FC = () => {
  const [userData, setUserData] = useState<User | null>(null);
  const [showJobForm, setShowJobForm] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [newJobRegistered, setNewJobRegistered] = useState<boolean>(false);
  const { token } = useAuth();
  const { logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.push("/");
      return;
    }

    const fetchUserData = async () => {
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

    fetchUserData();
  }, [token, router, newJobRegistered]);

  const handleJobSubmit = async (values: Job) => {
    setIsSubmitting(true);
    setErrorMessage("");
    const data = JSON.stringify(values);
    try {
      setNewJobRegistered(false);
      const response = await fetchData("api/new-job", "POST", data);
      const newData = await response.json();
      if (response.ok) {
        successToast(`Aplicação criada com sucesso!`);
        setNewJobRegistered(true);
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

  const handleJobDelete = async (jobId: string) => {
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
    }
  };

  const handleLogout = () => {
    logout();
    router.push("/");
    successToast(`Você foi deslogado com sucesso!`);
  };

  if (!userData) {
    return <div>Carregando...</div>;
  }
  return (
    <div className="p-4 min-h-screen bg-background-light dark:bg-background-dark">
      <ThemeToggle />
      <div className="bg-gray-200 dark:bg-slate-950 dark:text-slate-200 p-4 rounded-lg mb-4">
        <WelcomeUser {...userData} />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-3 md:col-span-1 bg-gray-200 dark:bg-slate-950 dark:text-slate-200 p-4 rounded-lg flex flex-col space-y-4">
          <UserActions
            handleLogout={handleLogout}
            toggleJobForm={() => setShowJobForm(true)}
            toggleJobList={() => setShowJobForm(false)}
          />
        </div>
        <div className="col-span-3 md:col-span-2 bg-gray-200 dark:bg-slate-950 dark:text-slate-200 p-4 rounded-lg">
          {showJobForm ? (
            <JobForm
              isSubmitting={isSubmitting}
              userId={userData.id}
              onSubmit={(values) => handleJobSubmit(values)}
            />
          ) : (
            <JobList jobs={userData.jobs} onDelete={handleJobDelete} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
