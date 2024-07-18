import React, { useState } from "react";
import { JobListProps } from "@/interfaces/interfaces";
import { getStatusColor } from "@/utils/getStatusColor";
import { FaPen } from "react-icons/fa"; // Importando ícone de caneta

const JobList: React.FC<JobListProps> = ({
  jobs,
  onDelete,
  onUpdateStatus,
}) => {
  const [editingJobId, setEditingJobId] = useState<string | null>(null);
  const [updatedStatus, setUpdatedStatus] = useState<string>("");

  const handleEditClick = (jobId: string, currentStatus: string) => {
    setEditingJobId(jobId);
    setUpdatedStatus(currentStatus);
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUpdatedStatus(e.target.value);
  };

  const handleStatusUpdate = (jobId: string, status: string) => {
    onUpdateStatus(jobId, status);
    setEditingJobId(null);
  };

  return (
    <div>
      {jobs.length === 0 && (
        <div className="flex items-center justify-center min-h-[150px]">
          <h2 className="text-lg font-bold text-center">
            Não há vagas cadastradas
          </h2>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="bg-white dark:bg-gray-800 p-4 rounded shadow flex flex-col"
          >
            <h3 className="font-bold mb-2">{job.title}</h3>
            <p className="mb-2">Empresa: {job.company}</p>
            <div className="flex items-center mb-2">
              {editingJobId === job.id ? (
                <div className="flex items-center">
                  <select
                    value={updatedStatus}
                    onChange={handleStatusChange}
                    onBlur={() => handleStatusUpdate(job.id!, updatedStatus)} // Atualiza ao desfocar o campo
                    className="p-2 rounded bg-gray-100 dark:bg-gray-700 text-black dark:text-white"
                  >
                    <option value="Análise">Análise</option>
                    <option value="Aprovado">Aprovado</option>
                    <option value="Reprovado">Reprovado</option>
                  </select>
                </div>
              ) : (
                <span className="flex items-center">
                  <span className={`mb-2 ${getStatusColor(job.status)}`}>
                    Status: {job.status}
                  </span>
                  <FaPen
                    onClick={() => handleEditClick(job.id!, job.status)}
                    className="ml-2 text-blue-600 cursor-pointer hover:text-blue-700"
                  />
                </span>
              )}
            </div>
            <p className="mb-2">
              Data de Aplicação: {new Date(job.appliedAt).toLocaleDateString()}
            </p>
            <p className="mb-2">Site: {job.site}</p>
            <button
              onClick={() => job.id && onDelete(job.id)}
              className="mt-2 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300"
            >
              Excluir
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobList;
