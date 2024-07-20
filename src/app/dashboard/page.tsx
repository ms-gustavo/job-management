"use client";

import JobList from "@/components/JobList";
import JobForm from "@/components/NewJobForm";
import ThemeToggle from "@/components/ThemeToggle";
import UserActions from "@/components/UserActions";
import WelcomeUser from "@/components/WelcomeUser";
import { useAuth } from "@/context/AuthContext";
import { User } from "@/interfaces/interfaces";
import {
  handleJobDeleteAdapter,
  handleUpdateStatusAdapter,
} from "@/utils/adapterFunctions";
import { fetchUserData, handleJobSubmit } from "@/utils/serverRequests";
import { errorToast, successToast } from "@/utils/toastsUtils";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";

const Dashboard: React.FC = () => {
  const [userData, setUserData] = useState<User | null>(null);
  const [showJobForm, setShowJobForm] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [hasJobChanged, setHasJobChanged] = useState<boolean>(false);
  const { token } = useAuth();
  const { logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.push("/");
      return;
    }

    fetchUserData({ token, setUserData, errorToast });
  }, [token, router, hasJobChanged]);

  const handleLogout = () => {
    logout();
    router.push("/");
    successToast(`Você foi deslogado com sucesso!`);
  };

  if (!userData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <FaSpinner className="animate-spin text-4xl text-blue-500" />
      </div>
    );
  }
  return (
    <div className="p-4 min-h-screen  bg-gradient-to-r from-blue-200 via-indigo-200 to-purple-200 dark:from-gray-800 dark:via-gray-900 dark:to-black">
      <ThemeToggle />
      <div
        id="welcome-user-container"
        className="bg-indigo-50 dark:bg-slate-950 dark:text-slate-200 p-4 rounded-lg mb-4"
      >
        <WelcomeUser {...userData} />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div
          id="user-actions-container"
          className="col-span-3 md:col-span-1 bg-indigo-50 dark:bg-slate-950 dark:text-slate-200 p-4 rounded-lg flex flex-col space-y-4"
        >
          <UserActions
            handleLogout={handleLogout}
            toggleJobForm={() => setShowJobForm(true)}
            toggleJobList={() => setShowJobForm(false)}
          />
        </div>
        <div
          id="job-containers"
          className="col-span-3 md:col-span-2 bg-indigo-50 dark:bg-slate-950 dark:text-slate-200 p-4 rounded-lg"
        >
          {showJobForm ? (
            <JobForm
              isSubmitting={isSubmitting}
              userId={userData.id}
              onSubmit={(values) =>
                handleJobSubmit({
                  values,
                  setIsSubmitting,
                  setHasJobChanged,
                  successToast,
                  errorToast,
                })
              }
            />
          ) : (
            <JobList
              jobs={userData.jobs}
              onDelete={(jobId) =>
                handleJobDeleteAdapter(
                  jobId,
                  token!,
                  setUserData,
                  successToast,
                  errorToast,
                  setIsSubmitting
                )
              }
              onUpdateStatus={(jobId, updatedStatus) =>
                handleUpdateStatusAdapter(
                  jobId,
                  updatedStatus,
                  token!,
                  setHasJobChanged,
                  errorToast
                )
              }
              isSubmitting={isSubmitting}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
