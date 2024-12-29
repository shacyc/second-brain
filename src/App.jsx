import { lazy } from "react";
import { ThemeProvider } from "@/components/theme-provider"
import './App.css'
import { AuthProvider } from "./auth/auth-context";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import ProtectedRoute from "./routes/protected-route";
import PublicRoute from "./routes/public-route";

const Login = lazy(() => import('@/app/login/login'));
const Home = lazy(() => import("@/app/home/home"));
const Note = lazy(() => import("@/app/note/note"));

function App() {

  return (
    <AuthProvider>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            >
              <Route index element={<Note />} />
              <Route path=":noteId" element={<Note />} />
            </Route>
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App
