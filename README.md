# BMTC Public Website

Public BMTC website built with React, TypeScript, and Vite.

## Environment

Create a `.env` file with:

```env
VITE_API_URL=http://localhost:8080/api/v1
```

The app reads this value from `src/config/env.ts` and uses it for all public API requests.

## Main Pages

- Home
- News list and detail pages
- Events list and detail pages
- Library list and detail pages
- Departments
- About

## Library Data

The public library pages consume the current book shape from the backend, including:

- `title`
- `author`
- `description`
- `major`
- `book_rank`
- `row_number`
- `print_date`
- optional `department`
- `cover_url`
- `views_counter`

The list and detail pages show the optional linked department and the available book metadata.

## Development

- Install dependencies: `npm install`
- Run dev server: `npm run dev`
- Build for production: `npm run build`
