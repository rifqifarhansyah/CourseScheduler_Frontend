// DataPage.js
import React, { useState, useEffect } from 'react';
import { Button, useToast } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';


const DataPage = () => {
    const [data, setData] = useState([]);
    const toast = useToast(); // Instantiate the toast hook
  
    useEffect(() => {
      fetch('http://localhost:5001/api/getAllCourses')
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          console.log('Data fetched successfully:', data);
          setData(data);
        })
        .catch((error) => console.error('Error fetching data:', error));
    }, []);
  
    const handleRemove = (id) => {
      fetch(`http://localhost:5001/api/removeCourses/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Data removed successfully:', data);
          // Refresh the data after removal
          fetch('http://localhost:5001/api/getAllCourses')
            .then((response) => response.json())
            .then((data) => {
              setData(data);
  
              // Show toast when the courses are empty or all courses are deleted
              if (data.length === 0) {
                toast({
                  title: 'All courses have been deleted.',
                  status: 'success',
                  duration: 3000,
                  isClosable: true,
                });
              }
            })
            .catch((error) => console.error('Error fetching data:', error));
        })
        .catch((error) => console.error('Error removing data:', error));
    };
  
    return (
      <div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '1rem' }}>
          <strong>Nama Mata Kuliah</strong>
          <strong>Jurusan</strong>
          <strong>Fakultas</strong>
          <strong>Jumlah SKS</strong>
          <strong>Semester Minimal</strong>
          <strong>Prediksi Indeks</strong>
          <strong>Hapus Data</strong>
          {data.map((item) => (
            <React.Fragment key={item.id}>
              <div>{item.namaMk}</div>
              <div>{item.jurusan}</div>
              <div>{item.fakultas}</div>
              <div>{item.jumlahSks}</div>
              <div>{item.semesterMin}</div>
              <div>{item.prediksiNilai}</div>
              <Button colorScheme="red" onClick={() => handleRemove(item.id)}>
                <DeleteIcon />
              </Button>
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  };
  
  export default DataPage;
  