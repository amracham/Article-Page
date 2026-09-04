# GEC Programme Stories

A simple article website for GEC (Global Education and Concierge Services): a scrollable home feed and a full article view, styled to GEC's brand guide.

## Features

- Home page shows a scrollable grid of article cards (thumbnail, tag, title, excerpt, date).
- Click a card to read the full article.

## Brand

- Colors: Primary Purple `#541F79`, Secondary Gray-Lavender `#B598C9`, Accent Gray-Purple `#815E99`, Neutral Gray `#C8C8C8`, White `#FFFFFF`.
- Type: Inter for the logotype and headings, Poppins for body text (loaded from Google Fonts).

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
  "tag": "Flagship Programme",
  "thumbnail": null,
  "content": "Paragraph one.\n\nParagraph two.",
  "createdAt": 1725100800000
}
```

Add or edit entries in that file directly to publish new articles. (`thumbnail` can be a path under `public/` to an image, or `null` to fall back to the brand-gradient placeholder; `tag` is optional and shows as a small pill on the card and article page.)
