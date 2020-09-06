import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import TableRow from '@material-ui/core/TableRow';
import React, { useState, useEffect } from 'react';
import TableBody from '@material-ui/core/TableBody';
import Typography from '@material-ui/core/Typography';
import { useSelector, useDispatch } from 'react-redux';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';

import { sortByOrder } from '../../../../utils';

import useStyles from '../../styles/base/use-styles';

import LoadingSkeleton from './components/loading-skeleton';
import StyledTableCell from './components/styled-table-cell';
import SortableTableHead from './components/sortale-table-head';

import TwitterService from '../../../../services/twitter.service';

import { setModal } from '../../../../store/actions/global';
import { setCursor, setFollowers } from '../../../../store/actions/homePage';

const TwitterFollowersList = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isLoading, setIsLoading] = useState(false);
  const [errorLoading, setErrorLoading] = useState('');
  const [orderBy, setOrderBy] = useState('account-name');

  const storeState = useSelector(state => state);

  const { modal } = storeState.global;
  const { account, cursor, followers } = storeState.homePage;

  const handleRequestSort = (_, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const onTableRowClick = (_, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const fetchFollowers = async () => {
    if (account) {
      setIsLoading(true);

      try {
          const { data } = await TwitterService.getFollowers(account, { cursor });
          const { status, payload, error } = data;

          if (status === 'success') {
            dispatch(setCursor(payload.nextCursor));
            dispatch(setFollowers([...followers, ...payload.followers]));
          } else {
              throw error;
          }
      } catch(e) {
        setErrorLoading(e.message || 'Failed to fetch followers.');
      }

      setIsLoading(false);
    }
  }

  useEffect(function onSearchAccount() {
    fetchFollowers();
  }, [account]);

  useEffect(function onLoadingError() {
    dispatch(setModal(errorLoading ? 'error-loading-modal' : null));
  }, [errorLoading]);

  return (
    <>
      {followers.length > 0 && !isLoading && (
        <>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="followers table">
              <SortableTableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
              />
              <TableBody>
                {sortByOrder(followers, order, orderBy)
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map(follower => (
                    <TableRow 
                      hover
                      tabIndex={-1}
                      key={follower.id}
                      selected={selected.includes(follower.name)}
                      onClick={e => onTableRowClick(e, follower.name)}
                    >
                      <StyledTableCell component="th" scope="row">
                        <Avatar 
                          alt={follower.name} 
                          title={follower.name} 
                          src={follower.profile_image_url}
                        />
                      </StyledTableCell>
                      <StyledTableCell>{follower.name}</StyledTableCell>
                      <StyledTableCell>{follower.screen_name}</StyledTableCell>
                    </TableRow>
                  ))
                }
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            page={page}
            component="div"
            count={followers.length}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[5, 10, 25, 50, 100]}
            onChangePage={(_, newPage) => setPage(newPage)}
            onChangeRowsPerPage={e => {
              setRowsPerPage(parseInt(e.target.value, 10));
              setPage(0);
            }}
          />

          {cursor !== 0 && (
            <Button 
              fullWidth
              size="large"
              color="primary"
              variant="contained"
              disabled={isLoading}
              onClick={fetchFollowers}
              className={classes.loadMore}
            >
              Load More
            </Button>
          )}
        </>
      )}

      {isLoading && (
        <LoadingSkeleton />
      )}

      {followers.length === 0 && (
        <Box bgcolor="primary.main" color="primary.contrastText" p={2}>
          No followers to show. Please enter a twitter account to search followers for.
        </Box>
      )}

      {modal === 'error-loading-modal' && (
        <div className={classes.modal}>
          <div>
            <Typography variant="h5" align="center">
              Could not load followers
            </Typography>
            <br />
            <Divider />
          </div>
          <Typography variant="p" align="center" >
            {errorLoading}
          </Typography>
          <div>
            <Button 
              size="large"
              color="primary"
              variant="contained"
              onClick={() => setErrorLoading('')}
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default TwitterFollowersList;
