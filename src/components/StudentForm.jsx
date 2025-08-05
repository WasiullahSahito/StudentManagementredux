import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FiUser, FiMail, FiCalendar, FiBook, FiSave, FiX } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { addStudent, updateStudent } from '../features/studentSlice';

const studentSchema = Yup.object({
    name: Yup.string()
        .min(3, 'Name must be at least 3 characters')
        .max(50, 'Name cannot exceed 50 characters')
        .required('Name is required'),
    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    age: Yup.number()
        .min(16, 'Age must be at least 16')
        .max(100, 'Age cannot exceed 100')
        .required('Age is required'),
    grade: Yup.string()
        .matches(/^[A-F][+-]?$/, 'Grade must be A-F with optional + or -')
        .required('Grade is required'),
});

const StudentForm = ({ editData, onCancel }) => {
    const dispatch = useDispatch();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const formik = useFormik({
        initialValues: {
            id: editData?.id || '',
            name: editData?.name || '',
            email: editData?.email || '',
            age: editData?.age || '',
            grade: editData?.grade || '',
        },
        enableReinitialize: true, // Allows form to update when editData changes
        validationSchema: studentSchema,
        onSubmit: (values) => {
            setIsSubmitting(true);

            setTimeout(() => { // Simulate API call
                if (editData) {
                    dispatch(updateStudent(values));
                } else {
                    // Generate new ID only when adding a new student
                    dispatch(addStudent({ ...values, id: Date.now() }));
                }

                formik.resetForm();
                setIsSubmitting(false);
                onCancel(); // Clear the editing state in App.jsx
            }, 400);
        },
    });

    useEffect(() => {
        if (editData) {
            formik.setValues(editData);
        } else {
            formik.resetForm();
        }
    }, [editData]);

    return (
        <div className="form-container">
            <h2>
                {editData ? 'Edit Student' : 'Add New Student'}
            </h2>
            <form onSubmit={formik.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Full Name</label>
                    <div className="input-wrapper">
                        <input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="John Doe"
                            {...formik.getFieldProps('name')}
                            className={formik.touched.name && formik.errors.name ? 'input-error' : ''}
                        />
                        <FiUser className="input-icon" />
                    </div>
                    {formik.touched.name && formik.errors.name && (
                        <div className="error">
                            <FiX size={14} /> {formik.errors.name}
                        </div>
                    )}
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <div className="input-wrapper">
                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="john@example.com"
                            {...formik.getFieldProps('email')}
                            className={formik.touched.email && formik.errors.email ? 'input-error' : ''}
                        />
                        <FiMail className="input-icon" />
                    </div>
                    {formik.touched.email && formik.errors.email && (
                        <div className="error">
                            <FiX size={14} /> {formik.errors.email}
                        </div>
                    )}
                </div>

                <div className="form-group">
                    <label htmlFor="age">Age</label>
                    <div className="input-wrapper">
                        <input
                            id="age"
                            name="age"
                            type="number"
                            placeholder="18"
                            {...formik.getFieldProps('age')}
                            className={formik.touched.age && formik.errors.age ? 'input-error' : ''}
                        />
                        <FiCalendar className="input-icon" />
                    </div>
                    {formik.touched.age && formik.errors.age && (
                        <div className="error">
                            <FiX size={14} /> {formik.errors.age}
                        </div>
                    )}
                </div>

                <div className="form-group">
                    <label htmlFor="grade">Grade</label>
                    <div className="input-wrapper">
                        <input
                            id="grade"
                            name="grade"
                            type="text"
                            placeholder="A+, B-, C, etc."
                            {...formik.getFieldProps('grade')}
                            className={formik.touched.grade && formik.errors.grade ? 'input-error' : ''}
                        />
                        <FiBook className="input-icon" />
                    </div>
                    {formik.touched.grade && formik.errors.grade && (
                        <div className="error">
                            <FiX size={14} /> {formik.errors.grade}
                        </div>
                    )}
                </div>

                <div className="button-group">
                    <button
                        type="submit"
                        className="submit-btn"
                        disabled={isSubmitting || !formik.isValid || !formik.dirty}
                    >
                        <FiSave size={18} />
                        {isSubmitting ? 'Processing...' : editData ? 'Update Student' : 'Add Student'}
                    </button>

                    {editData && (
                        <button
                            type="button"
                            className="cancel-btn"
                            onClick={onCancel}
                        >
                            <FiX size={18} />
                            Cancel Edit
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default StudentForm;