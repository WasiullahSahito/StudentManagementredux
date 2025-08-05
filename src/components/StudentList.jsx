import React from 'react';
import { FiEdit2, FiTrash2, FiUserPlus } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { removeStudent } from '../features/studentSlice';

const StudentList = ({ onEdit }) => {
    const dispatch = useDispatch();
    const students = useSelector(state => state.students);

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this student?')) {
            dispatch(removeStudent(id));
        }
    };

    if (students.length === 0) {
        return (
            <div className="student-list">
                <h2>Student Records</h2>
                <div className="empty-list">
                    <FiUserPlus size={48} className="empty-icon" />
                    <h3>No students found</h3>
                    <p>Add a new student to get started</p>
                </div>
            </div>
        );
    }

    return (
        <div className="student-list">
            <h2>Student Records</h2>
            <div className="table-responsive">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Age</th>
                            <th>Grade</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student) => (
                            <tr key={student.id}>
                                <td>{student.id}</td>
                                <td>{student.name}</td>
                                <td>{student.email}</td>
                                <td>{student.age}</td>
                                <td>
                                    <span className="grade-badge">{student.grade}</span>
                                </td>
                                <td className="actions">
                                    <button
                                        className="edit-btn"
                                        onClick={() => onEdit(student)}
                                        title="Edit"
                                    >
                                        <FiEdit2 size={16} />
                                    </button>
                                    <button
                                        className="delete-btn"
                                        onClick={() => handleDelete(student.id)}
                                        title="Delete"
                                    >
                                        <FiTrash2 size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default StudentList;