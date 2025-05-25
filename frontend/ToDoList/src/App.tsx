import { BrowserRouter, Routes, Route } from "react-router-dom";
import HeroCenterCard from "./components/heroCenterCard";
import Login from "./Login";
import Register from "./Register";
// import TodoList from "./TodoList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <HeroCenterCard>
              <Login />
            </HeroCenterCard>
          }
        />
        <Route
          path="/register"
          element={
            <HeroCenterCard>
              <Register />
            </HeroCenterCard>
          }
        />
        {/* <Route
          path="/private/todolist"
          element={
            <HeroCenterCard>
              <TodoList />
            </HeroCenterCard>
          }
        /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
