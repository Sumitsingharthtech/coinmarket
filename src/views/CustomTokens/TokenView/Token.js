import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Card, makeStyles } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Link from '@material-ui/core/Link';
import CryptoIcon from '../../../components/CryptoIcon';
import Label from '../../../components/Label';

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

const cleanLink = (link) => {
  if (!link.startsWith('http')) {
    return `http://${link}`;
  }
  return link;
};

function Token({
  token, pairs, className, ...rest
}) {
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
              Name
            </TableCell>
            <TableCell>
              {token.name}
              {' '}
              {token.verified ? <Label color="success">Verified</Label> : <Label color="warning">Unverified</Label>}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              Ticker
            </TableCell>
            <TableCell>
              <CryptoIcon currency={token.tokenId} />
              {' '}
              {token.symbol}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              Token ID
            </TableCell>
            <TableCell>
              {token.tokenId}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              Description
            </TableCell>
            <TableCell>
              <TextareaAutosize
                rowsMax={4}
                className={classes.textArea}
                value={token.description ? token.description : ''}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              Total supply
            </TableCell>
            <TableCell>
              {new Intl.NumberFormat('en-US', { maximumFractionDigits: 9 }).format(token.amount)}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              Owner Name
            </TableCell>
            <TableCell>
              {token.ownerName}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              Owner Website
            </TableCell>
            <TableCell>
              <Link href={cleanLink(token.ownerWebsite)} target="_blank" rel="noopener noreferrer">{token.ownerWebsite}</Link>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              Owner Address
            </TableCell>
            <TableCell>
              {token.ownerAddress}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              Trading pairs
            </TableCell>
            <TableCell>
              {pairs.map((pair) => (
                <span key={pair}>
                  <Link href={`/pdex/markets-custom-token/${pair}`}>{pair}</Link>
&nbsp;&nbsp;
                </span>
              ))}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Card>
  );
}

Token.propTypes = {
  className: PropTypes.string,
  token: PropTypes.object,
  pairs: PropTypes.array
};

export default Token;
