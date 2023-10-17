import Layout from "../../layout";
import { useEffect, useState } from "react";
import { handleSignUp, handleSignIn } from "../../services/userServices";
import { useNavigate } from "react-router-dom";

export default function AuthPage() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [formType, setFormType] = useState("sign-in");
  const [passwordStrength, setPasswordStrength] = useState("");
  const navigate = useNavigate();

  const handleFormChange = (type) => () => {
    setCredentials({ email: "", password: "" });
    setFormType(type);
  };

  useEffect(() => {
    if (credentials.password.length === 0) {
      setPasswordStrength("");
    }
    if (
      credentials.password.length >= 8 &&
      credentials.password.search(/[a-z]/) >= 0 &&
      credentials.password.search(/[A-Z]/) >= 0 &&
      credentials.password.search(/[0-9]/) >= 0
    ) {
      setPasswordStrength("Strong");
    } else if (
      (credentials.password.length >= 8 &&
        credentials.password.search(/[a-z]/) >= 0) ||
      (credentials.password.length >= 8 &&
        credentials.password.search(/[A-Z]/) >= 0) ||
      credentials.password.length >= 12
    ) {
      setPasswordStrength("Medium");
    } else if (
      credentials.password.length < 8 &&
      credentials.password.length > 0
    ) {
      setPasswordStrength("Weak");
    }
  }, [credentials.password]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formType === "sign-in") {
      handleSignIn(credentials).then(() => navigate("/"));
    } else {
      handleSignUp(credentials).then(() => navigate("/profile"));
    }
  };

  return (
    <Layout>
      <div
        onSubmit={handleSubmit}
        className="min-h-[calc(100vh-40px)] flex flex-col items-center justify-center px-2"
      >
        <form className="flex flex-col rounded-md bg-white shadow-md py-12 px-8 gap-4 md:w-96 md:px-16 md:max-w-lg">
          <div className="flex flex-col">
            <label htmlFor="email" className="">
              Email
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
            <label htmlFor="password">Password</label>
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
            <>
              <div className="flex flex-col">
                <label htmlFor="confirm-password">Confirm Password</label>
                <input
                  type="password"
                  id="confirm-password"
                  className="rounded-md border  border-gray-300 p-1 shadow-sm"
                />
              </div>
              <div>
                <span>{passwordStrength}</span>
              </div>
            </>
          )}
          <button
            type="submit"
            className="text-white border border-blue-500 bg-blue-600 rounded-md shadow-sm p-1 mt-4"
          >
            Sign {formType === "sign-in" ? "In" : "Up"}
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
