import React from 'react';
import { Create, CreateProps, SimpleForm, TextInput } from 'react-admin';

const CatsCreate = (props: CreateProps): React.ReactElement => {
  return (
    <Create {...props} title="Create a Cat" redirect={'list'}>
      <SimpleForm>
        <TextInput source="name" />
        <TextInput source="age" />
        <TextInput source="breed" />
      </SimpleForm>
    </Create>
  );
};

export default CatsCreate;
