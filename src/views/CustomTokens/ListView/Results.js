import React from 'react';
import clsx from 'clsx';
import _ from 'lodash';
import PropTypes from 'prop-types';
import {
  Box,
  Card,
  makeStyles, Table, TableBody, TableCell, TableHead, TableRow
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import TableContainer from '@material-ui/core/TableContainer';
import CryptoIcon from '../../../components/CryptoIcon';

const useStyles = makeStyles(() => ({
  root: {},
  clickable: {
    cursor: 'pointer'
  }
}));

function Results({ className, customTokens, ...rest }) {
  const classes = useStyles();
  const history = useHistory();

  const onClick = (event, tokenId) => {
    history.push(`/custom-tokens/${tokenId}`);
  };

  const allTokens = _.sortBy(customTokens.allVerifiedIds.map((tokenId) => customTokens.byTokenId[tokenId]), ['symbol']);

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Card>
        <Box>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    Token
                  </TableCell>
                  <TableCell>
                    Token Name
                  </TableCell>
                  <TableCell>
                    Total Supply
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allTokens.map((token) => (
                  <TableRow
                    hover
                    key={token.tokenId}
                    className={classes.clickable}
                    onClick={(event) => onClick(event, token.tokenId)}
                  >
                    <TableCell>
                      <CryptoIcon currency={token.tokenId} />
                      {' '}
                      {token.symbol}
                    </TableCell>
                    <TableCell>{token.name}</TableCell>
                    <TableCell>
                      <CryptoIcon currency={token.tokenId} />
                      {' '}
                      {`${new Intl.NumberFormat('en-US', { maximumFractionDigits: 9 }).format(token.amount)} ${token.symbol}`}
                    </TableCell>
                  </TableRow>
                ))}
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
  customTokens: PropTypes.object
};

export default Results;
