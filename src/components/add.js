import React, { useState } from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  Switch,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from '@chakra-ui/react';

const AddMkPage = () => {
    const toast = useToast();
    const [namaMk, setNamaMk] = useState('');
    const [jumlahSks, setJumlahSks] = useState('');
    const [jurusan, setJurusan] = useState('');
    const [fakultas, setFakultas] = useState('');
    const [semesterMin, setSemesterMin] = useState('');
    const [prediksiNilai, setPrediksiNilai] = useState('');
    const [useJsonFile, setUseJsonFile] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);

      // State to control the display of the JSON example modal
    const [isJsonExampleModalOpen, setIsJsonExampleModalOpen] = useState(false);

    // Function to toggle the JSON example modal
    const toggleJsonExampleModal = () => {
      setIsJsonExampleModalOpen(!isJsonExampleModalOpen);
    };
    const handleSubmit = () => {
        const courseData = {
          namaMk: namaMk,
          jurusan: jurusan,
          fakultas: fakultas,
          jumlahSks: parseInt(jumlahSks), // Convert to integer if needed
          semesterMin: parseInt(semesterMin), // Convert to integer if needed
          prediksiNilai: prediksiNilai,
        };
    
        // Make a POST request to your backend API
        fetch('https://courseschedulerbackend-production.up.railway.app/api/addCourses', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(courseData),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            // Clear the form after successful submission
            setNamaMk('');
            setJumlahSks('');
            setJurusan('');
            setFakultas('');
            setSemesterMin('');
            setPrediksiNilai('');
    
            // Show a success toast
            toast({
              title: data.message,
              status: 'success',
              duration: 3000,
              isClosable: true,
            });
          })
          .catch((error) => {
            console.error('Error adding course:', error);
    
            // Show an error toast
            toast({
              title: 'Error adding course.',
              description: 'An error occurred while adding the course.',
              status: 'error',
              duration: 3000,
              isClosable: true,
            });
          });
      };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleJsonImport = () => {
    if (!selectedFile) {
      toast({
        title: 'No file selected.',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
  
    const formData = new FormData();
    formData.append('file', selectedFile);
  
    fetch('https://courseschedulerbackend-production.up.railway.app/api/addDataJson', {
      method: 'POST',
      headers: {
        // Remove the 'Content-Type' header as it is automatically set for FormData
        // 'Content-Type': 'application/json',
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // Show a success toast
        toast({
          title: data.message,
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
  
        // Clear the form after successful submission
        setNamaMk('');
        setJumlahSks('');
        setJurusan('');
        setFakultas('');
        setSemesterMin('');
        setPrediksiNilai('');
      })
      .catch((error) => {
        console.error('Error adding course:', error);
        // Show an error toast
        toast({
          title: 'Error adding course.',
          description: 'An error occurred while adding the course.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      });
  };
  

  return (
    <Box p={4} maxWidth="500px" margin="0 auto">
    <Box display="flex" alignItems="center" justifyContent="center" mb={4}>
      <FormLabel htmlFor="useJsonFile" mb="0" mr={2}>
        Gunakan File JSON
      </FormLabel>
      <Switch
        id="useJsonFile"
        isChecked={useJsonFile}
        onChange={() => setUseJsonFile(!useJsonFile)}
      />
    </Box>

      {/* JSON example modal */}
      <Modal isOpen={isJsonExampleModalOpen} onClose={toggleJsonExampleModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Example JSON Data</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <pre>
              {`    {
        "namaMk": "Matematika Diskrit",
        "jumlahSks": 3,
        "jurusan": "Teknik Informatika",
        "fakultas": "STEI",
        "semesterMin": 3,
        "prediksiNilai": "A"
    }`}
            </pre>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={toggleJsonExampleModal}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {useJsonFile ? (
        <FormControl>
          <FormLabel>Choose File JSON</FormLabel>
          <Input type="file" accept=".json" onChange={handleFileSelect} />
          <Box mt={2}>
          <Button variant="ghost" onClick={toggleJsonExampleModal}>
            Show JSON Example
          </Button>
        </Box>
        {/* Wrap the "Add" button in a Box */}
        <Box mt={4}>
          <Button colorScheme="blue" onClick={handleJsonImport}>
            Add
          </Button>
        </Box>
        </FormControl>
      ) : (
        <>
          <FormControl id="nama-mk" mb={4}>
            <FormLabel>Nama Mata Kuliah</FormLabel>
            <Input
              type="text"
              value={namaMk}
              onChange={(e) => setNamaMk(e.target.value)}
              placeholder="Masukkan Nama Mata Kuliah"
            />
          </FormControl>

          <FormControl id="jumlah-sks" mb={4}>
            <FormLabel>Jumlah SKS</FormLabel>
            <Input
              type="number"
              value={jumlahSks}
              onChange={(e) => setJumlahSks(e.target.value)}
              placeholder="Masukkan Jumlah SKS"
            />
          </FormControl>

          <FormControl id="jurusan" mb={4}>
            <FormLabel>Jurusan</FormLabel>
            <Input
              type="text"
              value={jurusan}
              onChange={(e) => setJurusan(e.target.value)}
              placeholder="Masukkan Jurusan"
            />
          </FormControl>

          <FormControl id="fakultas" mb={4}>
            <FormLabel>Fakultas</FormLabel>
            <Input
              type="text"
              value={fakultas}
              onChange={(e) => setFakultas(e.target.value)}
              placeholder="Masukkan Fakultas"
            />
          </FormControl>

          <FormControl id="semester-min" mb={4}>
            <FormLabel>Semester minimal pengambilan</FormLabel>
            <Input
              type="number"
              value={semesterMin}
              onChange={(e) => setSemesterMin(e.target.value)}
              placeholder="Masukkan Semester Minimal"
            />
          </FormControl>

          <FormControl id="prediksi-nilai" mb={4}>
            <FormLabel>Prediksi nilai Mata Kuliah</FormLabel>
            <Select
              value={prediksiNilai}
              onChange={(e) => setPrediksiNilai(e.target.value)}
              placeholder="Pilih Prediksi Nilai Mata Kuliah"
            >
              <option value="A">A</option>
              <option value="AB">AB</option>
              <option value="B">B</option>
              <option value="BC">BC</option>
              <option value="C">C</option>
              <option value="D">D</option>
              <option value="E">E</option>
            </Select>
            <Button mt={4} colorScheme="blue" onClick={handleSubmit}>
                Add
            </Button>
          </FormControl>
        </>
      )}
    </Box>

  );
};

export default AddMkPage;
