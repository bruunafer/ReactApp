import React from "react";
import axios from "axios";
import styled from "styled-components";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";

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
  const handleEdit = (item) => {
    setOnEdit(item);
  };

  const handleDelete = async (id) => {
  const confirmDelete = window.confirm("Tem certeza que deseja excluir este usuário?");
  if (!confirmDelete) return;

  try {
    const { data } = await axios.delete(`http://localhost:3001/users/${id}`);
    const newArray = users.filter((user) => user.id !== id);
    setUsers(newArray);
    toast.success(data);
    setOnEdit(null);
  } catch (error) {
    const message = error.response?.data || "Erro ao deletar usuário";
    toast.error(message);
  }
};

  return (
    <Table>
      <Thead>
        <Tr>
          <Th>Nome</Th>
          <Th>Sexo</Th>
          <Th>Email</Th>
          <Th onlyWeb>Fone</Th>
          <Th></Th>
          <Th></Th>
        </Tr>
      </Thead>
      <Tbody>
        {users.map((item) => (
          <Tr key={item.id}>
            <Td width="20%">{item.nome || ""}</Td>
            <Td width="10%">{item.sexo || ""}</Td>
            <Td width="20%">{item.email || ""}</Td>
            <Td width="10%" onlyWeb>{item.fone || ""}</Td>
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
