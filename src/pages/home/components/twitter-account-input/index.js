import trim from 'lodash/trim';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import React, { useState, useEffect } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { useDispatch, useSelector } from 'react-redux';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';

import useStyles from '../../styles/base/use-styles';

import TwitterService from '../../../../services/twitter.service';

import { setModal } from '../../../../store/actions/global';
import { setAccount, setCursor, setFollowers } from '../../../../store/actions/homePage';

const TwitterAccountInput = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [errorLoading, setErrorLoading] = useState('');
  const [isLoadingOptions, setIsLoadingOptions] = useState(false);
  
  const { modal } = useSelector(({ global }) => global);

  const changeAccount = screenName => {
    dispatch(setAccount(screenName));
  };

  const resetCursor = () => {
    dispatch(setCursor(-1));
  };

  const [fetchOptions] = useDebouncedCallback(async () => {
    setIsLoadingOptions(true);
    dispatch(setFollowers([]));

    try {
      const { data } = await TwitterService.getAccounts(query);
      const { status, payload, error } = data;
      
      if (status === 'success') {
        setOptions(payload.accounts);
        resetCursor();
      } else {
        setOptions([]);
        throw error;
      }
    } catch(e) {
      setErrorLoading(e.message || 'Failed to load options.');
    }

    setIsLoadingOptions(false);
  }, 600);

  useEffect(() => {
    if (trim(query)) {
      changeAccount('');
      fetchOptions();
    }
  }, [query]);

  useEffect(function onLoadingError() {
    dispatch(setModal(errorLoading ? 'error-loading-modal' : null));
  }, [errorLoading]);

  return (
    <>
      <Autocomplete
        open={open}
        options={options}
        id="account-input"
        loading={isLoadingOptions}
        style={{marginBottom: 30}}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        getOptionLabel={option => option.screen_name}
        onChange={(_, opt) => changeAccount((opt || {}).screen_name || '')}
        renderInput={params => (
          <TextField
            {...params}
            value={query}
            variant="outlined"
            label="Twitter Account"
            data-testid="account-input"
            onChange={e => setQuery(e.target.value)}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {isLoadingOptions && (
                    <CircularProgress color="inherit" size={20} />
                  )}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
      />

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

export default TwitterAccountInput;
