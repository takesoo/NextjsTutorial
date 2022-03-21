/*
  ReactQueryTutorial
  https://reffect.co.jp/react/react-use-query
 */

import { QueryClient, QueryClientProvider } from "react-query";
import Layout from "../components/layout";
import { User as UserComponent } from "../components/user";

export const User = () => {
  /* QueryClientはキャッシュ情報とのやりとりに利用されます。 */
  const queryClient = new QueryClient();

  return (
    /** 親コンポーネントでQueryClientProviderを設置する */
    <QueryClientProvider client={queryClient}>
      <Layout>
        <UserComponent />
      </Layout>
    </QueryClientProvider>
  );
};

export default User;
