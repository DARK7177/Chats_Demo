import { useEffect, useState } from "react";
import axios from "axios";

function useGetAllUsers() {
  const [allUsers, setAllUsers] = useState([]); // Ensure allUsers is an array
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/api/user/getUserProfile");

        // Log response to debug
        console.log("Response data:", response.data);

        // Extract the `users` array from the response and set it to state
        setAllUsers(response.data.users || []);
      } catch (err) {
        console.error("Error fetching users:", err);
        setError(err.response?.data?.message || "Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return [allUsers, loading, error];
}

export default useGetAllUsers;
