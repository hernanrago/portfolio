# Portfolio

A portfolio management application built with Node.js and Express for tracking investments and financial instruments.

## Features

- Investment tracking and management
- Financial instrument management
- Broker and destination management
- Web-based interface with EJS templating

## Prerequisites

- Node.js (version 14 or higher)
- npm

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

## Usage

### Development
```bash
npm run dev
```

### Production
```bash
npm start
```

The application will be available at `http://localhost:3000`

## Project Structure

- `app.js` - Main application file
- `routes/` - Express route handlers
- `models/` - Data models (Broker, Destination, Instrument, Investment)
- `views/` - EJS templates
- `public/` - Static assets (CSS, images, JavaScript)

## Routes

- `/` - Home page
- `/investments` - Investment management
- `/instruments` - Financial instrument management
- `/users` - User management

## Dependencies

- Express.js - Web framework
- EJS - Template engine
- Morgan - HTTP request logger
- Cookie Parser - Cookie parsing middleware