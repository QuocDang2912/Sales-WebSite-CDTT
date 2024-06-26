
import './App.css';
import { BrowserRouter, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import LayOutSite from './Layouts/LayOutSite';
import AppRoute from './router';
import LayoutAdmin from './Layouts/layoutAdmin';
import { useSelector } from 'react-redux';




function App() {
  const user = useSelector((state) => state.user.current);
  const isAdmin = user && user.roles === 'admin';

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LayOutSite />}>
          {
            AppRoute.RouteSite.map((route, index) => {
              const Page = route.component;
              return <Route path={route.path} key={index} element={<Page />} />;
            })

          }
        </Route>
        <Route path='/admin' element={isAdmin ? <LayoutAdmin /> : <Navigate to="/" replace={true} />}>
          {
            isAdmin && AppRoute.RouteAdmin.map((route, index) => {
              const Page = route.component;
              return <Route path={route.path} key={index} element={<Page />} />;
            })
          }
        </Route>
      </Routes>
    </BrowserRouter >
  );
}

export default App;
