import { useState, useEffect } from 'react';

import TwitterService from '../services/twitter.service';

const useTwitterFollowersAPI = (initialCursor = -1) => {
    const [error, setError] = useState('');
    const [account, setAccount] = useState('');
    const [followers, setFollowers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [cursor, setCursor] = useState(initialCursor);

    const fetchFollowers = async () => {
      if (account) {
        setIsLoading(true);

        try {
            const { data } = await TwitterService.getFollowers(account, { cursor });
            const { status, payload, error } = data;

            if (status === 'success') {
                setCursor(payload.nextCursor);
                setFollowers([...followers, ...payload.followers]);
                setError('');
            } else {
                throw error;
            }
        } catch(e) {
          setError(e.message | 'Failed to fetch followers.');
        }

        setIsLoading(false);
      }
    }
  
    useEffect(function onAccountChange() {
      setCursor(-1);
      fetchFollowers();
    }, [account]);
    
    return {
        error,
        cursor,
        isLoading, 
        account,
        setAccount,
        followers,
        fetchFollowers,
    };
};

export default useTwitterFollowersAPI;