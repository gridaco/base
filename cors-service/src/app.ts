import * as express from 'express';
import * as corsProxy from '../lib/cors';
const app = express();

const cors_proxy = corsProxy.createServer({
  // https://github.com/Rob--W/cors-anywhere/issues/39
  requireHeader: ['origin', 'x-requested-with'],
  // requireHeader: [],
  removeHeaders: [
    'cookie',
    'cookie2',
    'x-request-start',
    'x-request-id',
    'via',
    'connect-time',
    'total-route-time',
  ],
  redirectSameOrigin: true,
  httpProxyOptions: {
    xfwd: false,
  },
});

app.get('/', function (req, res) {
  res.redirect('https://app.cors.bridged.cc/');
});

app.use((req, res, next) => {
  cors_proxy.emit('request', req, res);
});

app.use(((err, req, res, next) => {
  console.error(err);
  return res.status(500).json({
    message: 'Internal Server Error',
  });
}) as express.ErrorRequestHandler);

export { app };
