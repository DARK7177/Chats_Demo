import React from "react";
import User from "./User";
import useGetAllUsers from "../../contextapi/userGetallUsers";

function Users() {
  const [allUsers, loading, error] = useGetAllUsers();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!allUsers || allUsers.length === 0) return <div>No users found</div>;

  return (
    <div>
      <h1 className="px-8 py-2 text-white font-semibold bg-slate-800 rounded-md">
        Messages
      </h1>
      <div
        className="py-2 flex-1 overflow-y-auto"
        style={{ maxHeight: "calc(84vh - 10vh)" }}
      >
        {allUsers.map((user, index) => (
          <User key={user._id} user={user} /> // Use unique _id as key
        ))}
      </div>
    </div>
  );
}

export default Users;
