/*
  ReactQueryTutorial
  https://reffect.co.jp/react/react-use-query
 */

import { useState, useEffect } from "react";
import Layout from "../components/layout";

const fetchUsers = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  return res.json();
};

export const User = () => {
  const [users, setUsers] = useState([]);

  /*
    マウント・アンマウント時にfetchUsersを実行し、setUsersする 
    https://qiita.com/k-penguin-sato/items/9373d87c57da3b74a9e6
  */
  useEffect(() => {
    fetchUsers().then((data) => {
      setUsers(data);
    });
  }, []);

  return (
    <Layout>
      <div>
        <h2>ユーザー一覧</h2>
        <div>
          {users.map((user) => (
            <div>{user.name}</div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default User;
