const jsonServer = require('json-server');
const auth = require('json-server-auth');
const { nanoid } = require('nanoid');
const fs = require('fs');
const app = jsonServer.create();
const router = jsonServer.router('./api/db.json');
const middleware = jsonServer.defaults();

const BASE_URL = 'http://localhost:3001';
const UPLOADS_URL = 'http://localhost:3001/uploads';

const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads');
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}.` + file.originalname.split('.').pop());
  }
});

const upload = multer({ storage });

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.post('/uploads', upload.any(), function (req, res) {
  res.jsonp({
    url: `${UPLOADS_URL}/` + req.files[0].filename,
    name: req.files[0].filename
  });
  console.log(`Файл ${req.files[0].filename} успешно загружен`);
  res.end();
});

app.delete('/uploads/:name', function (req, res) {
  const path = `./public/uploads/${req.params.name}`;
  fs.unlink(path, (err) => {
    if (err) {
      console.error(`Ошибка при удалении файла ${req.params.name}`);
    } else {
      console.log(`Файл ${req.params.name} успешно удален`);
      res.sendStatus(200);
    }
  });
});

app.use(
  jsonServer.rewriter({
    '/api/blogs': '/644/api/blogs',
    '/api/blogs/:blogId': '/644/api/blogs/:blogId',
    '/api/blogs/:blogId/articles': '/644/api/blogs/:blogId/articles',
    '/api/blogs/:blogId/articles/:articleId': '/644/api/articles/:articleId',
    '/api/articles/:articleId/comments': '/644/api/articles/:articleId/comments',
    '/api/articles/:articleId/comments/:commentId': '/644/api/comments/:commentId'
  })
);

app.use(jsonServer.bodyParser);
app.use((req, res, next) => {
  const blockRequests =
    req.url === '/api/articles' ||
    req.url === '/api/comments' ||
    req.url === '/api/users' ||
    req.url === '/api/signup' ||
    req.url === '/api/signin';

  if (req.method === 'POST' && req.url !== '/api/signup') {
    req.body.createdAt = Date.now();
  } else if (blockRequests) {
    res.sendStatus(404);
  }
  req.body.id = nanoid(10);
  next();
});

app.db = router.db;

app.use(auth);
app.use(middleware);
app.use('/api', router);

app.listen(3001, () => {
  console.log(`JSON Server запущен по адресу ${BASE_URL}`);
  console.log(`Загрузить файлы можно по адресу ${UPLOADS_URL}`);
});