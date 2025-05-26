import { useState } from "react";

function NotFound() {
  const [errorMessage] = useState("Page not found");

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="card w-96 bg-base-300 shadow-sm">
        <div className="card-body">
          <h2 className="card-title justify-center w-full text-3xl">404</h2>
          <p className="text-center">{errorMessage}</p>
        </div>
      </div>
    </div>
  );
}
export default NotFound;
