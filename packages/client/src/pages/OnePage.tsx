import { useState } from 'react';

import {
  OneTyped,
  FieldType,
  TypedField,
  Breadcrumbs,
} from 'react-declarative';

import { redirect } from 'react-micro-router';

import Container from '@material-ui/core/Container';

import IPerson from '../model/IPerson';

import uuidv4 from '../utils/uuidv4';

import { CC_ORIGIN } from '../config';
import { useSnackbar } from 'notistack';

const fields: TypedField<IPerson>[] = [
  {
    type: FieldType.Line,
    title: 'System fields',
  },
  {
    name: 'id',
    type: FieldType.Text,
    title: 'Id',
    readonly: true,
    description: 'Readonly',
    defaultValue: uuidv4(),
  },
  {
    type: FieldType.Line,
    title: 'Profile data',
  },
  {
    name: 'firstName',
    type: FieldType.Text,
    title: 'First name',
    isInvalid({
      firstName,
    }) {
      if (!/\b([A-Za-z]{3,20}$)+/gm.test(firstName)) {
        return "It should contain letters, from 3 to 20 symbols. Not empty";
      } else {
        return null;
      }
    },
    description: 'Required',
  },
  {
    name: 'lastName',
    type: FieldType.Text,
    title: 'Last name',
    isInvalid({
      lastName,
    }) {
      if (!/\b([A-Za-z]{3,20}$)+/gm.test(lastName)) {
        return "It should contain letters, from 3 to 20 symbols";
      } else {
        return null;
      }
    },
    description: 'Required',
  },
  {
    name: 'age',
    type: FieldType.Text,
    title: 'Age',
    isInvalid({
      age,
    }) {
      if (!/[0-9]+/gm.test(age)) {
        return "It should contain numbers";
      } else {
        return null;
      }
    },
    description: 'Required',
  },
];

interface IOnePageProps {
  route: {
    path: string;
    params: string[];
  }
}

const handleBack = () => {
  redirect('/');
};

export const OnePage = ({
  route: {
    params: [
      id,
    ],
  }
}: IOnePageProps) => {

  const [ data, setData ] = useState<IPerson | null>(null);
  const { enqueueSnackbar } = useSnackbar();

  const handleSave = async () => {
    if (data) {
      let result;
      if (id === 'create') {
        result = await fetch(`${CC_ORIGIN}/crud`, {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify(data),
        });
      } else {
        result = await fetch(`${CC_ORIGIN}/crud/${id}`, {
          method: 'PUT',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify(data),
        });
      }
      if (result.status === 200 || result.status === 201) {
        enqueueSnackbar('Saved');
        redirect(`/${data.id}`);
        setData(null);
      } else {
        enqueueSnackbar('Error acquired');
      }
    }
  };

  const handleChange = (data: IPerson, initial: boolean) => {
    if (!initial) {
      setData(data);
    }
  };

  const handler = async () => {
    if (id === 'create') {
      return null;
    } else {
      const data = await fetch(`${CC_ORIGIN}/crud/${id}`, {
        method: 'GET',
      });
      const json = await data.json();
      return json as IPerson;
    }
  };

  return (
    <div style={{width: '100vw'}}>
      <Container>
        <Breadcrumbs
          disabled={!data}
          onSave={handleSave}
          onBack={handleBack}
        />
        <OneTyped<IPerson>
          fields={fields}
          handler={handler}
          change={handleChange}
        />
      </Container>
    </div>
  );
};

export default OnePage as React.FC;
