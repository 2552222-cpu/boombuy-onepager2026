import { Toaster } from "@/components/ui/toaster"
import { motion, AnimatePresence } from 'framer-motion'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import SeoManager from '@/components/SeoManager';
import { lazy, Suspense } from 'react';
import EmployeesLanding from './pages/EmployeesLanding.jsx';
import Privacy from './pages/Privacy';
import AccessibilityStatement from './pages/AccessibilityStatement';
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const ResultsPage = lazy(() => import('./pages/ResultsPage'));
const OrgPage = lazy(() => import('./pages/OrgPage'));
// Add page imports here

const PUBLIC_ROUTES = new Set(['/', '/privacy', '/accessibility']);

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();
  const location = useLocation();
  const isPublic = PUBLIC_ROUTES.has(location.pathname);

  // Public pages (landing + privacy) render immediately — no auth spinner, so the
  // main content (LCP) paints at once. Auth gating stays only for protected routes.
  if (!isPublic && (isLoadingPublicSettings || isLoadingAuth)) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!isPublic && authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      navigateToLogin();
      return null;
    }
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.38, ease: 'easeOut' }}
        style={{ minHeight: '100vh' }}
      >
        <Suspense fallback={null}>
        <Routes location={location}>
          <Route path="/" element={<EmployeesLanding />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="/join/:orgSlug" element={<OrgPage />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/accessibility" element={<AccessibilityStatement />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        </Suspense>
      </motion.div>
    </AnimatePresence>
  );
};

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <SeoManager />
          <AuthenticatedApp />
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App