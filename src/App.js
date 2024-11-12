import React from 'react';
import StudentList from './StudentList';

function App() {
  return (
    <div>
      <h1 style={{ textAlign: 'center', fontSize: '32px', color: '#333', marginBottom: '20px' }}>
        Student Management System
      </h1>
      <StudentList />
    </div>
  );
}

export default App;
