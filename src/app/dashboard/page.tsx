"use client";

import ThemeToggle from "@/components/ThemeToggle";
import WelcomeUser from "@/components/WelcomeUser";
import { useAuth } from "@/context/AuthContext";
import { User } from "@/interfaces/interfaces";
import { fetchData } from "@/utils/requestFunction";
import { errorToast, successToast } from "@/utils/toastsUtils";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Dashboard: React.FC = () => {
  const { token } = useAuth();
  const [userData, setUserData] = useState<User | null>(null);
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
  }, [token, router]);

  useEffect(() => {
    console.log(userData);
  }, [userData]);

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
        <div className="col-span-3 lg:col-span-1 bg-gray-200 dark:bg-slate-950 dark:text-slate-200 p-4 rounded-lg flex flex-col space-y-4">
          <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300">
            Registrar Nova Vaga
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300">
            Listar Todas as Vagas
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300"
          >
            Logout
          </button>
        </div>
        <div className="col-span-3 lg:col-span-2 bg-gray-200 dark:bg-slate-950 dark:text-slate-200 p-4 rounded-lg">
          BLOCO 3
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
