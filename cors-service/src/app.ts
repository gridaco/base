import * as express from 'express';
import * as path from "path"
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



app.use(express.static('public'))

function serveDemo(req, res){
  const file = path.join(__dirname, '../public', 'index.html')
  res.sendFile(file);
}

app.get('/', function(req, res){
  serveDemo(req, res)
});

app.use((req, res, next) => {
  cors_proxy.emit('request', req, res);
});

app.use(((err, req, res, next) => {
  console.error(err)
  return res.status(500).json({
    message: 'Internal Server Error',
  });
}) as express.ErrorRequestHandler);


export { app };
