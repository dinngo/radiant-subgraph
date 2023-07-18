import { Address } from '@graphprotocol/graph-ts';
import { ERC20 } from '../../generated/RDNT/ERC20';
import { ERC20Bytes32 } from '../../generated/RDNT/ERC20Bytes32';
import { NULL_CALL_RESULT_VALUE } from '../constants';
import { Token } from '../../generated/schema';

export function getToken(address: Address): Token {
  let asset = Token.load(address.toHex());
  if (!asset) {
    asset = new Token(address.toHex());

    const contract = ERC20.bind(address);
    const contractBytes32 = ERC20Bytes32.bind(address);

    asset = new Token(address.toHex());
    asset.symbol = 'unknown';
    const symbolResult = contract.try_symbol();
    if (symbolResult.reverted) {
      const symbolResultBytes = contractBytes32.try_symbol();
      if (!symbolResultBytes.reverted) {
        if (symbolResultBytes.value.toHex() != NULL_CALL_RESULT_VALUE) {
          asset.symbol = symbolResultBytes.value.toString();
        }
      }
    } else {
      asset.symbol = symbolResult.value;
    }

    asset.name = 'unknown';
    const nameResult = contract.try_name();
    if (nameResult.reverted) {
      const nameResultBytes = contractBytes32.try_name();
      if (!nameResultBytes.reverted) {
        if (nameResultBytes.value.toHex() != NULL_CALL_RESULT_VALUE) {
          asset.name = nameResultBytes.value.toString();
        }
      }
    } else {
      asset.name = nameResult.value;
    }

    const decimalsResult = contract.try_decimals();
    if (nameResult.reverted) {
      asset.decimals = 18;
    } else {
      asset.decimals = decimalsResult.value;
    }

    asset.save();
  }

  return asset;
}
