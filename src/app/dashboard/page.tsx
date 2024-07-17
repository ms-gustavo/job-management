"use client";

import { useAuth } from "@/context/AuthContext";
import { fetchData } from "@/utils/requestFunction";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Dashboard: React.FC = () => {
  const { token } = useAuth();
  const [userData, setUserData] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.push("/");
      return;
    }

    const fetchUserData = async () => {
      const response = await fetchData("/api/user-data", "GET", undefined, {
        Authorization: `Bearer ${token}`,
      });
      const data = await response.json();
      if (response.ok) {
        setUserData(data);
      } else {
        console.log(data);
      }
    };

    fetchUserData();
  }, [token, router]);

  useEffect(() => {
    console.log(userData);
  }, [userData]);

  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  );
};

export default Dashboard;
