import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import Label from 'src/components/Label';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {},
  navigateNextIcon: {
    marginLeft: theme.spacing(1)
  }
}));

const types = {
  n: { text: 'Normal', class: 'success', useful: true },
  s: { text: 'Reward', class: 'primary', useful: true },
  rs: { text: 'Return staking', class: 'error', useful: true },
  tp: { text: 'Custom token privacy', class: 'warning', useful: true }
};

export const usefulTypes = () => {
  const result = Object.keys(types).map((key) => ({ key, ...types[key] }));
  return _.filter(result, (type) => type.useful);
};

const metadataTypes = {
  24: { type: 'IssuingRequestMeta', text: 'Shielding request', class: 'primary', useful: true },
  25: { type: 'IssuingResponseMeta', text: 'Shielding response', class: 'primary', useful: true },
  26: { type: 'ContractingRequestMeta', text: 'Burn shielded coins v1', class: 'primary', useful: true },
  27: { type: 'BurningRequestMeta', text: 'Burn shielded coins v0', class: 'primary', useful: true },
  240: { type: 'BurningRequestMetaV2', text: 'Burn shielded coins v2', class: 'primary', useful: true },
  72: { type: 'BurningConfirmMeta', text: 'Burn confirm shielded coins', class: 'primary' },
  241: { type: 'BurningConfirmMetaV2', text: 'Burn confirm shielded coins v2', class: 'primary' },
  41: { type: 'ReturnStakingMeta', text: 'Unstaked', class: 'error', useful: true },
  44: { type: 'WithDrawRewardRequestMeta', text: 'Withdraw reward request', class: 'success', useful: true },
  45: { type: 'WithDrawRewardResponseMeta', text: 'Withdraw reward response', class: 'success', useful: true },
  63: { type: 'ShardStakingMeta', text: 'Shard staking', class: 'error', useful: true },
  80: { type: 'IssuingETHRequestMeta', text: 'ETH based coin shielding request', class: 'primary', useful: true },
  81: { type: 'IssuingETHResponseMeta', text: 'ETH based coin shielding response', class: 'primary', useful: true },
  90: { type: 'PDEContributionMeta', text: 'pDEX liquidity request', class: 'warning', useful: true },
  91: { type: 'PDETradeRequestMeta', text: 'pDEX trade request', class: 'warning', useful: true },
  92: { type: 'PDETradeResponseMeta', text: 'pDEX trade response', class: 'warning', useful: true },
  93: { type: 'PDEWithdrawalRequestMeta', text: 'pDEX withdrawal request', class: 'warning', useful: true },
  94: { type: 'PDEWithdrawalResponseMeta', text: 'pDEX withdrawal response', class: 'warning', useful: true },
  95: { type: 'PDEContributionResponseMeta', text: 'pDEX liquidity response', class: 'warning', useful: true },
  96: { type: 'BurningForDepositToSCRequestMeta', text: 'Burning for deposit to SC', class: 'info3', useful: true },
  97: { type: 'BurningConfirmForDepositToSCMeta', text: 'Burning confirm for deposit to SC', class: 'info3' },
  242: { type: 'BurningForDepositToSCRequestMetaV2', text: 'Burning for deposit to SC v2', class: 'info3', useful: true },
  243: { type: 'BurningConfirmForDepositToSCMetaV2', text: 'Burning confirm for deposit to SC v2', class: 'info3' },
  100: { type: 'PortalCustodianDepositMeta', text: 'Portal custodian deposit', class: 'info' },
  101: { type: 'PortalUserRegisterMeta', text: 'Portal user register', class: 'info' },
  102: { type: 'PortalUserRequestPTokenMeta', text: 'Portal user ptoken request ', class: 'info' },
  103: { type: 'PortalCustodianDepositResponseMeta', text: 'Portal custodian deposit response', class: 'info' },
  104: { type: 'PortalUserRequestPTokenResponseMeta', text: 'Portal user ptoken response', class: 'info' },
  105: { type: 'PortalExchangeRatesMeta', text: 'Portal exchange rates', class: 'info', useful: true },
  106: { type: 'PortalRedeemRequestMeta', text: 'Portal redeem request', class: 'info' },
  107: { type: 'PortalRedeemRequestResponseMeta', text: 'Portal redeem request', class: 'info' },
  108: { type: 'PortalRequestUnlockCollateralMeta', text: 'Portal request unlock collateral', class: 'info' },
  110: { type: 'PortalCustodianWithdrawRequestMeta', text: 'Portal custodian withdraw request', class: 'info' },
  111: { type: 'PortalCustodianWithdrawResponseMeta', text: 'Portal custodian withdraw response', class: 'info' },
  112: { type: 'PortalLiquidateCustodianMeta', text: 'Portal liquidation custodian request', class: 'info' },
  113: { type: 'PortalLiquidateCustodianResponseMeta', text: 'Portal liquidation custodian response', class: 'info' },
  114: { type: 'PortalLiquidateTPExchangeRatesMeta', text: 'Portal liquidation tp exchange rates', class: 'info' },
  116: { type: 'PortalExpiredWaitingPortingReqMeta', text: 'Portal expired waiting porting request', class: 'info' },
  117: { type: 'PortalRewardMeta', text: 'Portal reward', class: 'info' },
  118: { type: 'PortalRequestWithdrawRewardMeta', text: 'Portal withdraw reward request', class: 'info' },
  119: { type: 'PortalRequestWithdrawRewardResponseMeta', text: 'Portal withdraw reward response', class: 'info' },
  120: { type: 'PortalRedeemLiquidateExchangeRatesMeta', text: 'Portal redeem liquidate request', class: 'info' },
  121: { type: 'PortalRedeemLiquidateExchangeRatesResponseMeta', text: 'Portal redeem liquidate response', class: 'info' },
  122: { type: 'PortalLiquidationCustodianDepositMeta', text: 'Portal liquidation custodian deposit request', class: 'info' },
  123: { type: 'PortalLiquidationCustodianDepositResponseMeta', text: 'Portal liquidation custodian deposit response', class: 'info' },
  124: { type: 'PortalTotalRewardCustodianMeta', text: 'Portal total reward custodian', class: 'info' },
  125: { type: 'PortalPortingResponseMeta', text: 'Portal porting response', class: 'info' },
  126: { type: 'PortalReqMatchingRedeemMeta', text: 'Portal matching redeem request', class: 'info' },
  127: { type: 'StopAutoStakingMeta', text: 'Unstaking requested', class: 'error', useful: true },
  128: { type: 'PortalPickMoreCustodianForRedeemMeta', text: 'Portal pick more custodian for redeem', class: 'info' },
  129: { type: 'PortalLiquidationCustodianDepositMetaV2', text: 'Portal liquidation custodian deposit request', class: 'info' },
  130: { type: 'PortalLiquidationCustodianDepositResponseMetaV2', text: 'Portal liquidation custodian deposit response', class: 'info' },
  200: { type: 'RelayingBNBHeaderMeta', text: 'Relaying BNB header', class: 'info2' },
  201: { type: 'RelayingBTCHeaderMeta', text: 'Relaying BTC header', class: 'info2', useful: true },
  202: { type: 'PortalTopUpWaitingPortingRequestMeta', text: 'Portal top up waiting porting request', class: 'info' },
  203: { type: 'PortalTopUpWaitingPortingResponseMeta', text: 'Portal top up waiting porting response', class: 'info' },
  205: { type: 'PDECrossPoolTradeRequestMeta', text: 'pDEX trade v2 request', class: 'warning', useful: true },
  206: { type: 'PDECrossPoolTradeResponseMeta', text: 'pDEX trade v2 response', class: 'warning', useful: true },
  260: { type: 'PortalV4ShieldingRequestMeta', text: 'Shielding request v4', class: 'primary', useful: true },
  261: { type: 'PortalV4ShieldingResponseMeta', text: 'Shielding response v4', class: 'primary', useful: true },
  262: { type: 'PortalV4UnshieldingRequestMeta', text: 'Burn shielded coins v4', class: 'primary', useful: true },
  263: { type: 'PortalV4UnshieldingResponseMeta', text: 'Burn confirm shielded coins v4', class: 'primary' }
};

export const usefulMetadataTypes = () => {
  const result = Object.keys(metadataTypes).map((key) => ({ key, ...metadataTypes[key] }));
  return _.orderBy(_.filter(result, (type) => type.useful), 'text');
};

const getClass = (metadataType) => {
  const type = metadataTypes[metadataType];
  if (type) {
    return type.class;
  }
  return 'neutral';
};

const getText = (metadataType) => {
  const type = metadataTypes[metadataType];
  if (type) {
    return type.text;
  }
  return 'unknown';
};

function TransactionType({
  type,
  metadataType
}) {
  const classes = useStyles();
  if (metadataType) {
    return (
      <Label
        className={classes.label}
        color={getClass(metadataType)}
      >
        { getText(metadataType) }
      </Label>
    );
  }
  return (
    <Label
      className={classes.label}
      color="neutral"
    >
      {types[type] ? types[type].text : 'unknown'}
    </Label>
  );
}

Label.propTypes = {
  type: PropTypes.string,
  metadataType: PropTypes.string
};

export default TransactionType;
