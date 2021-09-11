import path from 'path';
import fs from 'fs';

import React from 'react';
import express from 'express';
import ReactDOMServer from 'react-dom/server';
import App from 'App';
import { StaticRouter } from 'react-router';

const PORT = process.env.PORT || 4000;
const app = express();

app.get('/', (req, res) => {
  const app = ReactDOMServer.renderToString(
    <StaticRouter location={req.url}>
      <App />
    </StaticRouter>,
  );

  const indexFile = path.resolve(path.join(__dirname, '../client/index.html'));
  fs.readFile(indexFile, 'utf8', (err, data) => {
    if (err) {
      console.error('Something went wrong:', err);
      return res.status(500).send('Oops, better luck next time!');
    }

    return res.send(data.replace('<div id="root"></div>', `<div id="root">${app}</div>`));
  });
});

app.use(express.static(path.join(__dirname, '../client')));

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
