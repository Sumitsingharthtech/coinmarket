import React from 'react';
import {
  useSelector
} from 'react-redux';

function CurrentNetwork() {
  const { blockchain } = useSelector((state) => state.blockchain);

  if (!blockchain.chainName || blockchain.chainName === 'mainnet') {
    return null;
  }

  return (
    <span>({blockchain.chainName})</span>
  );
}

export default CurrentNetwork;
