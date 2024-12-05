import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
const Home = React.lazy(() => import("./pages/Home"));
const ProductDetailPage = React.lazy(() => import("./pages/ProductDetailPage"));

const App: React.FC = () => {
  const username = localStorage.getItem("username");
  console.log(username);

  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route
            path="/"
            element={username ? <Home /> : <Navigate to="/login" />}
          />
          <Route path="/login" element={<Login />} />
          <Route
            path="/product/:category/:id"
            element={<ProductDetailPage />}
          />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
