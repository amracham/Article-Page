const express = require('express');
const path = require('path');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

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

app.use((req, res) => res.status(404).render('404'));

app.listen(PORT, () => {
  console.log(`Article Page running at http://localhost:${PORT}`);
});
