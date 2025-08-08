# Task Manager Frontend

A React frontend for the Spring Boot Task Manager API.

## Features

- **Create Tasks**: Add new tasks with title and completion status
- **List Tasks**: View all tasks with their current status
- **Error Handling**: Proper error messages for failed API calls
- **Loading States**: Visual feedback during API operations
- **Form Validation**: Prevents submission of empty task titles
- **Responsive Design**: Clean, minimal UI that works on all devices

## Production-Ready Features

✅ **Form Validation**: Prevents empty title submissions  
✅ **Loading States**: Submit button disabled during requests  
✅ **Error Handling**: Displays backend errors to users  
✅ **Clean Architecture**: Separated API service layer  
✅ **State Management**: Proper useState and useEffect usage  
✅ **User Experience**: Clear loading and empty states  

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open http://localhost:5173 in your browser

## Backend Integration

This frontend expects a Spring Boot API running on `http://localhost:8080` with these endpoints:

- `GET /api/tasks` - Returns list of tasks (returns 400 with `{"errors": [{"message": "Empty Tasks!"}]}` when no tasks)
- `POST /api/tasks` - Creates a new task with JSON body `{"title": "...", "completed": boolean}`

## Production Improvements

If given more time, these improvements would make it even more production-ready:

- **Testing**: Unit tests with React Testing Library and Jest
- **TypeScript**: Better type safety and developer experience  
- **State Management**: Redux Toolkit for complex state scenarios
- **Performance**: React.memo, useMemo, and useCallback optimizations
- **Accessibility**: ARIA labels, keyboard navigation, screen reader support
- **Error Boundaries**: Catch and handle React component errors
- **Offline Support**: Service worker and caching strategies
- **Build Optimization**: Bundle analysis and code splitting
- **CI/CD**: Automated testing and deployment pipelines
- **Security**: Content Security Policy and input sanitization
- **Monitoring**: Error tracking and analytics integration