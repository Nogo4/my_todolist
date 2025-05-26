import { useState } from "react";
import { treaty } from "@elysiajs/eden";
import { useNavigate } from "react-router-dom";
import type { BackendApp } from "../../../backend/index.ts";

const client = treaty<BackendApp>("http://localhost:3000");

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = () => {
    client.register
      .post({
        username,
        email,
        password,
      })
      .then((response) => {
        if (response.status === 200) {
          console.log("Registration successful:", response.data);
          setError(null);
          navigate("/login");
        } else {
          setError("Registration failed. Please try again.");
        }
      })
      .catch((err) => {
        console.error("Registration error:", err);
        setError("An error occurred while registering");
      });
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen">
        <div className="card w-96 bg-base-300 card-lg shadow-sm ">
          <div className="card-body">
            <h2 className="card-title justify-center w-full text-3xl">
              Register
            </h2>
            <input
              type="text"
              placeholder="Username"
              className="input input-bordered input-primary mb-2"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="text"
              placeholder="Email"
              className="input input-bordered input-primary mb-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="relative mb-2">
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
              <a href="/login" className="text-primary hover:underline">
                Already have an account?
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

export default Register;
