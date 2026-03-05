# BMTC Backend API Documentation

API reference with **request schemas** and **response shapes** for all endpoints.

---

## Base URL & Health

| Method | Path      | Auth | Description  |
| ------ | --------- | ---- | ------------ |
| GET    | `/health` | No   | Health check |

**Response (200):**

```json
{
  "status": "ok",
  "timestamp": "2026-02-23T12:00:00.000Z"
}
```

---

## Authentication

Tokens are sent via **HTTP-only cookies**: `accessToken`, `refreshToken`.  
Protected routes require a valid `accessToken` (or `refreshToken` for refresh/logout).

---

## 1. Auth API (`/api/auth`)

### 1.1 Check if first admin exists

| Method | Path                           | Auth |
| ------ | ------------------------------ | ---- |
| GET    | `/api/auth/first-admin-exists` | No   |

**Request:** No body or params.

**Response (200):**

```json
{
  "firstAdminExists": true
}
```

- `firstAdminExists` (boolean): whether at least one admin exists.

---

### 1.2 Create first admin

| Method | Path                    | Auth |
| ------ | ----------------------- | ---- |
| POST   | `/api/auth/first-admin` | No   |

**Request (JSON body):**

| Field     | Type   | Required | Validation         |
| --------- | ------ | -------- | ------------------ |
| username  | string | Yes      | min length 1       |
| password  | string | Yes      | min length 1       |
| firstName | string | Yes      | non-empty          |
| lastName  | string | Yes      | non-empty          |
| email     | string | Yes      | valid email format |

**Example:**

```json
{
  "username": "admin",
  "password": "securePassword123",
  "firstName": "John",
  "lastName": "Doe",
  "email": "admin@example.com"
}
```

**Response (201):**

- Sets cookies: `accessToken`, `refreshToken`
- Body:

```json
{
  "message": "Handmade admin created successfully",
  "admin": {
    "username": "string",
    "first_name": "string",
    "last_name": "string",
    "email": "string",
    "profile_image_url": "string | null",
    "created_at": "string (ISO date)",
    "is_verified": true
  }
}
```

**Errors:** `409` – First Admin Already Exists (when at least one admin exists).

---

### 1.3 Login

| Method | Path              | Auth |
| ------ | ----------------- | ---- |
| POST   | `/api/auth/login` | No   |

**Request (JSON body):**

| Field    | Type   | Required | Validation   |
| -------- | ------ | -------- | ------------ |
| username | string | Yes      | min length 1 |
| password | string | Yes      | min length 1 |

**Example:**

```json
{
  "username": "admin",
  "password": "securePassword123"
}
```

**Response (200):**

- Sets cookies: `accessToken`, `refreshToken`
- Body: **Admin (safe)** object only (no wrapper):

```json
{
  "username": "string",
  "first_name": "string",
  "last_name": "string",
  "email": "string",
  "profile_image_url": "string | null",
  "created_at": "string (ISO date)",
  "is_verified": "boolean",
  "creator_id": "number | null"
}
```

**Errors:** `404` Admin Not Found, `401` Wrong password.

---

### 1.4 Me (current admin)

| Method | Path           | Auth         |
| ------ | -------------- | ------------ |
| GET    | `/api/auth/me` | Access token |

**Request:** No body. Auth via cookie.

**Response (200):** Same **Admin (safe)** shape as Login (above).

---

### 1.5 Refresh tokens

| Method | Path                | Auth                   |
| ------ | ------------------- | ---------------------- |
| POST   | `/api/auth/refresh` | Refresh token (cookie) |

**Request:** No body. Auth via refresh token cookie.

**Response (201):**

- Sets new `accessToken` and `refreshToken` cookies.
- Body:

```json
{
  "message": "New Tokens Generated"
}
```

---

### 1.6 Logout

| Method | Path               | Auth                   |
| ------ | ------------------ | ---------------------- |
| POST   | `/api/auth/logout` | Refresh token (cookie) |

**Request:** No body.

**Response (200):**

- Clears `accessToken` and `refreshToken` cookies.
- Body:

```json
{
  "message": "Logged out successfully"
}
```

---

## 2. Admin API (`/api/admin`)

All admin endpoints require **access token** (cookie).

### 2.1 Create admin

| Method | Path                      | Auth         |
| ------ | ------------------------- | ------------ |
| POST   | `/api/admin/create-admin` | Access token |

**Request:** `multipart/form-data`

**Body (form fields):**

| Field     | Type   | Required | Validation                           |
| --------- | ------ | -------- | ------------------------------------ |
| username  | string | Yes      | min length 1                         |
| password  | string | Yes      | min length 1                         |
| firstName | string | Yes      | non-empty                            |
| lastName  | string | Yes      | non-empty                            |
| email     | string | Yes      | valid email format                   |
| avatar    | file   | No       | Image: jpg, jpeg, png, webp; max 5MB |

**Response (201):** **Admin (safe)** object (same shape as Login). No `id`, no `hashed_password`.

**Errors:** `409` – username or email already used.

---

### 2.2 Get all logs

| Method | Path                  | Auth         |
| ------ | --------------------- | ------------ |
| GET    | `/api/admin/all-logs` | Access token |

**Request:** No body or params.

**Response (200):**

```json
{
  "logs": [
    {
      "id": "number",
      "timedate": "string (ISO date)",
      "admin_id": "number"
    }
  ]
}
```

If no logs: `{ "logs": [] }`.

---

### 2.3 Get admin by ID

| Method | Path                | Auth         |
| ------ | ------------------- | ------------ |
| GET    | `/api/admin/id/:id` | Access token |

**Request params:**

| Param | Type   | Validation                             |
| ----- | ------ | -------------------------------------- |
| id    | number | positive integer (coerced from string) |

**Response (200):** **Admin (safe)** object.

**Errors:** `404` – Admin with this id does not exist.

---

### 2.4 Get admin by username

| Method | Path                            | Auth         |
| ------ | ------------------------------- | ------------ |
| GET    | `/api/admin/username/:username` | Access token |

**Request params:** `username` (string).

**Response (200):** **Admin (safe)** object.

**Errors:** `404` – Admin with this username does not exist.

---

### 2.5 Get admin by email

| Method | Path                      | Auth         |
| ------ | ------------------------- | ------------ |
| GET    | `/api/admin/email/:email` | Access token |

**Request params:** `email` (string).

**Response (200):** **Admin (safe)** object.

**Errors:** `404` – Admin with this email does not exist.

---

## 3. News API (`/api/news`)

### 3.1 Upload news

| Method | Path               | Auth         |
| ------ | ------------------ | ------------ |
| POST   | `/api/news/upload` | Access token |

**Request:** `multipart/form-data`

**Body (form fields):**

| Field     | Type   | Required | Validation                                |
| --------- | ------ | -------- | ----------------------------------------- |
| title     | string | Yes      | non-empty                                 |
| content   | string | Yes      | min length 1 (message: at least 20 words) |
| thumbnail | file   | No       | Allowed image types; max 5MB              |

**Response (201):** **News (with admins)** object. See [News response shapes](#news-response-shapes) below.

---

### 3.2 Get news count

| Method | Path              | Auth         |
| ------ | ----------------- | ------------ |
| GET    | `/api/news/count` | Access token |

**Request:** No body or params.

**Response (200):**

```json
{
  "count": 42
}
```

---

### 3.3 Update news

| Method | Path            | Auth         |
| ------ | --------------- | ------------ |
| PATCH  | `/api/news/:id` | Access token |

**Request:** `multipart/form-data`

**Params:** `id` – positive integer (path).

**Body (form fields):** All optional.

| Field     | Type   | Required | Validation                   |
| --------- | ------ | -------- | ---------------------------- |
| title     | string | No       | -                            |
| content   | string | No       | if present: min length 1     |
| thumbnail | file   | No       | Allowed image types; max 5MB |

**Response (200):** **News (with admins)** object.

**Errors:** `400` – Id must be a positive number; `404` – no news found with id.

---

### 3.4 Delete news

| Method | Path            | Auth         |
| ------ | --------------- | ------------ |
| DELETE | `/api/news/:id` | Access token |

**Request params:** `id` – positive integer (path).

**Response (200):** The deleted **News (raw)** object (no creator/updater):

```json
{
  "id": "number",
  "title": "string",
  "content": "string",
  "thumbnail_url": "string | null",
  "views_counter": "number",
  "creator_id": "number",
  "updater_id": "number",
  "created_at": "string (ISO date)",
  "updated_at": "string (ISO date)"
}
```

---

### 3.5 Get single news by ID

| Method | Path            | Auth              |
| ------ | --------------- | ----------------- |
| GET    | `/api/news/:id` | Optional (cookie) |

**Request params:** `id` (number, path).

- If **authenticated** (valid `accessToken` cookie): returns **News (with admins)**.
- If **public**: returns **News (safe)** and increments `views_counter`.

**Errors:** `404` – News not found.

---

### 3.6 Get news range (paginated list)

| Method | Path        | Auth              |
| ------ | ----------- | ----------------- |
| GET    | `/api/news` | Optional (cookie) |

**Request (query):**

| Query  | Type   | Default | Validation       |
| ------ | ------ | ------- | ---------------- |
| limit  | number | 10      | positive integer |
| offset | number | 0       | integer ≥ 0      |

**Example:** `GET /api/news?limit=10&offset=0`

**Response (200):**

```json
{
  "news": ["News (safe) or News (with admins)"],
  "limit": 10,
  "offset": 0,
  "hasMore": true,
  "totalNewsLength": 100
}
```

- `news`: array of **News (safe)** when unauthenticated, **News (with admins)** when authenticated.
- `hasMore`: `offset + news.length < totalNewsLength`.
- `totalNewsLength`: total count of news in the database.

---

## 4. Events API (`/api/events`)

### 4.1 Upload event

| Method | Path                 | Auth         |
| ------ | -------------------- | ------------ |
| POST   | `/api/events/upload` | Access token |

**Request:** `multipart/form-data`

**Body (form fields):**

| Field   | Type   | Required | Validation                            |
| ------- | ------ | -------- | ------------------------------------- |
| title   | string | Yes      | non-empty                             |
| content | string | Yes      | min length 1                          |
| images  | file[] | No       | Allowed image types; max 5MB per file |

Images are uploaded via `ImagesServices` under the `events-thumbnails` directory.  
Upload field name is `images` (multiple files, max 10 files per request).

**Response (201):** **Event (with admins)** object. See [Event response shapes](#event-response-shapes) below.

---

### 4.2 Get events count

| Method | Path                | Auth         |
| ------ | ------------------- | ------------ |
| GET    | `/api/events/count` | Access token |

**Request:** No body or params.

**Response (200):**

```json
{
  "count": 42
}
```

---

### 4.3 Update event

| Method | Path              | Auth         |
| ------ | ----------------- | ------------ |
| PATCH  | `/api/events/:id` | Access token |

**Request:** `multipart/form-data`

**Params:** `id` – positive integer (path).

**Body (form fields):** All optional.

| Field           | Type     | Required | Validation                              |
| --------------- | -------- | -------- | --------------------------------------- |
| title           | string   | No       | -                                       |
| content         | string   | No       | if present: min length 1                |
| images          | file[]   | No       | New images to add; max 5MB per file     |
| deleteImageUrls | string[] | No       | URLs of existing event images to remove |

`PATCH /api/events/:id` supports partial image updates:

- add new images by uploading `images`
- delete only selected existing images via `deleteImageUrls`

`deleteImageUrls` can be sent as:

- repeated form fields (`deleteImageUrls=url1`, `deleteImageUrls=url2`)
- or a JSON array string (`["url1","url2"]`)

**Response (200):** **Event (with admins)** object.

**Errors:** `400` – Id must be a positive number; `404` – no event found with id.

---

### 4.4 Delete event

| Method | Path              | Auth         |
| ------ | ----------------- | ------------ |
| DELETE | `/api/events/:id` | Access token |

**Request params:** `id` – positive integer (path).

**Response (200):** The deleted **Event (raw)** object (with image URLs):

```json
{
  "id": "number",
  "title": "string",
  "content": "string",
  "views_counter": "number",
  "creator_id": "number",
  "updater_id": "number",
  "created_at": "string (ISO date)",
  "updated_at": "string (ISO date)",
  "images": [{ "image_url": "string" }]
}
```

---

### 4.5 Get single event by ID

| Method | Path              | Auth              |
| ------ | ----------------- | ----------------- |
| GET    | `/api/events/:id` | Optional (cookie) |

**Request params:** `id` (number, path).

- If **authenticated** (valid `accessToken` cookie): returns **Event (with admins)**.
- If **public**: returns **Event (safe)** and increments `views_counter`.

**Errors:** `404` – Event not found.

---

### 4.6 Get events range (paginated list)

| Method | Path          | Auth              |
| ------ | ------------- | ----------------- |
| GET    | `/api/events` | Optional (cookie) |

**Request (query):**

| Query  | Type   | Default | Validation       |
| ------ | ------ | ------- | ---------------- |
| limit  | number | 10      | positive integer |
| offset | number | 0       | integer ≥ 0      |

**Example:** `GET /api/events?limit=10&offset=0`

**Response (200):**

```json
{
  "events": ["Event items"],
  "limit": 10,
  "offset": 0,
  "hasMore": true,
  "totalEventsLength": 100
}
```

- `events`: array of event entries with `images`; includes `creator/updater` usernames only when authenticated.
- `hasMore`: `offset + events.length < totalEventsLength`.
- `totalEventsLength`: total count of events in the database.

---

## Shared response shapes

### Admin (safe)

Returned by: first-admin (in body), login, me, create-admin, get admin by id/username/email.  
Excludes: `id`, `hashed_password`.

```json
{
  "username": "string",
  "first_name": "string",
  "last_name": "string",
  "email": "string",
  "profile_image_url": "string | null",
  "created_at": "string (ISO date) | null",
  "is_verified": "boolean",
  "creator_id": "number | null"
}
```

---

### News response shapes

**News (safe)** – public; no creator/updater or admin IDs:

```json
{
  "id": "number",
  "title": "string",
  "content": "string",
  "thumbnail_url": "string | null",
  "created_at": "string (ISO date)",
  "updated_at": "string (ISO date)",
  "views_counter": "number"
}
```

**News (with admins)** – when authenticated; includes creator/updater usernames:

```json
{
  "id": "number",
  "title": "string",
  "content": "string",
  "thumbnail_url": "string | null",
  "views_counter": "number",
  "creator_id": "number",
  "updater_id": "number",
  "created_at": "string (ISO date)",
  "updated_at": "string (ISO date)",
  "creator": { "username": "string" },
  "updater": { "username": "string" }
}
```

---

### Event response shapes

**Event (safe)** – public; no creator/updater metadata:

```json
{
  "id": "number",
  "title": "string",
  "content": "string",
  "created_at": "string (ISO date)",
  "updated_at": "string (ISO date)",
  "views_counter": "number",
  "images": [{ "image_url": "string" }]
}
```

**Event (with admins)** – when authenticated; includes creator/updater usernames:

```json
{
  "id": "number",
  "title": "string",
  "content": "string",
  "views_counter": "number",
  "creator_id": "number",
  "updater_id": "number",
  "created_at": "string (ISO date)",
  "updated_at": "string (ISO date)",
  "creator": { "username": "string" },
  "updater": { "username": "string" },
  "images": [{ "image_url": "string" }]
}
```

---

## Error handling

- **4xx/5xx** responses typically use a body like: `{ "message": "Error description" }`.
- **Validation errors** (e.g. body/params/query) return `400` with details from the validator (e.g. Zod).
- **401** – invalid or missing access token.
- **404** – resource not found (admin, news, etc.).

---

**Last updated:** 2026-02-28
