import { createSlice } from '@reduxjs/toolkit';

const studentSlice = createSlice({
  name: 'students',
  initialState: [],
  reducers: {
    addStudent: (state, action) => {
      // Validate for duplicate ID before pushing
      const existingStudent = state.find(student => 
        student.id === action.payload.id
      );
      
      if (!existingStudent) {
        state.push(action.payload);
      } else {
        // In a real app, you might want to retry with a new ID
        console.warn('Student with this ID already exists!');
        // Fallback: add with a slightly different ID
        action.payload.id = action.payload.id + 1;
        state.push(action.payload);
      }
    },
    removeStudent: (state, action) => {
      return state.filter(student => student.id !== action.payload);
    },
    updateStudent: (state, action) => {
      const index = state.findIndex(student => 
        student.id === action.payload.id
      );
      
      if (index !== -1) {
        state[index] = action.payload;
      }
    }
  }
});

export const { addStudent, removeStudent, updateStudent } = studentSlice.actions;
export default studentSlice.reducer;