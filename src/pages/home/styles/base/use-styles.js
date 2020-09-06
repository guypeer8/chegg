import makeStyles from '@material-ui/core/styles/makeStyles';

const absoluteCenter = {
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  margin: 'auto',
  position: 'absolute',
};

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  divider: {
    margin: '25px 0',
  },
  loadMore: {
    marginTop: 25,
  },   
  modal: {
    ...absoluteCenter,
    width: 400,
    height: 220,
    padding: 20,
    zIndex: 1000,
    display: 'flex',
    position: 'fixed',
    textAlign: 'center',
    background: '#f5f5f5',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
}));

export default useStyles;