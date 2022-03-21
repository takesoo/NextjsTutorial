/*
  ReactQueryTutorial
  https://reffect.co.jp/react/react-use-query
 */

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import Layout from "../components/layout";
import { User as UserComponent } from "../components/user";
import { ReactQueryDevtools } from "react-query/devtools";

export const User = () => {
  /* QueryClientはキャッシュ情報とのやりとりに利用されます。 */
  const queryClient = new QueryClient();

  const [show, setShow] = useState(true);

  return (
    /** 親コンポーネントでQueryClientProviderを設置する */
    <QueryClientProvider client={queryClient}>
      <Layout>
        <div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => {
              setShow(!show);
            }}
          >
            Toggle
          </button>
        </div>
        {show && <UserComponent />}
      </Layout>
      <ReactQueryDevtools initialIsOpen={false} position={"bottom-right"} />
    </QueryClientProvider>
  );
};

export default User;
