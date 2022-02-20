import { createHash } from 'crypto';


// Hashing function
export function hash(str) {
  return createHash('SHA1').update(str).digest('hex');
}
