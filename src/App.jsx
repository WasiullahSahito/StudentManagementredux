import React, { useState } from 'react';
import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';
import './App.css';

function App() {
  const [editingStudent, setEditingStudent] = useState(null);

  const cancelEdit = () => {
    setEditingStudent(null);
  };

  return (
    <div className="app-container">
      <div className="app-header">
        <h1 className="app-title">Student Management</h1>
        <div className="app-subtitle">Track and manage student records</div>
      </div>
      <div className="content-wrapper">
        <StudentForm
          editData={editingStudent}
          onCancel={cancelEdit}
        />
        <StudentList
          onEdit={setEditingStudent}
        />
      </div>
    </div>
  );
}

export default App;