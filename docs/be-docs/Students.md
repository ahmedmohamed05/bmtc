# Students API Documentation

## Main Route

**Route:** `/api/students`

---

## Sub-Routes

### 1. Create Student

| Method | Path          | Auth Required         | Description          |
| ------ | ------------- | --------------------- | -------------------- |
| POST   | /api/students | Yes (DEPARTMENT_HEAD) | Create a new student |

#### Request Shape

```json
{
  "name": "string (required, 1-150 chars)",
  "age": "number (required, 5-100)",
  "stage": "number (required, 1-4)",
  "departmentId": "number (required, positive)"
}
```

#### Response Shape

- **Success (201):**
  - Student object (see Object Shape section)

#### Possible Errors

| Status | Message              |
| ------ | -------------------- |
| 404    | Department not found |

---

### 2. Get All Students

| Method | Path          | Auth Required | Description                   |
| ------ | ------------- | ------------- | ----------------------------- |
| GET    | /api/students | No            | List all students (paginated) |

#### Query Parameters

- `limit`: number (default 10)
- `offset`: number (default 0)

#### Response Shape

- **Success (200):**
  - `{ data: [...], total, limit, offset }`

---

### 3. Get Students by Department

| Method | Path                                                           | Auth Required | Description                                |
| ------ | -------------------------------------------------------------- | ------------- | ------------------------------------------ |
| GET    | /api/students/department?departmentId=number&limit=10&offset=0 | No            | List students for a department (paginated) |

#### Response Shape

- **Success (200):**
  - `{ data: [...], total, limit, offset }`

#### Possible Errors

| Status | Message              |
| ------ | -------------------- |
| 404    | Department not found |

---

### 4. Get Students by Stage

| Method | Path                                               | Auth Required | Description                           |
| ------ | -------------------------------------------------- | ------------- | ------------------------------------- |
| GET    | /api/students/stage?stage=number&limit=10&offset=0 | No            | List students for a stage (paginated) |

#### Response Shape

- **Success (200):**
  - `{ data: [...], total, limit, offset }`

---

### 5. Get Student by ID

| Method | Path              | Auth Required | Description       |
| ------ | ----------------- | ------------- | ----------------- |
| GET    | /api/students/:id | No            | Get student by id |

#### Response Shape

- **Success (200):**
  - Student object (see Object Shape section)

#### Possible Errors

| Status | Message           |
| ------ | ----------------- |
| 404    | Student not found |

---

### 6. Update Student

| Method | Path              | Auth Required         | Description            |
| ------ | ----------------- | --------------------- | ---------------------- |
| PATCH  | /api/students/:id | Yes (DEPARTMENT_HEAD) | Update student details |

#### Request Shape

- Fields (all optional except `id` in path):
  - `name`: string (1-150 chars)
  - `age`: number (5-100)
  - `stage`: number (1-4)
  - `departmentId`: number (positive)

#### Response Shape

- **Success (200):**
  - Updated student object (see Object Shape section)

#### Possible Errors

| Status | Message              |
| ------ | -------------------- |
| 404    | Student not found    |
| 404    | Department not found |

---

### 7. Delete Student

| Method | Path              | Auth Required         | Description      |
| ------ | ----------------- | --------------------- | ---------------- |
| DELETE | /api/students/:id | Yes (DEPARTMENT_HEAD) | Delete a student |

#### Response Shape

- **Success (200):**
  - Deleted student object (see Object Shape section)

#### Possible Errors

| Status | Message           |
| ------ | ----------------- |
| 404    | Student not found |

---

### 8. Count Students by Department

| Method | Path                                               | Auth Required         | Description                    |
| ------ | -------------------------------------------------- | --------------------- | ------------------------------ |
| GET    | /api/students/count/department?departmentId=number | Yes (DEPARTMENT_HEAD) | Count students in a department |

#### Response Shape

- **Success (200):**
  - `{ count, departmentId }`

#### Possible Errors

| Status | Message              |
| ------ | -------------------- |
| 404    | Department not found |

---

### 9. Count Students by Stage

| Method | Path                                   | Auth Required         | Description               |
| ------ | -------------------------------------- | --------------------- | ------------------------- |
| GET    | /api/students/count/stage?stage=number | Yes (DEPARTMENT_HEAD) | Count students in a stage |

#### Response Shape

- **Success (200):**
  - `{ count, stage }`

---

### 10. Filter Students by Stage and Department

| Method | Path                                                                    | Auth Required         | Description                                         |
| ------ | ----------------------------------------------------------------------- | --------------------- | --------------------------------------------------- |
| GET    | /api/students/filter?stage=number&departmentId=number&limit=10&offset=0 | Yes (DEPARTMENT_HEAD) | Filter students by stage and department (paginated) |

#### Response Shape

- **Success (200):**
  - `{ data: [...], total, limit, offset }`

#### Possible Errors

| Status | Message              |
| ------ | -------------------- |
| 404    | Department not found |

---

### 11. Search Students by Name

| Method | Path                             | Auth Required         | Description             |
| ------ | -------------------------------- | --------------------- | ----------------------- |
| GET    | /api/students/search?name=string | Yes (DEPARTMENT_HEAD) | Search students by name |

#### Response Shape

- **Success (200):**
  - `{ data: [...], total }`

#### Possible Errors

| Status | Message                     |
| ------ | --------------------------- |
| 400    | Search name cannot be empty |

---

## Student Object Shape

```json
{
  "id": number,
  "name": "string",
  "age": number,
  "stage": number,
  "department_id": number,
  "created_at": "ISODate",
  "updated_at": "ISODate",
  "department": {
    "id": number,
    "name": "string",
    "name_ar": "string | null"
  }
}
```

---

## Notes

- Some endpoints require DEPARTMENT_HEAD role.
- Errors are returned as JSON: `{ "message": string }` with appropriate status code.
- Passwords are never returned in responses.
- Enums (for roles):
  - `ROOT`, `DEPARTMENT_HEAD`, `ADMIN`
