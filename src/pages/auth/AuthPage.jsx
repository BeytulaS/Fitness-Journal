import Layout from "../../layout";
import { useState } from "react";
import { handleSignUp, handleSignIn } from "../../services/userServices";

export default function AuthPage() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [formType, setFormType] = useState("sign-in");

  const handleFormChange = (type) => () => {
    setCredentials({ email: "", password: "" });
    setFormType(type);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formType === "sign-in") {
      handleSignIn(credentials);
    } else {
      handleSignUp(credentials);
    }
  };

  return (
    <Layout>
      <div
        onSubmit={handleSubmit}
        className="min-h-[calc(100vh-40px)] flex flex-col items-center justify-center px-2"
      >
        <form className="flex flex-col rounded-md bg-white shadow-md py-12 px-8 gap-4 md:min-w-md md:max-w-lg">
          <div className="flex flex-col">
            <label htmlFor="email" className="">
              Email*
            </label>
            <input
              type="email"
              id="email"
              className="rounded-md border  border-gray-300 p-1 shadow-sm"
              value={credentials.email}
              onChange={(e) =>
                setCredentials({ ...credentials, email: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password">Password*</label>
            <input
              type="password"
              id="password"
              className="rounded-md border  border-gray-300 p-1 shadow-sm"
              value={credentials.password}
              onChange={(e) =>
                setCredentials({ ...credentials, password: e.target.value })
              }
            />
          </div>
          {formType === "sign-up" && (
            <div className="flex flex-col">
              <label htmlFor="confirm-password">Confirm Password*</label>
              <input
                type="password"
                id="confirm-password"
                className="rounded-md border  border-gray-300 p-1 shadow-sm"
              />
            </div>
          )}
          <button
            type="submit"
            className="text-white border border-blue-500 bg-blue-600 rounded-md shadow-sm p-1 mt-4"
          >
            Sign In
          </button>
          {formType === "sign-in" ? (
            <p className="text-gray-500">
              Don't have an account?{" "}
              <span
                onClick={handleFormChange("sign-up")}
                className="text-blue-600 cursor-pointer"
              >
                Sign Up
              </span>
            </p>
          ) : (
            <p className="text-gray-500 text-center">
              Already have an account?{" "}
              <span
                onClick={handleFormChange("sign-in")}
                className="text-blue-600 cursor-pointer"
              >
                Sign In
              </span>
            </p>
          )}
        </form>
      </div>
    </Layout>
  );
}
