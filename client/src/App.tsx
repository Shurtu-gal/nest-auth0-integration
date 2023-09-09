import { Admin, Resource } from 'react-admin';
import dataProvider from './data-provider/nest-provider';
import { CatsCreate, CatsEdit, CatsList, CatsShow } from './components/cats';

function App() {
  return (
    <>
      <Admin dataProvider={dataProvider} title={'Auth0 Admin'}>
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
