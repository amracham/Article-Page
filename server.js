const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;
const PUBLISH_KEY = process.env.PUBLISH_KEY || 'letmepost';

const uploadDir = path.join(__dirname, 'public', 'uploads');
fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, crypto.randomBytes(8).toString('hex') + ext);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
    cb(null, allowed.includes(path.extname(file.originalname).toLowerCase()));
  },
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

function excerpt(content, len = 140) {
  const text = content.replace(/\s+/g, ' ').trim();
  return text.length > len ? text.slice(0, len) + '…' : text;
}

app.locals.excerpt = excerpt;
app.locals.formatDate = (ts) =>
  new Date(ts).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });

app.get('/', (req, res) => {
  const articles = db.getAll();
  res.render('index', { articles });
});

app.get('/article/:id', (req, res) => {
  const article = db.getById(req.params.id);
  if (!article) return res.status(404).render('404');
  res.render('article', { article });
});

app.get('/new', (req, res) => {
  res.render('new', { error: null });
});

app.post('/new', upload.single('thumbnail'), (req, res) => {
  const { title, content, publishKey } = req.body;

  if (publishKey !== PUBLISH_KEY) {
    if (req.file) fs.unlink(req.file.path, () => {});
    return res.status(403).render('new', { error: 'Incorrect publish key.' });
  }

  if (!title || !title.trim() || !content || !content.trim()) {
    if (req.file) fs.unlink(req.file.path, () => {});
    return res.status(400).render('new', { error: 'Title and content are required.' });
  }

  const thumbnail = req.file ? '/uploads/' + req.file.filename : null;
  const article = db.create({ title: title.trim(), thumbnail, content: content.trim() });
  res.redirect('/article/' + article.id);
});

app.use((req, res) => res.status(404).render('404'));

app.listen(PORT, () => {
  console.log(`Article Page running at http://localhost:${PORT}`);
});
