/*
  ReactQueryTutorial
  https://reffect.co.jp/react/react-use-query
 */

import { useState, useEffect } from "react";
import { useQuery } from "react-query";

const fetchUsers = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  return res.json();
};

export const User = () => {
  const { data, isLoading, isError, error, status } = useQuery(
    "users",
    fetchUsers
  );

  console.log(status);

  if (isLoading) {
    return <span>Loading...</span>;
  }
  if (isError) {
    return <span>Error: {error.message}</span>;
  }
  return (
    <div>
      <h2 className="text-3xl mb-6">ユーザー一覧</h2>
      <div>
        {data.map((user) => (
          <div key={user.id}>{user.name}</div>
        ))}
      </div>
    </div>
  );
};
