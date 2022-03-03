import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Box,
  Card,
  makeStyles, Typography
} from '@material-ui/core';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Link from '@material-ui/core/Link';
import Table from '@material-ui/core/Table';
import Label from '../../../components/Label';
import CryptoIcon from '../../../components/CryptoIcon';

const useStyles = makeStyles(() => ({
  root: {},
  chart: {
    height: 400
  }
}));

function About({
  className, tokenSummary, ...rest
}) {
  const classes = useStyles();

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Box pb={1} pl={1} pr={1}>
        { tokenSummary && (
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>
                  Name
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                  {tokenSummary.name}
                  {' '}
                  {tokenSummary.verified ? <Label color="success">Verified</Label> : <Label color="warning">Unverified</Label>}
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  Ticker
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                  <CryptoIcon currency={tokenSummary.symbol} />
                  {' '}
                  {tokenSummary.symbol}
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  Token ID
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                  {tokenSummary.id}
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  Last USD price
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                  ${new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(tokenSummary.lastUSDPrice)}
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  Tokens&nbsp;in&nbsp;network
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                  <CryptoIcon currency={tokenSummary.symbol} />{' '}{new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(tokenSummary.amountInNetwork)}
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  Tokens in pDEX
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                  <CryptoIcon currency={tokenSummary.symbol} />{' '}{new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(tokenSummary.amountInPDEX)}
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  Trading pairs
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                  {tokenSummary.pairs.map((pair) => (
                    <span key={pair}><Link href={`/pdex/markets/${pair}`}>{pair}</Link>{'  '}</span>
                  ))}
                  </Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        ) }
      </Box>
    </Card>
  );
}

About.propTypes = {
  className: PropTypes.string,
  tokenSummary: PropTypes.object
};

export default About;
