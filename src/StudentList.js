import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './StudentList.css';


function StudentList() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [grade, setGrade] = useState('');
  const [editingId, setEditingId] = useState(null);

  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get(API_URL);
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const saveStudent = async () => {
    try {
      const studentData = { name, age, grade };

      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, studentData);
        setEditingId(null);
      } else {
        await axios.post(API_URL, studentData);
      }

      setName('');
      setAge('');
      setGrade('');
      fetchStudents();
    } catch (error) {
      console.error("Error saving student:", error);
    }
  };

  const deleteStudent = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchStudents();
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  const editStudent = (student) => {
    setEditingId(student._id);
    setName(student.name);
    setAge(student.age);
    setGrade(student.grade);
  };

  return (
    <div className="student-list-container">

      <input 
        placeholder="Name" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
      />
      <input 
        placeholder="Age" 
        type="number"
        value={age} 
        onChange={(e) => setAge(e.target.value)} 
      />
      <input 
        placeholder="Grade" 
        value={grade} 
        onChange={(e) => setGrade(e.target.value)} 
      />
      <button onClick={saveStudent}>
        {editingId ? "Update Student" : "Add Student"}
      </button>

      {students.map(student => (
        <div key={student._id} className="student-card">
          <h3>{student.name}</h3>
          <p>Age: {student.age}</p>
          <p>Grade: {student.grade}</p>
          <div className="card-buttons">
            <button className="edit-btn" onClick={() => editStudent(student)}>Edit</button>
            <button className="delete-btn" onClick={() => deleteStudent(student._id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default StudentList;
