import 'babel-polyfill';
import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';

import slashes from 'connect-slashes';
import bodyParser from 'body-parser';
import https from 'https';
import http from 'http';
import { graphqlExpress } from 'graphql-server-express';
import schema from './graphql/';
import renderMiddleware from './middlewares/renderMiddleware';

const app = express();
app.set('trust proxy', true);
console.log(https.createServer);
app.use(helmet({ dnsPrefetchControl: false }));
app.use(compression());
app.use(morgan(__LOCAL__ ? 'dev' : 'combined'));
app.use('/build/client', express.static('build/client'));
const jsonParser = bodyParser.json();
app.use('/graphql', jsonParser, graphqlExpress(req => ({
  schema,
  context: { req },
})));
// app.use('/serviceWorker.js', express.static('build/client/serviceWorker.js'));
// app.use('../client/manifest.json', express.static('build/client/manifest.json'));
app.use(slashes(true));
app.use(renderMiddleware);
const PORT = process.env.PORT || 8000;
// http.createServer(app).listen(PORT);
//https.createServer({},app).listen(PORT);
 app.listen(PORT, () => {
   // eslint-disable-next-line
   console.info(`pwa is running as ${__PWA_ENV__} on port ${PORT}`);
 });
