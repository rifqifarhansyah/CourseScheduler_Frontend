import React, { useState } from 'react';
import {
  ChakraProvider,
  Container,
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useToast,
} from '@chakra-ui/react';

function SearchPage() {
  const [department, setDepartment] = useState('');
  const [faculty, setFaculty] = useState('');
  const [currentSemester, setCurrentSemester] = useState('');
  const [minSKS, setMinSKS] = useState('');
  const [maxSKS, setMaxSKS] = useState('');
  const [courses, setCourses] = useState([]);

  // Initialize the useToast hook
  const toast = useToast();

  const nilaiKonversi = {
    A: 4.0,
    AB: 3.5,
    B: 3.0,
    C: 2.0,
    D: 1.5,
    E: 1.0,
  };

  const getKonversiValue = (nilai) => {
    return nilaiKonversi[nilai] || 0;
  };

  const getPrediksiIndeks = (rataRataNilai) => {
    if (rataRataNilai >= 4.0) {
      return "A";
    } else if (rataRataNilai >= 3.5) {
      return "AB";
    } else if (rataRataNilai >= 3.0) {
      return "B";
    } else if (rataRataNilai >= 2.5) {
      return "BC";
    } else if (rataRataNilai >= 2.0) {
      return "C";
    } else if (rataRataNilai >= 1.5) {
      return "D";
    } else {
      return "E";
    }
  };

  // Calculate the total SKS and total predicted value based on selected courses
  const totalSKS = courses.reduce((total, course) => total + course.jumlahSks, 0);
  const totalPrediksiNilai = courses.reduce((total, course) => total + getKonversiValue(course.prediksiNilai), 0);

  const handleSearch = async () => {
    // Convert minSKS and maxSKS to integers
    const minSKSInt = parseInt(minSKS);
    const maxSKSInt = parseInt(maxSKS);
  
    // Check if minSKS is greater than maxSKS
    if (minSKSInt > maxSKSInt) {
      // Display a toast error message
      toast({
        title: 'Error',
        description: 'Minimum SKS cannot be greater than Maximum SKS.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }
  
    try {
      // Construct the API URL with the search parameters
      const apiUrl = `https://courseschedulerbackend-production.up.railway.app/api/searchCourses/${department}/${faculty}/${currentSemester}/${minSKS}/${maxSKS}`;
  
      // Make an API call to the backend to search for courses using the GET method
      const response = await fetch(apiUrl, {
        method: 'GET',
      });
  
      // Check if the response status is ok
      if (!response.ok) {
        // If the response status is not ok, throw an error with the response status text
        throw new Error(response.statusText);
      }
  
      // Parse the JSON response
      const data = await response.json();
  
      // Check if the data is null
      if (data === null) {
        // Display a toast message to inform the user
        toast({
          title: 'Data not found',
          description: 'No courses found based on the search criteria.',
          status: 'info',
          duration: 5000,
          isClosable: true,
        });
        return;
      }
  
      // Display a toast success message to inform the user
      toast({
        title: 'Data fetched successfully',
        description: 'Courses data retrieved successfully from the server.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
  
      setCourses(data);
    } catch (error) {
      // If there's an error, log the error and handle it accordingly
      console.error('Error fetching data:', error);
  
      // Display a toast message to inform the user about the error
      toast({
        title: 'Error',
        description: 'Failed to fetch data. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <ChakraProvider>
      <Container maxW="md" mt={10}>
        <VStack spacing={4}>
          <FormControl>
            <FormLabel>Jurusan</FormLabel>
            <Input
              type="text"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              placeholder="Masukkan Jurusan"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Fakultas</FormLabel>
            <Input
              type="text"
              value={faculty}
              onChange={(e) => setFaculty(e.target.value)}
              placeholder="Masukkan Fakultas"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Semester Pengambilan Saat Ini</FormLabel>
            <Input
              type="number"
              value={currentSemester}
              onChange={(e) => setCurrentSemester(e.target.value)}
              placeholder="Masukkan Semester Saat Ini"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Batasan Minimal SKS yang Dapat Diambil</FormLabel>
            <Input
              type="number"
              value={minSKS}
              onChange={(e) => setMinSKS(e.target.value)}
              placeholder="Masukkan Batasan Minimal SKS"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Batasan Maksimal SKS yang Dapat Diambil</FormLabel>
            <Input
              type="number"
              value={maxSKS}
              onChange={(e) => setMaxSKS(e.target.value)}
              placeholder="Masukkan Batasan Maksimal SKS"
            />
          </FormControl>
          <Button colorScheme="blue" onClick={handleSearch}>
            Search
          </Button>
          {/* Display the list of courses in a table format */}
          {courses.length > 0 && (
            <>
            <Table variant="striped" colorScheme="teal">
                <Thead>
                <Tr>
                    <Th>No</Th>
                    <Th>Nama Mata Kuliah</Th>
                    <Th>Jurusan</Th>
                    <Th>Fakultas</Th>
                    <Th>Jumlah SKS</Th>
                    <Th>Semester Minimal</Th>
                    <Th>Prediksi Indeks</Th>
                </Tr>
                </Thead>
                <Tbody>
                {courses.map((course, index) => (
                    <Tr key={course.id}>
                    <Td>{index + 1}</Td> {/* Increment the index by 1 */}
                    <Td>{course.namaMk}</Td>
                    <Td>{course.jurusan}</Td>
                    <Td>{course.fakultas}</Td>
                    <Td>{course.jumlahSks}</Td>
                    <Td>{course.semesterMin}</Td>
                    <Td>{course.prediksiNilai}</Td>
                    </Tr>
                ))}
                </Tbody>
            </Table>
            <VStack>
                <p>Total SKS: {totalSKS}</p>
                <p>Prediksi Rata-Rata Nilai: {(totalPrediksiNilai / courses.length).toFixed(2)}</p>
                <p>Prediksi Indeks: {getPrediksiIndeks((totalPrediksiNilai/courses.length).toFixed(2))}</p>
              </VStack>
            </>
          
        )}
        </VStack>
      </Container>
    </ChakraProvider>
  );
}

export default SearchPage;
