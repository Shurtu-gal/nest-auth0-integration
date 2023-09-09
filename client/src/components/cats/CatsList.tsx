import { Datagrid, List, ListProps, TextField } from 'react-admin';
import Pagination from '../pagination';

const CatsList = (props: ListProps): React.ReactElement => {
  return (
    <List {...props} pagination={<Pagination />}>
      <Datagrid rowClick="show">
        <TextField source="id" />
        <TextField source="name" />
        <TextField source="age" />
        <TextField source="breed" />
      </Datagrid>
    </List>
  );
};

export default CatsList;
