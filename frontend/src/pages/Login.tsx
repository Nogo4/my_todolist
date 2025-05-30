import { useState } from "react";
import { treaty } from "@elysiajs/eden";
import { useNavigate } from "react-router-dom";
import type { BackendApp } from "../../../backend/index.ts";

export const client = treaty<BackendApp>(
  import.meta.env.PROD ? "http://backend:3000" : "http://localhost:3000"
);

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = () => {
    client.login
      .post({
        email,
        password,
      })
      .then((response) => {
        if (response.status == 200) {
          if (response.data) {
            localStorage.setItem("token", response.data);
          } else {
            setError("Invalid token received");
          }
          setError(null);
          navigate("/todolist");
        } else {
          setError("Invalid username or password");
        }
      })
      .catch((err) => {
        console.error("Login error:", err);
        setError("An error occurred while logging in");
      });
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen">
        <div className="card w-96 bg-base-300 card-lg shadow-sm ">
          <div className="card-body">
            <h2 className="card-title justify-center w-full text-3xl">Login</h2>
            <input
              type="text"
              placeholder="Email"
              className="input input-bordered input-primary"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="input input-info w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "👁️" : "🔒"}
              </button>
            </div>

            <div className="flex justify-between items-center card-actions">
              <a href="/register" className="text-primary hover:underline">
                Doesn't have an account?
              </a>
              <button className="btn btn-primary" onClick={handleSubmit}>
                Submit
              </button>
            </div>
            {error && (
              <div className="alert alert-error shadow-lg mt-4">
                <div>
                  <span>{error}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
