# Music Review Platform - Frontend

Frontend application for a music discovery and review platform built with Angular.

## Demo Notice

This project is currently hosted using free-tier infrastructure.

Because the backend is deployed on Render's free tier, the application may experience a delay on the first request after a period of inactivity while the server starts back up.

You may notice:

* Slower initial page loads
* A delay when logging in
* A delay when performing the first search
* Faster response times after the server becomes active

This is due to the hosting environment and does not reflect the application's normal performance when running locally or on production infrastructure with dedicated resources.

Demo:

```
https://mmad-music-front.onrender.com/
```

---

## Overview

This frontend is the user-facing application for a music review platform. Users can discover music, create reviews, rate items, interact with other users, and manage their profiles.

The application communicates with a Spring Boot backend through REST APIs.

## Features

* User registration and login
* JWT authentication
* Music search
* Search filtering:

  * Artists
  * Albums
  * Songs
  * Users
* Browse music items
* Create reviews
* Star ratings
* Review likes
* User profiles
* Follow system
* Personalized review feed
* Responsive UI

## Tech Stack

* Angular
* TypeScript
* HTML
* CSS
* RxJS
* Angular Router
* REST API

## Running Locally

### Requirements

* Node.js
* npm
* Angular CLI

Check installed versions:

```bash
node -v
npm -v
ng version
```

### Installation

Clone the repository:

```bash
git clone <repository-url>
```

Navigate to the frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

### Environment Setup

Create/update:

```
src/environments/environment.ts
```

Example:

```typescript
export const environment = {
  production: false,
  apiUrl: "http://localhost:8080"
};
```

For production:

```
src/environments/environment.prod.ts
```

Example:

```typescript
export const environment = {
  production: true,
  apiUrl: "YOUR_BACKEND_URL"
};
```

## Development Server

Run:

```bash
ng serve
```

Application will be available at:

```
http://localhost:4200
```

## Production Build

Build the application:

```bash
ng build
```

The production files will be generated in:

```
dist/
```

## Project Structure

```
src/app
├── component
│   └── Reusable UI components
│
├── pages
│   └── Application views
│
├── service
│   └── API communication and business logic
│
├── core
│   └── Models, DTOs, utilities, shared logic
│
└── guards
    └── Route protection
```

## Authentication

Authentication uses JWT tokens.

After login, the backend returns a token which is stored locally and attached to authenticated API requests.

Protected routes require an authenticated session.



## Future Improvements

* Improved loading states
* More UI animations
* Better recommendation system
* More profile customization
* Additional testing
* CI/CD improvements

## License

This project is for educational and personal development purposes.
