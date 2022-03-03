import React from 'react';
import PropTypes from 'prop-types';
import Label from 'src/components/Label';
import {
  makeStyles, Table, TableBody, TableCell, TableHead, TableRow
} from '@material-ui/core';
import moment from 'moment';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router-dom';
import TableContainer from '@material-ui/core/TableContainer';
import CryptoIcon from '../../../components/CryptoIcon';
import Link from '@material-ui/core/Link';
import { ExternalLink as ExternalLinkIcon } from 'react-feather';

const useStyles = makeStyles((theme) => ({
  clickable: {
    cursor: 'pointer'
  }
}));

function ShieldedCoinsHistoryList({
  historyItems,
  fullVersion,
  withTokenName
}) {
  const classes = useStyles();
  const history = useHistory();

  const onClick = (event, token) => {
    history.push(`/shielded-coins/evolution/${token}`);
  };

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            { fullVersion
          && (
          <TableCell>
            Date
          </TableCell>
          )}
            { withTokenName && (
            <TableCell>
              Token
            </TableCell>
            ) }
            { fullVersion && withTokenName && (
            <TableCell>
              Token Name
            </TableCell>
            ) }
            <TableCell>
              Type
            </TableCell>
            <TableCell>
              Amount
            </TableCell>
            { !fullVersion
          && (
          <TableCell>
            Date
          </TableCell>
          )}
          <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {historyItems.map((shieldedCoin, index) => (
            <TableRow
              hover
              key={index}
            >
              {fullVersion
          && (
          <TableCell>
            {moment(shieldedCoin.time).format('YYYY/MM/DD hh:mm A')}
            <Typography
              variant="body2"
              color="textSecondary"
            >
              {moment(shieldedCoin.time).fromNow()}
            </Typography>
          </TableCell>
          )}
              { withTokenName && (
              <TableCell>
                <CryptoIcon currency={shieldedCoin.token} />
                {' '}
                <span className={classes.clickable} onClick={(event) => onClick(event, shieldedCoin.token)}>{shieldedCoin.token}</span>
              </TableCell>
              ) }
              { fullVersion && withTokenName && <TableCell>{shieldedCoin.tokenName === 'UNVERIFIED' ? <Label color="warning">UNVERIFIED</Label> : shieldedCoin.tokenName}</TableCell> }
              <TableCell>
                { shieldedCoin.amount > 0 && (
                <Label
                  className={classes.label}
                  color="success"
                >
                  Shield
                </Label>
                ) }
                { shieldedCoin.amount < 0 && (
                <Label
                  className={classes.label}
                  color="error"
                >
                  Burn
                </Label>
                ) }
              </TableCell>
              <TableCell>
                {Math.abs(shieldedCoin.amount)}
              </TableCell>
              { !fullVersion
          && (
          <TableCell>
            <Label
              className={classes.label}
              color="primary"
            >
              {moment(shieldedCoin.time).utc().fromNow()}
            </Label>
          </TableCell>
          )}
              <TableCell>
                {shieldedCoin.responseTxId && shieldedCoin.responseTxId !== 'empty' && shieldedCoin.responseTxId.length > 8 &&
                <Link href={`/tx/${shieldedCoin.responseTxId}`} target="_blank"><ExternalLinkIcon className={classes.link} size={16} /></Link>
                }
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

ShieldedCoinsHistoryList.propTypes = {
  historyItems: PropTypes.array,
  fullVersion: PropTypes.bool,
  withTokenName: PropTypes.bool
};

ShieldedCoinsHistoryList.defaultProps = {
  withTokenName: true
};

export default ShieldedCoinsHistoryList;
