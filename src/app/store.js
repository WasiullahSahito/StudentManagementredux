import { configureStore } from '@reduxjs/toolkit';
import studentReducer from '../features/studentSlice';

// Load initial state from localStorage
const persistedState = localStorage.getItem('students') 
  ? JSON.parse(localStorage.getItem('students'))
  : [];

export const store = configureStore({
  reducer: {
    students: studentReducer
  },
  preloadedState: {
    students: persistedState
  }
});

// Subscribe to store changes to save to localStorage
store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem('students', JSON.stringify(state.students));
});