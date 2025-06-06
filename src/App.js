import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivateRoute from './Components/routes/PrivteRoute';
import { Spin } from 'antd';
import NotFoundPage from './Pages/NotFoundPage';

// Lazy load your pages
const Employee = lazy(() => import('./Pages/EmployePage/index'));
const Page2 = lazy(() => import('./Pages/AuthPage/index'));
const LoginPage=lazy(()=>import('./Pages/AuthPage/index'))
const Tasks=lazy(()=>import('./Pages/TasksPage/index'))
const Dashboard=lazy(()=>import('./Pages/Dashboard/index'))

const App = () => {
  return (
    <BrowserRouter>
    <Suspense
        fallback={
          <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Spin size="large" tip="Loading page..." />
          </div>
        }
      >
        <Routes>
        <Route
            path="/login"
            element={
            
                <LoginPage />
              
            }
          />
          <Route
            path="/Employee"
            element={
              <PrivateRoute>
                <Employee />
              </PrivateRoute>
            }
          />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/Tasks"
            element={
              <PrivateRoute>
                <Tasks />
              </PrivateRoute>
            }
          />
        
          {/* <Route
            path="/page2"
            element={
              <PrivateRoute>
                <Page2 />
              </PrivateRoute>
            }
          /> */}
           <Route
            path="*"
            element={
              <PrivateRoute>
                <NotFoundPage />
              </PrivateRoute>
            }
          />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
