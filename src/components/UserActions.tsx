import { UserActionsProps } from "@/interfaces/interfaces";
import React from "react";

const UserActions: React.FC<UserActionsProps> = ({
  handleLogout,
  toggleJobForm,
  toggleJobList,
}) => {
  return (
    <>
      <button
        onClick={toggleJobForm}
        className="bg-green-400 dark:bg-green-500 hover:bg-green-500 dark:hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300"
      >
        Registrar Nova Vaga
      </button>
      <button
        onClick={toggleJobList}
        className="bg-blue-400 dark:bg-blue-500 dark:hover:bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded transition duration-300"
      >
        Listar Vagas
      </button>
      <button
        onClick={handleLogout}
        className="bg-red-400 dark:bg-red-500 hover:bg-red-500 dark:hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-300"
      >
        Logout
      </button>
    </>
  );
};

export default UserActions;
