import { Address } from '@graphprotocol/graph-ts';
import { BIG_DECIMAL_ZERO } from '../constants';
import { User } from '../../generated/schema';

export function getUser(address: Address): User {
  const id = address.toHex();
  let user = User.load(id);
  if (!user) {
    user = new User(id);
    user.amount = BIG_DECIMAL_ZERO;
    user.save();
  }

  return user;
}
