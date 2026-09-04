const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'data', 'articles.json');

function load() {
  if (!fs.existsSync(DATA_FILE)) return [];
  const raw = fs.readFileSync(DATA_FILE, 'utf8').trim();
  if (!raw) return [];
  return JSON.parse(raw);
}

function save(articles) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(articles, null, 2));
}

function getAll() {
  return load().sort((a, b) => b.createdAt - a.createdAt);
}

function getById(id) {
  return load().find((a) => a.id === id);
}

function create({ title, thumbnail, content }) {
  const articles = load();
  const article = {
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 8),
    title,
    thumbnail,
    content,
    createdAt: Date.now(),
  };
  articles.push(article);
  save(articles);
  return article;
}

module.exports = { getAll, getById, create };
