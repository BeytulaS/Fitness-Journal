import Layout from "../../layout";
import { useUser } from "../../providers/userProvider";

export default function ProfilePage() {
  const { currentUser } = useUser();

  if (!currentUser) {
    return (
      <Layout>
        <h1>Sign in now to start tracking your progress</h1>
      </Layout>
    );
  }

  return (
    <Layout>
      <h1 className="text-2xl">Profile Page</h1>
      <p>Hello, {currentUser.email}</p>
    </Layout>
  );
}
