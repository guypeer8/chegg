import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import Container from '@material-ui/core/Container';

const styles = { 
  container: { padding: 50 },
  containerMobile: { padding: '30px 0' },
};

const MainLayout = ({ children }) => {
  const { resolution } = useSelector(({ global }) => global);
  const { device } = resolution;

  const isMobile = device === 'mobile';
  const styleKey = `container${isMobile ? 'Mobile' : ''}`;

  return (
    <Container maxWidth="md">
      <div style={styles[styleKey]}>
        {children}
      </div>
    </Container>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node,
};

MainLayout.defaultProps = {
  children: null,
};

export default MainLayout;
