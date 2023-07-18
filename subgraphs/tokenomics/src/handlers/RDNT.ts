import { ADDRESS_ZERO, BIG_ZERO } from '../constants';
import { Transfer } from '../../generated/RDNT/ERC20';
import { getToken, getUser } from '../entities';
import { toBigUnit } from '../utils';

export function handleTransfer(event: Transfer): void {
  if (event.params.value.equals(BIG_ZERO)) return;

  const token = getToken(event.address);
  const amount = toBigUnit(event.params.value, token.decimals);

  if (event.params.from.equals(ADDRESS_ZERO)) {
    const to = getUser(event.params.to);
    to.amount = to.amount.plus(amount);
    to.save();
  } else if (event.params.to.equals(ADDRESS_ZERO)) {
    const from = getUser(event.params.from);
    from.amount = from.amount.minus(amount);
    from.save();
  }
  // gift to
  else {
    const from = getUser(event.params.from);
    from.amount = from.amount.minus(amount);
    from.save();
    const to = getUser(event.params.to);
    to.amount = to.amount.plus(amount);
    to.save();
  }
}
