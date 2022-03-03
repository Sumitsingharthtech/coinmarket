import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Box,
  Card, InputAdornment,
  makeStyles, Table, TableBody, TableCell, TableHead, TableRow, TextField
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import TableContainer from '@material-ui/core/TableContainer';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import TablePagination from '@material-ui/core/TablePagination';
import Divider from '@material-ui/core/Divider';
import SvgIcon from '@material-ui/core/SvgIcon';
import SearchIcon from '@material-ui/icons/Search';
import VoteButton from '../../../components/Vote';
import { VOTE } from '../../../constants';
import Label from '../../../components/Label';
import CryptoIcon from '../../../components/CryptoIcon';

const useStyles = makeStyles(() => ({
  root: {},
  queryField: {
    margin: 5
  },
  clickable: {
    cursor: 'pointer'
  }
}));

const findCustomNyName = (verified, currency) =>
  _.find(verified, (token) => token.symbol === currency);

const filterData = (data, query) => {
  if (!query) {
    return data;
  }
  return _.filter(data, (coin) => coin.info.toLowerCase().includes(query.toLowerCase()));
};

function CoinResults({
  className, data, ...rest
}) {
  const classes = useStyles();
  const { customTokens } = useSelector((state) => state.blockchain);
  const history = useHistory();
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [query, setQuery] = useState('');

  const onRowClick = (event, hash) => {
    if (hash.startsWith('p')) {
      history.push(`/shielded-coins/evolution/${hash}`);
    } else {
      const token = findCustomNyName(customTokens.allVerified, hash);
      history.push(`/custom-tokens/${token.tokenId}`);
    }
  };

  const handleQueryChange = (event) => {
    event.persist();
    setQuery(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Card>
        <TextField
          className={classes.queryField}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SvgIcon
                  fontSize="small"
                  color="action"
                >
                  <SearchIcon />
                </SvgIcon>
              </InputAdornment>
            )
          }}
          onChange={handleQueryChange}
          placeholder="Search by name"
          value={query}
        />
        <Divider />
        <Box>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    Coin
                  </TableCell>
                  <TableCell align="right">
                    Percentage
                  </TableCell>
                  <TableCell align="right">
                    Count
                  </TableCell>
                  <TableCell align="right" />
                </TableRow>
              </TableHead>
              <TableBody>
                {filterData(data, query).slice(page * limit, page * limit + limit).map((coin) => (
                  <TableRow
                    hover
                    key={coin.info}
                  >
                    <TableCell
                      className={classes.clickable}
                      onClick={(event) => onRowClick(event, coin.info)}
                    >
                      <CryptoIcon currency={coin.info} customVerifiedByName />
                      {' '}
                      {coin.info}
                    </TableCell>
                    <TableCell align="right">
                      <Label color={coin.percentage === 0 ? 'warning' : 'primary'}>
                        {coin.percentage}
                        %
                      </Label>
                    </TableCell>
                    <TableCell align="right"><Label color={coin.sum === 0 ? 'warning' : 'primary'}>{coin.sum}</Label></TableCell>
                    <TableCell align="right">
                      <VoteButton type="coin" address={VOTE.COIN_ADDRESS} value={coin.info} count={1} text="Vote" />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        <TablePagination
          component="div"
          count={filterData(data, query).length}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[10, 25, 50, 100]}
          labelRowsPerPage="Rows:"
        />
      </Card>
    </div>
  );
}

CoinResults.propTypes = {
  className: PropTypes.string,
  data: PropTypes.array
};

export default CoinResults;
