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
  // https://github.com/FidelLimited/serverless-plugin-optimize/issues/32
  const file = path.resolve(process.env.LAMBDA_TASK_ROOT as string, '_optimize', process.env.AWS_LAMBDA_FUNCTION_NAME as string, 'public', 'index.html')
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
