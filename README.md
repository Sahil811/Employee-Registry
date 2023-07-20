# Employee Registry App

This is a CRUD application for managing employee records, built with React and Firebase.

## Features

- Add, edit, and delete employee records
- Search employees by name
- Sort employees by start date
- Responsive mobile-friendly design
- Uses Firebase for data storage
- User authentication and security rules
- Deployed on Firebase hosting

## Usage

### Install

```
npm install
```

### Run locally

```
npm start
```

App will be running on http://localhost:3000

### Deploy to Firebase

```
npm run build
firebase deploy
```

## Customizing

The main React components are located in `/src/components`:

- EmployeesPage - Displays a table of employees
- EmployeeForm - Form for adding/editing employees
- Navbar - Top navigation

Firebase config is located in `/src/firebase.js`

Stylesheets are in `/src/css/` and use plain CSS.

## License

This project is open source and available under the MIT License.
