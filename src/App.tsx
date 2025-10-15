import { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navbar } from "./components/Navbar";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const PromptPlayground = lazy(() => import("./pages/PromptPlayground"));

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Suspense
        fallback={
          <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600"></div>
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/prompt" element={<PromptPlayground />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
