# Full-Stack JS Engineer Test Assessment - Country Info App

This repository contains the Country Info App, which provides detailed information about countries, including their borders, population data, and flags. The application consists of a Backend (Nest.js) and a Frontend (Next.js).

## Project Overview

### Backend

**Tech Stack:**

- Node.js (Nest.js framework)

**Endpoints:**

1. **Get Available Countries:**

   - Fetches a list of available countries using the Date Nager API.
   - Endpoint: `GET /countries`

2. **Get Country Info:**
   - Retrieves detailed information about a specific country.
   - Includes:
     - List of border countries
     - Population data suitable for plotting on a chart
     - Flag URL
   - Endpoint: `GET /countries/:countryCode`

### Frontend

**Tech Stack:**

- React.js
- Next.js

**Pages:**

1. **Country List Page:**

   - Displays a list of countries fetched from the backend.
   - Each country name is clickable and navigates the user to the Country Info Page.

2. **Country Info Page:**
   - Displays detailed information about the selected country, including its name, flag, border countries, and population chart.

## Installation

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Git

### Setup Instructions

1. **Clone the Repository:**

```sh
git clone https://github.com/mmmihaeel/Full-Stack-JS-engineer-test-assessment-the-Country-Info-App.git
cd Full-Stack-JS-engineer-test-assessment-the-Country-Info-App
```

2. **Backend Setup:**

- Navigate to the backend directory:

```sh
cd backend
```

- Install dependencies:

```sh
npm install
```

- Check following environment variables in .env file in the backend directory:

```sh
PORT=3555
DATE_NAGER_API_BASE_URL=https://date.nager.at/api/v3
COUNTRIES_NOW_API_BASE_URL=https://countriesnow.space/api/v0.1
ALLOWED_ORIGIN=http://localhost:3000
```

- Start the backend server:

```sh
npm run start:dev
```

The backend will be running on http://localhost:3555.

3. **Frontend Setup:**

- Navigate to the frontend directory:

```sh
cd ../frontend
```

- Install dependencies:

```sh
npm install
```

- Check following environment variables in .env file in the frontend directory:

```sh
NEXT_PUBLIC_API_BASE_URL=http://localhost:3555
```

- Start the frontend server:

```sh
npm run dev
```

The frontend will be running on http://localhost:3000.

## Running the Application

1. Start the Backend:

- In the backend directory, run:

```sh
npm run start:dev
```

2. Start the Frontend:

- In the frontend directory, run:

```sh
npm run dev
```

3. Access the Application:

Open your web browser and navigate to http://localhost:3000.

## Conclusion

By following these instructions, you can set up, run, and test the Country Info App locally.
