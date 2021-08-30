import { useRef } from 'react';

import {
  ListTyped,
  FieldType,
  TypedField,
  SelectionMode,
  IColumn,
  IListApi,
  IListAction,
  ActionType,
  ColumnType,
  ListHandlerPagination,
  ListHandlerSortModel,
} from 'react-declarative';

import { redirect } from 'react-micro-router';

import Delete from '@material-ui/icons/Delete';
import Add from '@material-ui/icons/Add';

import IPerson from '../model/IPerson';

import { CC_ORIGIN } from '../config';

const filters: TypedField[] = [
  {
    type: FieldType.Text,
    name: 'firstName',
    title: 'First name',
  },
  {
    type: FieldType.Text,
    name: 'lastName',
    title: 'Last name',
  }
];

const columns: IColumn[] = [
  {
    type: ColumnType.Text,
    field: 'id',
    headerName: 'ID',
    width: 'max(calc(100vw - 650px), 200px)',
  },
  {
    type: ColumnType.Text,
    field: 'firstName',
    headerName: 'First name',
    width: '200px',
  },
  {
    type: ColumnType.Text,
    field: 'lastName',
    headerName: 'Last name',
    width: '200px',
  },
  {
    type: ColumnType.Action,
    headerName: 'Actions',
    sortable: false,
    width: '150px',
  },
];

const actions: IListAction[] = [
  {
    type: ActionType.Add,
  },
  {
    type: ActionType.Menu,
    options: [
      {
        label: 'Create new person',
        icon: Add,
      }
    ]
  },
];

const rowActions = [
  {
    label: 'Remove person',
    action: 'remove-action',
    icon: Delete,
  },
];

interface IFilterData {
  firstName: string;
  lastName: string;
}

const heightRequest = () => window.innerHeight - 100;

const widthRequest = () => window.innerWidth - 20;

const handler = async (
  filters: IFilterData,
  pagination: ListHandlerPagination,
  sort: ListHandlerSortModel,
) => {

  const url = new URL(`${CC_ORIGIN}/crud`);
  url.searchParams.set('filters', JSON.stringify(filters));
  url.searchParams.set('pagination', JSON.stringify(pagination));
  url.searchParams.set('sort', JSON.stringify(sort));

  const data = await fetch(url.toString(), {
    method: 'GET',
  });

  let rows = await data.json();

  const { length: total } = rows;

  rows = rows.slice(pagination.offset, pagination.limit + pagination.offset);

  return {
    rows,
    total,
  };
};

const click = ({ id }: IPerson) => redirect(`${CC_ORIGIN}/${id}`);

const create = () => redirect(`${CC_ORIGIN}/create`);

const fallback = (e: Error) => alert(e.message);

export const ListPage = () => {

  const apiRef = useRef<IListApi>(null);

  const remove = async ({ id }: IPerson) => {
    await fetch(`${CC_ORIGIN}/crud/${id}`, {
      method: 'DELETE',
    });
    await apiRef.current?.reload();
  };

  return (
    <ListTyped<IFilterData, IPerson>
      ref={apiRef}
      title="List Component"
      filterLabel="Filters"
      selectionMode={SelectionMode.Multiple}
      heightRequest={heightRequest}
      widthRequest={widthRequest}
      rowActions={rowActions}
      actions={actions}
      filters={filters}
      columns={columns}
      handler={handler}
      fallback={fallback}
      onRowAction={remove}
      onRowClick={click}
      onAction={create}
      sizeByParent={false}
    />
  );
};

export default ListPage;
