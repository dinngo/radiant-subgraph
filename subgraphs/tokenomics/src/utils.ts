import { BigDecimal, BigInt } from '@graphprotocol/graph-ts';

export function exponentToBigDecimal(decimals: number): BigDecimal {
  let bd = BigDecimal.fromString('1');
  for (let i = 0; i < decimals; i++) {
    bd = bd.times(BigDecimal.fromString('10'));
  }
  return bd;
}

export function toBigUnit(amount: BigInt, decimals: number): BigDecimal {
  if (decimals == 0) {
    return amount.toBigDecimal();
  }
  return amount.toBigDecimal().div(exponentToBigDecimal(decimals));
}
