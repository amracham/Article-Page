# Article Page

A simple article website: browse and read articles, and publish new ones through a lightweight upload form.

## Features

- **Read**: home page shows a scrollable grid of article cards (thumbnail, title, excerpt, date). Click a card to read the full article.
- **Write**: `/new` has a one-step form — title, thumbnail image, content, and a publish key.

## Setup

```bash
npm install
npm start
```

Then open http://localhost:3000.

## Publishing articles

Visit `/new` and fill in the title, thumbnail, and content, then enter the publish key.

By default the publish key is `letmepost`. Set your own before deploying anywhere public:

```bash
PUBLISH_KEY=your-secret-key npm start
```

Anyone who knows the key can publish, so keep it private.

## Data storage

Articles are stored in `data/articles.json` and thumbnails in `public/uploads/`. No database setup required.
