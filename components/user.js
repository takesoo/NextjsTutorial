/*
  ReactQueryTutorial
  https://reffect.co.jp/react/react-use-query
 */

import { useState, useEffect } from "react";
import { useQuery } from "react-query";

const fetchUsers = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.co");
  return res.json();
};

export const User = () => {
  /**
   * isErrorとerrorでエラー内容を表示する
   * 第三引数でリトライ回数などを設定できる
   */

  const { data, isLoading, isError, error } = useQuery("users", fetchUsers, {
    retry: false,
  });
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
