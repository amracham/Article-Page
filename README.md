# Article Page

A simple article website for reading articles: a scrollable home feed and a full article view.

## Features

- Home page shows a scrollable grid of article cards (thumbnail, title, excerpt, date).
- Click a card to read the full article.

## Setup

```bash
npm install
npm start
```

Then open http://localhost:3000.

## Data storage

Articles live in `data/articles.json`. Each entry looks like:

```json
{
  "id": "unique-id",
  "title": "Article title",
  "thumbnail": null,
  "content": "Paragraph one.\n\nParagraph two.",
  "createdAt": 1725100800000
}
```

Add or edit entries in that file directly to publish new articles. (`thumbnail` can be a path under `public/` to an image, or `null` for a placeholder.)
