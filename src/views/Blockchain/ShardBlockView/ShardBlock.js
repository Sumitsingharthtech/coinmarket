import React from 'react';
import moment from 'moment';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Card, Hidden,
  makeStyles
} from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Link from '@material-ui/core/Link';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import ellipsis from '../../../utils/ellipsis';

const useStyles = makeStyles((theme) => ({
  root: {},
  textArea: {
    ...theme.typography.body1,
    backgroundColor: theme.textAreaBg,
    color: theme.palette.text.primary,
    fontSize: 13,
    padding: '5px',
    border: 'none',
    outline: 'none',
    resize: 'none',
    width: '100%'
  }
}));

function ShardBlock({ block, className, ...rest }) {
  const classes = useStyles();

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>
              Hash
            </TableCell>
            <TableCell>
              <Hidden smDown>
                {block.hash}
              </Hidden>
              <Hidden mdUp>
                {ellipsis(block.hash, 8)}
              </Hidden>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              Height
            </TableCell>
            <TableCell>
              {block.height}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              Beacon Height
            </TableCell>
            <TableCell>
              {block.beaconHeight}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              Beacon Hash
            </TableCell>
            <TableCell>
              <Link
                component={RouterLink}
                to={`/blockchain/beacon-chain/${block.beaconHash}`}
              >
                <Hidden smDown>
                  {block.beaconHash}
                </Hidden>
                <Hidden mdUp>
                  {ellipsis(block.beaconHash, 8)}
                </Hidden>
              </Link>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              Version
            </TableCell>
            <TableCell>
              {block.version}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              Timestamp
            </TableCell>
            <TableCell>
              {moment(block.timestamp).format('YYYY/MM/DD hh:mm A')}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              Transactions root
            </TableCell>
            <TableCell>
              <Hidden smDown>
                {block.txRoot}
              </Hidden>
              <Hidden mdUp>
                {ellipsis(block.txRoot, 8)}
              </Hidden>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              Round
            </TableCell>
            <TableCell>
              {block.round}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              Epoch
            </TableCell>
            <TableCell>
              {block.epoch}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              Previous block
            </TableCell>
            <TableCell>
              <Link
                component={RouterLink}
                to={`/blockchain/shard-blocks/${block.previousBlockHash}`}
              >
                <Hidden smDown>
                  {block.previousBlockHash}
                </Hidden>
                <Hidden mdUp>
                  {ellipsis(block.previousBlockHash, 8)}
                </Hidden>
              </Link>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              Next Block
            </TableCell>
            <TableCell>
              { block.nextBlockHash && (
              <Link
                component={RouterLink}
                to={`/blockchain/shard-blocks/${block.nextBlockHash}`}
              >
                <Hidden smDown>
                  {block.nextBlockHash}
                </Hidden>
                <Hidden mdUp>
                  {ellipsis(block.nextBlockHash, 8)}
                </Hidden>
              </Link>
              ) }
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              Validation Data
            </TableCell>
            <TableCell>
              <TextareaAutosize
                rowsMax={4}
                className={classes.textArea}
                value={JSON.stringify(block.validationData)}
              />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Card>
  );
}

ShardBlock.propTypes = {
  block: PropTypes.object.isRequired,
  className: PropTypes.string
};

export default ShardBlock;
