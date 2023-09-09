import { Admin, Resource } from 'react-admin';
import dataProvider from './data-provider/nest-provider';
import { CatsCreate, CatsEdit, CatsList, CatsShow } from './components/cats';
import { lightTheme, darkTheme } from './theme/theme';
import Dashboard from './pages/Dashboard';
import Layout from './layout/Layout';

function App() {
  return (
    <>
      <Admin
        dataProvider={dataProvider}
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
    </>
  );
}

export default App;
