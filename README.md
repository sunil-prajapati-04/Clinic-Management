# Shree Salasar Balaji Clinic

Clinic management web application for Shree Salasar Balaji Clinic. The app helps clinic staff manage employees, patients, medicines, patient cases, prescriptions, and WhatsApp prescription delivery.

## Features

- Employee login with JWT authentication
- Protected dashboard routes
- Add employees with role, degree, email, phone, and password
- Add medicines and search medicines by name
- Add patients with disease/case details and prescription medicines
- Search patients by phone number
- View all patients with expandable case history
- Edit/delete patient profiles
- Edit/delete individual patient cases
- Generate prescription PDFs in the backend
- Upload generated prescription PDFs to Cloudinary
- Send prescription PDFs through Twilio WhatsApp
- Cache medicine search results with Redis
- Queue prescription sending jobs with BullMQ

## Tech Stack

**Frontend**

- React 19
- Vite
- React Router
- Zustand
- Axios
- Tailwind CSS
- HeroUI
- Lucide React icons
- React Hot Toast

**Backend**

- Node.js
- Express 5
- MongoDB with Mongoose
- JWT authentication
- bcrypt password hashing
- Redis / ioredis
- BullMQ
- Puppeteer
- Cloudinary
- Twilio WhatsApp API

## Project Structure

```txt
SBC/
  backend/
    src/
      background/       BullMQ queue and worker
      controllers/      Route handlers
      lib/              JWT, Redis, prescription, medicine CSV import helpers
      middleware/       Auth, DB, Cloudinary config
      models/           Mongoose schemas
      routes/           Express routes
      uploads/          Medicine CSV dataset
      index.js          Express app entrypoint
    package.json

  frontend/
    src/
      assets/           Images and static app assets
      components/       Shared UI components
      lib/              Axios instance
      pages/            Route pages
      store/            Zustand stores
      App.jsx           App routes
      main.jsx          React entrypoint
    package.json
```

## Prerequisites

- Node.js
- npm
- MongoDB database
- Redis server
- Cloudinary account
- Twilio account with WhatsApp sandbox or approved WhatsApp sender

## Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside `backend/`:

```env
PORT=8080
MONGODBURL=your_mongodb_connection_string
SCERECTKEY=your_jwt_secret

REDIS_HOST=127.0.0.1
REDIS_PORT=6379

CLOUDNAME=your_cloudinary_cloud_name
CLOUDKEY=your_cloudinary_api_key
CLOUDSEC=your_cloudinary_api_secret

TWILIO_ACCSID=your_twilio_account_sid
TWILIO_TOKEN=your_twilio_auth_token
```

Start the backend API:

```bash
npm run dev
```

Start the prescription worker in a second terminal:

```bash
npm run worker
```

The API runs on:

```txt
http://localhost:8080/sbc
```

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend runs on:

```txt
http://localhost:5173
```

The frontend Axios base URL is currently set in:

```txt
frontend/src/lib/axios.js
```

```js
baseURL: "http://localhost:8080/sbc/"
```

## Available Scripts

Backend:

```bash
npm run dev      # Start Express with nodemon
npm run worker   # Start BullMQ prescription worker
npm run build    # Runs src/index.js
```

Frontend:

```bash
npm run dev      # Start Vite dev server
npm run build    # Build production frontend
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## API Routes

All backend routes are prefixed with `/sbc`.

### Auth

```txt
POST /auth/login
GET  /auth/profile
POST /auth/logout
```

### Admin / Employee

```txt
POST /admin/add
```

### Patient

```txt
POST /patient/add
GET  /patient/get
GET  /patient/search?phone=9999999999
PUT  /patient/updatePatient/:id
POST /patient/delete/:id
PUT  /patient/updateCase/:patientId/:caseId
POST /patient/deleteCase/:patientId/:caseId
```

### Medicine

```txt
POST /medicine/add
GET  /medicine/search?med=paracetamol
```

## Data Models

### Employee

Stores clinic staff accounts with email, hashed password, role, degree, phone number, and status.

Roles currently supported by the backend enum:

```txt
doctor
nurse
compounder
reciptionist
```

### Patient

Stores patient name, phone number, doctor name, and an array of cases. Each case has a disease and prescription list.

### Medicine

Stores medicine name, salt/composition, brand/manufacturer, uses, and `searchName` for lookup.

## Prescription Flow

1. A staff user adds a patient case from the frontend.
2. Backend stores the patient/case in MongoDB.
3. Backend adds a BullMQ job named `sendingPresciption`.
4. Worker receives the job.
5. Puppeteer generates a prescription PDF.
6. Cloudinary uploads the PDF.
7. Twilio sends the PDF to the patient's WhatsApp number.

Keep Redis and the worker running for prescription delivery.

## Medicine CSV Import

The backend includes:

```txt
backend/src/uploads/med.csv
backend/src/lib/med.js
```

`med.js` reads the CSV and inserts medicine records into MongoDB. Run it only when you want to seed/import the medicine dataset, because it inserts all parsed rows.

```bash
cd backend
node src/lib/med.js
```

## Local Development Notes

- Backend CORS currently allows `http://localhost:5173`.
- Auth uses an `sbcToken` cookie and `withCredentials: true` on the frontend.
- The login cookie is configured with `secure: true`, so plain HTTP localhost browsers may not store it. For local HTTP development, use HTTPS locally or adjust the cookie config for development.
- `SCERECTKEY` is intentionally spelled that way in the current backend code, so the `.env` key must match it.
- Some model/file names contain spelling mistakes such as `paitent` and `empolyee`; keep imports consistent unless you refactor all references together.
- `node_modules/` and `dist/` are generated folders and usually should not be committed to source control.

## Build Check

Frontend production build:

```bash
cd frontend
npm run build
```

Backend starts from:

```bash
cd backend
npm run dev
```

Worker starts from:

```bash
cd backend
npm run worker
```
