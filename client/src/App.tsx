import { Admin, Resource } from 'react-admin';
import dataProvider from './data-provider/nest-provider';
import { CatsCreate, CatsEdit, CatsList, CatsShow } from './components/cats';
import { lightTheme, darkTheme } from './theme/theme';
import Dashboard from './pages/Dashboard';
import Layout from './layout/Layout';
import { Auth0AuthProvider } from './auth-provider/ra-auth-auth0';
import { BrowserRouter } from 'react-router-dom';
import LoginPage from './pages/Login/Login';

function App() {
  return (
    <BrowserRouter>
      <Admin
        dataProvider={dataProvider}
        authProvider={Auth0AuthProvider}
        loginPage={LoginPage}
        title={'Auth0 Admin'}
        layout={Layout}
        theme={lightTheme}
        dashboard={Dashboard}
        darkTheme={darkTheme}
        defaultTheme="light"
      >
        <Resource
          name="cats"
          list={CatsList}
          edit={CatsEdit}
          show={CatsShow}
          create={CatsCreate}
        />
      </Admin>
    </BrowserRouter>
  );
}

export default App;
