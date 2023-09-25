import rateLimit from 'express-rate-limit';
import { ClientError } from '../exception/client.error';

const maxRequest = 5;
const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 1 hour window
  max: maxRequest,
  skipSuccessfulRequests: true,

  // message: 'You have exceeded the 100 requests',
  // headers: true,

  handler(req, res, next) {
    return next(
      new ClientError(`You have exceeded the ${maxRequest} requests`),
    );
  },
});
export default rateLimiter;
