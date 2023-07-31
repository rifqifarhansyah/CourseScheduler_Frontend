// App.js
import React from 'react';
import { ChakraProvider, Box, Heading, Tab, TabList, Tabs } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import SearchPage from './components/search'; // Ubah path ke './search'
import AddMkPage from './components/add'; // Ubah path ke './add'
import DataPage from './components/data'; // Import the data component

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Box p={4} textAlign="center">
          <Heading as="h1" size="xl">
            Course Scheduler
          </Heading>
          <Tabs mt={4} isFitted variant="enclosed">
            <TabList>
              <Link to="/">
                <Tab>SEARCH</Tab>
              </Link>
              <Link to="/add">
                <Tab>ADD</Tab>
              </Link>
              <Link to="/data"> {/* Add the link for the Data page */}
                <Tab>DATA</Tab>
              </Link>
            </TabList>
          </Tabs>
          <Routes>
            <Route path="/" element={<SearchPage />} />
            <Route path="/add" element={<AddMkPage />} />
            <Route path="/data" element={<DataPage />} /> {/* Add the route for the Data page */}
          </Routes>
        </Box>
      </Router>
    </ChakraProvider>
  );
}

export default App;
