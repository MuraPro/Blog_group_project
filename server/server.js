const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('./api/db.json');
const middleware = jsonServer.defaults();

server.use(middleware);

server.use(
  jsonServer.rewriter({
    '/api/blogs/:blogId/articles/:articleId': '/api/articles/:articleId',
    '/api/articles/:articleId/comments/:commentId': '/api/comments/:commentId'
  })
);

server.use(jsonServer.bodyParser);
server.use((req, res, next) => {
  if (req.method === 'POST') {
    req.body.createdAt = Date.now();
    if (req.body.title) {
      req.body.id = req.body.title.toLowerCase().replace(/ /g, '-');
    }
  } else if (req.method !== 'GET' && (req.url === '/api/articles' || req.url === '/api/comments')) {
    res.sendStatus(404);
  }
  next();
});

server.use('/api', router);

server.listen(3001, () => {
  console.log('JSON Server is running');
});

module.exports = server;
