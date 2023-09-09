import React from 'react';
import { Edit, EditProps, SimpleForm, TextInput } from 'react-admin';

const CatsEdit = (props: EditProps): React.ReactElement => {
  return (
    <Edit {...props}>
      <SimpleForm>
        <TextInput source="name" />
        <TextInput source="age" />
        <TextInput source="breed" />
      </SimpleForm>
    </Edit>
  );
};

export default CatsEdit;
