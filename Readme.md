# Full-Stack JS Engineer Test Assessment - Country Info App

This repository contains the Country Info App, which provides detailed information about countries, including their borders, population data, and flags. The application consists of a Backend (Node.js with Nest.js or Express.js) and a Frontend (React with Next.js).

## Project Overview

### Backend

**Tech Stack:**

- Node.js (Nest.js or Express.js)

**Endpoints:**

1. **Get Available Countries:**

   - Fetches a list of available countries using the Date Nager API.
   - Endpoint: `GET /api/available-countries`

2. **Get Country Info:**
   - Retrieves detailed information about a specific country.
   - Includes:
     - List of border countries
     - Population data suitable for plotting on a chart
     - Flag URL
   - Endpoint: `GET /api/country-info/:countryCode`

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
