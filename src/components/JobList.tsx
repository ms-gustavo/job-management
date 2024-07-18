import React, { useState } from "react";
import { JobListProps } from "@/interfaces/interfaces";
import { getStatusColor } from "@/utils/getStatusColor";
import { FaPen } from "react-icons/fa";

const JobList: React.FC<JobListProps> = ({
  jobs,
  onDelete,
  onUpdateStatus,
}) => {
  const [editingJobId, setEditingJobId] = useState<string | null>(null);
  const [updatedStatus, setUpdatedStatus] = useState<string>("");
  const [sortOption, setSortOption] = useState<string>("");

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

  const handleSortChange = (option: string) => {
    setSortOption(option);
  };

  const sortedJobs = [...jobs].sort((a, b) => {
    if (sortOption === "status") {
      return a.status.localeCompare(b.status);
    } else if (sortOption === "date") {
      return new Date(b.appliedAt).getTime() - new Date(a.appliedAt).getTime();
    }
    return 0;
  });

  return (
    <div>
      {jobs.length > 0 && (
        <div className="flex justify-center mb-4">
          <div className="m-2">
            <button
              onClick={() => handleSortChange("status")}
              className={`${
                sortOption === "status"
                  ? "bg-blue-700 hover:bg-blue-800"
                  : "bg-blue-500 hover:bg-blue-600"
              } text-white font-bold py-2 px-4 rounded transition duration-300 mr-2`}
            >
              Ordenar por Status
            </button>
          </div>
          <div className="m-2">
            <button
              onClick={() => handleSortChange("date")}
              className={`${
                sortOption === "date"
                  ? "bg-blue-700 hover:bg-blue-800"
                  : "bg-blue-500 hover:bg-blue-600"
              } text-white font-bold py-2 px-4 rounded transition duration-300`}
            >
              Ordenar por Data de Aplicação
            </button>
          </div>
        </div>
      )}

      {sortedJobs.length === 0 && (
        <div className="flex items-center justify-center min-h-[150px]">
          <h2 className="text-lg font-bold text-center">
            Não há vagas cadastradas
          </h2>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedJobs.map((job) => (
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
                    onBlur={() => handleStatusUpdate(job.id!, updatedStatus)}
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
              className="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300"
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
