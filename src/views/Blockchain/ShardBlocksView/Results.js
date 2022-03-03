import React from 'react';
import clsx from 'clsx';
import moment from 'moment';
import PropTypes from 'prop-types';
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  makeStyles, Divider
} from '@material-ui/core';
import Label from 'src/components/Label';
import { useHistory } from 'react-router-dom';
import TablePagination from '@material-ui/core/TablePagination';
import TableContainer from '@material-ui/core/TableContainer';
import ellipsis from '../../../utils/ellipsis';

const useStyles = makeStyles(() => ({
  root: {},
  clickable: {
    cursor: 'pointer'
  }
}));

function Results({
  className, page, limit, blocks, count, onPageChanged, onLimitChanged, ...rest
}) {
  const classes = useStyles();
  const history = useHistory();

  const onRowClick = (event, hash) => {
    history.push(`/blockchain/shard-blocks/${hash}`);
  };

  const handlePageChange = (event, newPage) => {
    onPageChanged(newPage);
  };

  const handleLimitChange = (event) => {
    onLimitChanged(event.target.value);
  };

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Card>
        <TablePagination
          component="div"
          count={count}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[10, 25, 50, 100]}
          labelRowsPerPage="Rows:"
        />
        <Divider />
        <Box>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    Hash
                  </TableCell>
                  <TableCell>
                    Height
                  </TableCell>
                  <TableCell>
                    Beacon Height
                  </TableCell>
                  <TableCell>
                    Txs count
                  </TableCell>
                  <TableCell>
                    Shard
                  </TableCell>
                  <TableCell>
                    Date
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {blocks.allIds.map((hash) => {
                  const block = blocks.byId[hash];
                  return (
                    <TableRow
                      onClick={(event) => onRowClick(event, block.hash)}
                      key={block.hash}
                      className={classes.clickable}
                    >
                      <TableCell>{ellipsis(block.hash, 8)}</TableCell>
                      <TableCell>{block.height}</TableCell>
                      <TableCell>{block.beaconHeight}</TableCell>
                      <TableCell>{block.txs}</TableCell>
                      <TableCell>{block.shard}</TableCell>
                      <TableCell>
                        <Label
                          className={classes.label}
                          color="primary"
                        >
                          {moment(block.timestamp).fromNow()}
                        </Label>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Card>
    </div>
  );
}

Results.propTypes = {
  className: PropTypes.string,
  blocks: PropTypes.object,
  onPageChanged: PropTypes.func,
  onLimitChanged: PropTypes.func,
  page: PropTypes.number,
  limit: PropTypes.number,
  count: PropTypes.number
};

export default Results;
