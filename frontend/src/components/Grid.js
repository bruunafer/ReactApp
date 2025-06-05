import React, { useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import { API_URL } from "../config"; 

const Table = styled.table`
  width: 100%;
  background-color: #ffffff;
  padding: 20px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
  border-radius: 12px;
  margin: 20px auto;
  word-break: break-word;
`;

const Td = styled.td`
  padding-top: 15px;
  text-align: ${(props) => (props.alignCenter ? "center" : "start")};
  width: ${(props) => (props.width ? props.width : "auto")};

  svg {
    cursor: pointer;
  }

  .edit-icon {
    color: #7c3aed;
  }

  .delete-icon {
    color: #ef4444;
  }

  @media (max-width: 500px) {
    ${(props) => props.onlyWeb && "display: none"}
  }
`;

export const Thead = styled.thead``;
export const Tbody = styled.tbody``;

export const Tr = styled.tr`
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f2f6ff;
  }
`;

export const Th = styled.th`
  text-align: start;
  border-bottom: inset;
  padding-bottom: 5px;

  @media (max-width: 500px) {
    ${(props) => props.onlyWeb && "display: none"}
  }
`;

const Grid = ({ users, setUsers, setOnEdit }) => {
  useEffect(() => {
    axios
      .get(`${API_URL}/users`) 
      .then((res) => setUsers(res.data))
      .catch(() => toast.error("Error loading users"));
  }, [setUsers]);

  const handleEdit = (item) => {
    setOnEdit(item);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return;

    try {
      const { data } = await axios.delete(`${API_URL}/users/${id}`); 
      const newArray = users.filter((user) => user.id !== id);
      setUsers(newArray);
      toast.success(data.message || "User deleted successfully.");
      setOnEdit(null);
    } catch (error) {
      const message = error.response?.data?.error || "Error deleting user";
      toast.error(message);
    }
  };

  return (
    <Table>
      <Thead>
        <Tr>
          <Th>Name</Th>
          <Th>Gender</Th>
          <Th>Email</Th>
          <Th onlyWeb>Phone</Th>
          <Th></Th>
          <Th></Th>
        </Tr>
      </Thead>
      <Tbody>
        {users.map((item) => (
          <Tr key={item.id}>
            <Td width="20%">{item.name || ""}</Td>
            <Td width="10%">{item.gender || ""}</Td>
            <Td width="20%">{item.email || ""}</Td>
            <Td width="10%" onlyWeb>{item.phone || ""}</Td>
            <Td alignCenter width="5%">
              <FaEdit
                style={{
                  cursor: "pointer",
                  color: "#2c73d2",
                  transition: "color 0.2s",
                }}
                onMouseOver={(e) => (e.currentTarget.style.color = "#1a4e9c")}
                onMouseOut={(e) => (e.currentTarget.style.color = "#2c73d2")}
                onClick={() => handleEdit(item)}
              />
            </Td>
            <Td alignCenter width="5%">
              <FaTrash
                style={{
                  cursor: "pointer",
                  color: "#d63447",
                  transition: "color 0.2s",
                }}
                onMouseOver={(e) => (e.currentTarget.style.color = "#a31e2c")}
                onMouseOut={(e) => (e.currentTarget.style.color = "#d63447")}
                onClick={() => handleDelete(item.id)}
              />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default Grid;
