# To-Do List App Frontend

A React-based frontend for a To-Do List application with cross-device synchronization capability.

## Features

- Add, view, update, and delete tasks
- Task completion tracking
- Automatic and manual synchronization across devices
- Real-time sync status indicators
- Clean, functional UI focused on usability

## Prerequisites

- Node.js (v14 or later)
- npm 
- Backend server running (see backend README)

## Installation

1. Clone the repository
2. Navigate to the frontend directory:
   ```bash
   cd todo-frontend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set up your environment variables by creating a `.env` file in the root directory:
   ```
   REACT_APP_API_URL=http://localhost:3001
   ```

## Running the Application

### Development Mode

```bash
npm start
```

This will start the development server and open the application in your default browser at [http://localhost:3000](http://localhost:3000).

### Production Build

```bash
npm run build
```

This creates an optimized production build in the `build` folder that you can serve with a static server.

## Project Structure

```
src/
├── components/             # React components
│   ├── TaskForm.jsx        # Form for adding new tasks
│   ├── TaskItem.jsx        # Individual task component
│   └── TaskList.jsx        # List of tasks
├── services/               # API services
│   └── TaskService.js      # Task API integration
├── App.js                  # Main application component
└── index.js                # Entry point
```

## Environment Variables

| Variable           | Description                    | Default               |
|--------------------|--------------------------------|-----------------------|
| REACT_APP_API_URL  | URL of the backend API server  | http://localhost:3001 |

## Understanding the Environment Variables

The `REACT_APP_API_URL` environment variable defines the base URL for all API calls to the backend. This configuration allows:

1. **Easy environment switching**: You can point to different backend environments (dev, staging, prod) by changing this single variable.

2. **Consistent API access**: The TaskService uses this variable to construct API endpoints:
   ```javascript
   const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';
   ```

3. **Deployment flexibility**: When deploying to production, you can set this variable to your production API URL without changing any code.

## Cross-device Synchronization

The application supports seamless synchronization across multiple devices:

1. **Automatic synchronization**: The app polls the backend every 60 seconds to fetch the latest tasks.
2. **Manual synchronization**: Users can manually trigger a sync by clicking the "Sync now" button.
3. **Visual feedback**: The sync status indicator shows whether tasks are:
   - Synced: All changes are saved and up to date
   - Syncing: Currently retrieving or sending updates
   - Error: A sync operation failed

