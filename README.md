# College Club Management System

## Overview

A full-stack web application for managing college clubs, events, and student memberships.

## Features

* User Registration
* User Login with JWT Authentication
* Club Management
* Event Management
* Membership Requests
* Membership Approval System
* Role-Based Access Control
* MongoDB Database Integration

## Technologies Used

### Frontend

* HTML
* CSS
* JavaScript

### Backend

* Node.js
* Express.js

### Database

* MongoDB Atlas
* Mongoose

## Installation

```bash
npm install
copy .env.example .env
npm start
```

Update `.env` with your MongoDB Atlas connection string and JWT secret before starting the server.

## API Endpoints

### Authentication

* POST /api/auth/register
* POST /api/auth/login
* GET /api/auth/profile

### Clubs

* GET /api/clubs
* POST /api/clubs

### Events

* GET /api/events
* POST /api/events

### Memberships

* GET /api/memberships
* POST /api/memberships
* PUT /api/memberships/:id/approve

## Author

Bharath Chary
