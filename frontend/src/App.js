import React, { useState, useEffect } from "react";
import GlobalStyle from "./styles/global";
import Form from "./components/Form";
import Grid from "./components/Grid";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
import { API_URL } from './config';

const Container = styled.div`
  max-width: 1120px;
  margin: 40px auto;
  padding: 0 20px;
`;

const Title = styled.h1`
  margin-bottom: 20px;
  text-align: center;
  color: rgb(53, 45, 206);
  font-size: 2.2rem;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s;

  &:focus {
    border-color: #2c73d2;
    outline: none;
  }
`;

function App() {
  const [users, setUsers] = useState([]);
  const [onEdit, setOnEdit] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const getUsers = async () => {
  try {
    const res = await fetch(`${API_URL}/users`);

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();

    if (!Array.isArray(data)) {
      throw new Error("Expected an array from API");
    }

    const sortedData = data.sort((a, b) =>
      a.name.localeCompare(b.name)
    );

    setUsers(sortedData);
  } catch (error) {
    console.error("Error fetching users:", error.message);
  }
};


  useEffect(() => {
    getUsers();
  }, []);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <GlobalStyle />
      <Container>
        <Title>USERS</Title>

        <SearchInput
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <Form onEdit={onEdit} setOnEdit={setOnEdit} getUsers={getUsers} />
        <Grid setOnEdit={setOnEdit} users={filteredUsers} setUsers={setUsers} />
      </Container>
      <ToastContainer autoClose={3000} position="bottom-left" />
    </>
  );
}

export default App;