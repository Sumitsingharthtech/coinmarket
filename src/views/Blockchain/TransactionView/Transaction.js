import React from 'react';
import moment from 'moment';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Card, Hidden, makeStyles } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Link from '@material-ui/core/Link';
import Type from 'src/views/Blockchain/Transaction/Type';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Label from '../../../components/Label';
import ellipsis from '../../../utils/ellipsis';
import CryptoIcon from '../../../components/CryptoIcon';
import { PRV } from '../../../constants';

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

function showLinkedTransaction(transaction, property) {
  if (transaction.metadata && transaction.metadata[property]) {
    return (
      <TableRow>
        <TableCell>
          Linked Transaction
        </TableCell>
        <TableCell>
          <Link
            component={RouterLink}
            to={`/tx/${transaction.metadata[property]}`}
          >
            <Hidden smDown>
              {transaction.metadata[property]}
            </Hidden>
            <Hidden mdUp>
              {ellipsis(transaction.metadata[property], 8)}
            </Hidden>
          </Link>
        </TableCell>
      </TableRow>
    );
  }
  return null;
}

function showPRVAmount(amount) {
  return (
    <span>
      <CryptoIcon currency={PRV.SYMBOL} />
      {' '}
      {(amount / 10 ** PRV.DECIMALS).toFixed(9)}
      {' '}
      {PRV.SYMBOL}
    </span>
  );
}

function showAmount(tokens, customTokens, tradingFee, tokenId) {
  if (tokens.byTokenId[tokenId]) {
    return (
      <span>
        <CryptoIcon currency={tokens.byTokenId[tokenId].pSymbol} />
        {' '}
        {(tradingFee / 10 ** tokens.byTokenId[tokenId].pDecimals)}
        {' '}
        {tokens.byTokenId[tokenId].pSymbol}
      </span>
    );
  } if (tokenId === PRV.TOKEN_ID) {
    return showPRVAmount(tradingFee);
  } if (customTokens.byTokenId[tokenId]) {
    return (
      <span>
        <CryptoIcon currency={tokenId} />
        {' '}
        {(tradingFee)}
        {' '}
        {customTokens.byTokenId[tokenId].symbol}
      </span>
    );
  }
  return null;
}

function parseAmountAndSymbol(transaction, tokens) {
  function result(amount, tokenId) {
    return {
      amount: amount / 10 ** tokens.byTokenId[tokenId].pDecimals,
      symbol: tokens.byTokenId[tokenId].pSymbol
    };
  }

  function prvResult(amount) {
    return {
      amount: amount / 10 ** PRV.DECIMALS,
      symbol: PRV.SYMBOL
    };
  }

  if (transaction.metadata) {
    if ([81, 25, 261, 262, 45, 95].indexOf(transaction.metadata.Type) !== -1) {
      if (tokens.byTokenId[transaction.privacyCustomTokenData.PropertyID]) {
        const amount = transaction.privacyCustomTokenData.Amount ? transaction.privacyCustomTokenData.Amount : transaction.privacyCustomTokenProofDetail.OutputCoins[0].Value;
        return result(amount, transaction.privacyCustomTokenData.PropertyID);
      } if ([45, 95].indexOf(transaction.metadata.Type) !== -1 && (transaction.metadata.TokenID === PRV.TOKEN_ID || transaction.metadata.TokenIDStr === PRV.TOKEN_ID)) {
        if (transaction.proofDetail
          && transaction.proofDetail.OutputCoins
          && transaction.proofDetail.OutputCoins.length > 0
        ) {
          if (transaction.proofDetail.OutputCoins[0].CoinDetails) {
            return prvResult(transaction.proofDetail.OutputCoins[0].CoinDetails.Value);  
          } else if (transaction.proofDetail.OutputCoins[0].Value) {
            return prvResult(transaction.proofDetail.OutputCoins[0].Value);
          }
        }
      }
    } else if (transaction.metadata.Type === 24) {
      if (tokens.byTokenId[transaction.metadata.TokenID]) {
        return result(transaction.metadata.DepositedAmount, transaction.metadata.TokenID);
      }
    } else if (transaction.metadata.Type === 94) {
      if (transaction.privacyCustomTokenData && tokens.byTokenId[transaction.privacyCustomTokenData.PropertyID]) {
        return result(transaction.privacyCustomTokenData.Amount, transaction.privacyCustomTokenData.PropertyID);
      } if (transaction.metadata.TokenIDStr === PRV.TOKEN_ID) {
        if (transaction.proofDetail
          && transaction.proofDetail.OutputCoins
          && transaction.proofDetail.OutputCoins.length > 0
        ) {
          if (transaction.proofDetail.OutputCoins[0].CoinDetails) {
            return prvResult(transaction.proofDetail.OutputCoins[0].CoinDetails.Value);  
          } else if (transaction.proofDetail.OutputCoins[0].Value) {
            return prvResult(transaction.proofDetail.OutputCoins[0].Value);
          }
        }
      }
    } else if (transaction.metadata.Type === 91 || transaction.metadata.Type === 205) {
      if (tokens.byTokenId[transaction.metadata.TokenIDToSellStr]) {
        return result(transaction.metadata.SellAmount, transaction.metadata.TokenIDToSellStr);
      } if (transaction.metadata.TokenIDToSellStr === PRV.TOKEN_ID) {
        return prvResult(transaction.metadata.SellAmount);
      }
    } else if (transaction.metadata.Type === 90) {
      if (transaction.metadata.TokenIDStr === PRV.TOKEN_ID) {
        return prvResult(transaction.metadata.ContributedAmount);
      }
    } else if (transaction.metadata.Type === 92 || transaction.metadata.Type === 206) {
      if (transaction.privacyCustomTokenData && tokens.byTokenId[transaction.privacyCustomTokenData.PropertyID] && transaction.privacyCustomTokenData.Amount) {
        return result(transaction.privacyCustomTokenData.Amount, transaction.privacyCustomTokenData.PropertyID);
      } 
      if (transaction.proofDetail
        && transaction.proofDetail.OutputCoins
        && transaction.proofDetail.OutputCoins.length > 0
      ) {
        if (transaction.proofDetail.OutputCoins[0].CoinDetails) {
            return prvResult(transaction.proofDetail.OutputCoins[0].CoinDetails.Value);  
        } else if (transaction.proofDetail.OutputCoins[0].Value) {
            return prvResult(transaction.proofDetail.OutputCoins[0].Value);
        }
      }
      if (transaction.privacyCustomTokenProofDetail && 
            transaction.privacyCustomTokenProofDetail.OutputCoins &&
            transaction.privacyCustomTokenProofDetail.OutputCoins.length > 0 &&
            transaction.privacyCustomTokenProofDetail.OutputCoins[0].Value && tokens.byTokenId[transaction.privacyCustomTokenData.PropertyID]) {
              return result(transaction.privacyCustomTokenProofDetail.OutputCoins[0].Value, transaction.privacyCustomTokenData.PropertyID);    
            }
    }
  }
  if (
    !transaction.privacyCustomTokenIsPrivacy
    && transaction.privacyCustomTokenProofDetail.InputCoins
    && transaction.privacyCustomTokenProofDetail.InputCoins.length > 0
    && transaction.privacyCustomTokenProofDetail.OutputCoins
    && transaction.privacyCustomTokenProofDetail.OutputCoins.length > 0
  ) {
    let symbol = tokens.byTokenId[transaction.privacyCustomTokenData.PropertyID] ? tokens.byTokenId[transaction.privacyCustomTokenData.PropertyID].pSymbol : undefined;
    if (!symbol) {
      symbol = transaction.privacyCustomTokenData.PropertySymbol;
    }
    let amount = 0;
    const inputCoinsPublicKey = transaction.privacyCustomTokenProofDetail.InputCoins[0].CoinDetails ? transaction.privacyCustomTokenProofDetail.InputCoins[0].CoinDetails.PublicKey : transaction.privacyCustomTokenProofDetail.InputCoins[0].PublicKey;
    const outputCoins = transaction.privacyCustomTokenProofDetail.OutputCoins;
    outputCoins.forEach((outputCoin) => {
      const publicKey = outputCoin.CoinDetails ? outputCoin.CoinDetails.PublicKey : outputCoin.PublicKey;
      if (publicKey !== inputCoinsPublicKey) {
        amount += outputCoin.CoinDetails ? outputCoin.CoinDetails.Value : outputCoin.Value;
      }
    });
    if (amount === 0) {
      amount = outputCoins[0].CoinDetails ? outputCoins[0].CoinDetails.Value : outputCoins[0].Value;
    }
    if (tokens.byTokenId[transaction.privacyCustomTokenData.PropertyID]) {
      amount /= 10 ** tokens.byTokenId[transaction.privacyCustomTokenData.PropertyID].pDecimals;
    }
    return { amount, symbol };
  }
  return { amount: NaN };
}

function Transaction({
  transaction, tokens, customTokens, mempool, className, ...rest
}) {
  const classes = useStyles();
  const { amount, symbol } = parseAmountAndSymbol(transaction, tokens);
  const metadataType = transaction.metadata ? transaction.metadata.Type : undefined;
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
                {transaction.hash}
              </Hidden>
              <Hidden mdUp>
                {ellipsis(transaction.hash, 8)}
              </Hidden>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              Status
            </TableCell>
            <TableCell>
              {!mempool && (
              <Label
                className={classes.label}
                color="primary"
              >
                Mined
              </Label>
              )}
              {mempool && (
              <Label
                className={classes.label}
                color="warning"
              >
                In Mempool
              </Label>
              )}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              Type
            </TableCell>
            <TableCell>
              <Type type={transaction.type} metadataType={metadataType} />
            </TableCell>
          </TableRow>
          { showLinkedTransaction(transaction, 'RequestedTxID') }
          { showLinkedTransaction(transaction, 'TxRequest') }
          { showLinkedTransaction(transaction, 'TxID') }
          <TableRow>
            <TableCell>
              Timestamp
            </TableCell>
            <TableCell>
              {transaction.timestamp && moment(transaction.timestamp).format('YYYY/MM/DD hh:mm:ss A')}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              Amount
            </TableCell>
            <TableCell>
              { symbol && <CryptoIcon currency={symbol} /> }
              {isNaN(amount) ? (
                <span />
              ) : (
                ` ${amount} ${symbol}`
              )}
            </TableCell>
          </TableRow>
          { transaction.metadata && transaction.metadata.StakingAmountShard && (
          <TableRow>
            <TableCell>
              Staking Amount
            </TableCell>
            <TableCell>
              { showPRVAmount(transaction.metadata.StakingAmountShard) }
            </TableCell>
          </TableRow>
          ) }
          { transaction.metadata && (transaction.metadata.Type === 91 || transaction.metadata.Type === 205) && (
          <TableRow>
            <TableCell>
              Amount to buy
            </TableCell>
            <TableCell>
              { showAmount(tokens, customTokens, transaction.metadata.MinAcceptableAmount, transaction.metadata.TokenIDToBuyStr) }
            </TableCell>
          </TableRow>
          ) }
          <TableRow>
            <TableCell>
              Memo
            </TableCell>
            <TableCell>
              <TextareaAutosize
                rowsMax={4}
                className={classes.textArea}
                value={transaction.info ? transaction.info : ''}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              Block Hash
            </TableCell>
            <TableCell>
              { transaction.blockHash && (
              <Link
                component={RouterLink}
                to={`/blockchain/shard-blocks/${transaction.blockHash}`}
              >
                <Hidden smDown>
                  {transaction.blockHash}
                </Hidden>
                <Hidden mdUp>
                  {ellipsis(transaction.blockHash, 8)}
                </Hidden>
              </Link>
              )}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              Block Height
            </TableCell>
            <TableCell>
              {transaction.blockHeight}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              Shard
            </TableCell>
            <TableCell>
              {transaction.shard}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              Version
            </TableCell>
            <TableCell>
              {transaction.version}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              Fee
            </TableCell>
            <TableCell>
              { showPRVAmount(transaction.fee) }
            </TableCell>
          </TableRow>
          { transaction.metadata && (transaction.metadata.Type === 91 || transaction.metadata.Type === 205) && (
          <TableRow>
            <TableCell>
              pDEX Trading Fee
            </TableCell>
            <TableCell>
              { showPRVAmount(transaction.metadata.TradingFee) }
            </TableCell>
          </TableRow>
          )}
          <TableRow>
            <TableCell>
              Sig Pub Key
            </TableCell>
            <TableCell>
              <Hidden smDown>
                {transaction.sigPubKey}
              </Hidden>
              <Hidden mdUp>
                {ellipsis(transaction.sigPubKey, 8)}
              </Hidden>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              Sig
            </TableCell>
            <TableCell>
              <TextareaAutosize
                rowsMax={4}
                className={classes.textArea}
                value={transaction.sig ? transaction.sig : ''}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              Proof
            </TableCell>
            <TableCell>
              <TextareaAutosize
                rowsMax={4}
                className={classes.textArea}
                value={transaction.proof ? transaction.proof : ''}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              Proof Detail
            </TableCell>
            <TableCell>
              <TextareaAutosize
                rowsMax={4}
                className={classes.textArea}
                value={JSON.stringify(transaction.proofDetail, null, 4)}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              Metadata
            </TableCell>
            <TableCell>
              <TextareaAutosize
                rowsMax={4}
                className={classes.textArea}
                value={JSON.stringify(transaction.metadata, null, 4)}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              Privacy Token Data
            </TableCell>
            <TableCell>
              <TextareaAutosize
                rowsMax={4}
                className={classes.textArea}
                value={JSON.stringify(transaction.privacyCustomTokenData, null, 4)}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              Privacy Token Proof
            </TableCell>
            <TableCell>
              <TextareaAutosize
                rowsMax={4}
                className={classes.textArea}
                value={JSON.stringify(transaction.privacyCustomTokenProofDetail, null, 4)}
              />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Card>
  );
}

Transaction.propTypes = {
  transaction: PropTypes.object.isRequired,
  className: PropTypes.string,
  mempool: PropTypes.bool,
  tokens: PropTypes.object,
  customTokens: PropTypes.object
};

Transaction.defaultProps = {
  mempool: false
};

export default Transaction;
