import React from 'react';
import ellipsis from 'src/utils/ellipsis';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Box,
  Card,
  CardHeader,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  makeStyles, Typography
} from '@material-ui/core';
import Label from 'src/components/Label';

const useStyles = makeStyles((theme) => ({
  root: {},
  clickable: {
    cursor: 'pointer'
  }
}));

function ShardBlocksLinked({ className, blocks, ...rest }) {
  const classes = useStyles();
  const history = useHistory();

  const onRowClick = (event, hash) => {
    history.push(`/blockchain/shard-blocks/${hash}`);
  };

  if (!blocks) {
    return null;
  }

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader
        title="Associated Shard Blocks"
      />
      <Divider />
      <Box>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                Block hash
              </TableCell>
              <TableCell>
                Height
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
            {blocks.map((block) => (
              <TableRow
                onClick={(event) => onRowClick(event, block.hash)}
                hover
                key={block.hash}
                className={classes.clickable}
              >
                <TableCell>
                  <Typography
                    variant="body2"
                  >
                    {ellipsis(block.hash, 5)}
                  </Typography>
                </TableCell>
                <TableCell>
                  {block.height}
                </TableCell>
                <TableCell>
                  {block.shard}
                </TableCell>
                <TableCell>
                  <Label
                    className={classes.label}
                    color="primary"
                  >
                    {moment(block.timestamp).fromNow()}
                  </Label>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Card>
  );
}

ShardBlocksLinked.propTypes = {
  className: PropTypes.string,
  blocks: PropTypes.array
};

export default ShardBlocksLinked;
