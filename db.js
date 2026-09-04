const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'data', 'articles.json');

function load() {
  if (!fs.existsSync(DATA_FILE)) return [];
  const raw = fs.readFileSync(DATA_FILE, 'utf8').trim();
  if (!raw) return [];
  return JSON.parse(raw);
}

function getAll() {
  return load().sort((a, b) => b.createdAt - a.createdAt);
}

function getById(id) {
  return load().find((a) => a.id === id);
}

module.exports = { getAll, getById };
