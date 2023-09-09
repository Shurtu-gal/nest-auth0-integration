import { Show, ShowProps, SimpleShowLayout, TextField } from 'react-admin';

export const CatShow = (props: ShowProps): React.ReactElement => {
  return (
    <Show {...props}>
      <SimpleShowLayout>
        <TextField source="name" />
        <TextField source="age" />
        <TextField source="breed" />
      </SimpleShowLayout>
    </Show>
  );
};

export default CatShow;
