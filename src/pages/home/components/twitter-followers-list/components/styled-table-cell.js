import TableCell from '@material-ui/core/TableCell';
import withStyles from '@material-ui/core/styles/withStyles';

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

export default StyledTableCell;
