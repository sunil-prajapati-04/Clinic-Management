import { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/homePage';
import AddEmpPage from './pages/addEmpPage';
import LoginPage from './pages/loginPage';
import DashboardPage from './pages/dashboardPage';
import AddPatientPage from './pages/addPatientPage';
import AllPatientsPage from './pages/allPatientsPage';
import AddMedicinePage from './pages/addMedicinePage';
import ProfilePage from './pages/profilePage';
import { useAuthStore } from './store/authStore';
import { Toaster } from 'react-hot-toast';

function ProtectedRoute({ authUser, children }) {
  if (!authUser) {
    return <Navigate to="/login" replace />
  }

  return children
}

function App() {
  const { checkAuth, authUser, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100">
        <div className="rounded-lg bg-white px-6 py-4 text-sm font-semibold text-slate-700 shadow-sm">
          Checking authentication...
        </div>
      </div>
    );
  }

  return (
    <>
    <Routes>
      <Route
        path="/login"
        element={authUser ? <Navigate to="/" replace /> : <LoginPage />}
      />
      <Route
        path="/"
        element={
          <ProtectedRoute authUser={authUser}>
            <HomePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute authUser={authUser}>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute authUser={authUser}>
            <ProfilePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/add-employee"
        element={
          <ProtectedRoute authUser={authUser}>
            <AddEmpPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/add-patient"
        element={
          <ProtectedRoute authUser={authUser}>
            <AddPatientPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/patients"
        element={
          <ProtectedRoute authUser={authUser}>
            <AllPatientsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/add-medicine"
        element={
          <ProtectedRoute authUser={authUser}>
            <AddMedicinePage />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to={authUser ? "/" : "/login"} replace />} />
    </Routes>
    <Toaster />
    </>
  )
}

export default App
