import React from 'react';

import MainLayout from '../../layouts/main';

import TwitterAccountInput from './components/twitter-account-input';
import TwitterFollowersList from './components/twitter-followers-list';

const HomePage = () => (
  <MainLayout>
    <TwitterAccountInput />
    <TwitterFollowersList />
  </MainLayout>
);

export default HomePage;
