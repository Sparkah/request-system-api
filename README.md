# Request Management API

A simple Node.js + TypeScript API for managing anonymous user requests using PostgreSQL and TypeORM.

---

## Setup Instructions

### 1. Clone the project

```bash
git clone https://github.com/yourusername/request-system-api.git
cd request-system-api
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure PostgreSQL connection

You can either:

#### Option A: Use `.env`

Create a `.env` file in the root:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=yourpassword
DB_NAME=requests_system
```

Then update your `db.ts` file to use `process.env`.

#### Option B: Hardcode in `db.ts`

```ts
export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'yourpassword',
  database: 'requests_system',
  synchronize: true,
  entities: [RequestModel],
});
```

### 4. Start the app

```bash
npx ts-node src/server.ts
```

> Or use `npm run dev` if you’ve added a script for `ts-node-dev`.

---

## API Endpoints

Base URL: `http://localhost:3000/api`

---

### Create a request

**POST** `/api/create`

**Body:**
```json
{
  "theme": "Technical Issue",
  "description": "App crashes on login"
}
```

---

### Take a request into work

**POST** `/api/take`

**Body:**
```json
{
  "id": 1
}
```

---

### Complete a request

**POST** `/api/complete`

**Body:**
```json
{
  "id": 1,
  "solution": "Bug fixed in latest version"
}
```

---

### Cancel a request

**POST** `/api/cancel`

**Body:**
```json
{
  "id": 1,
  "reason": "Duplicate"
}
```

---

### Get list of requests

**GET** `/api/list`

Optional query parameters:

```
/api/list?dateStart=2025-05-01&dateEnd=2025-05-31
```

---

### Cancel all "in progress" requests

**POST** `/api/cancel-all`

No body required.

---

## Data Model (Entity)

```ts
RequestModel {
  id: number;
  theme: string;
  description: string;
  status: 'new' | 'in_progress' | 'completed' | 'canceled';
  solution: string;
  cancelReason: string;
  createdAt: Date;
}
```
