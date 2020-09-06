import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import TableSortLabel from '@material-ui/core/TableSortLabel';

import StyledTableCell from './styled-table-cell';

import useStyles from '../../../styles/base/use-styles';

const headCells = [
  { id: 'name', label: 'Account Name' },
  { id: 'screen_name', label: 'Screen Name' },
];

const SortableTableHead = ({ order, orderBy, onRequestSort }) => {
  const classes = useStyles();

  return (
    <TableHead>
      <TableRow>
        <StyledTableCell>Avatar</StyledTableCell>
        {headCells.map(({ id, label }) => (
          <StyledTableCell
            key={id}
            align="left"
            sortDirection={orderBy === id ? order : false}
          >
            <TableSortLabel
              active={orderBy === id}
              onClick={e => onRequestSort(e, id)}
              direction={orderBy === id ? order : 'asc'}
            >
              {label}
              {orderBy === id && (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              )}
            </TableSortLabel>
          </StyledTableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default SortableTableHead;
