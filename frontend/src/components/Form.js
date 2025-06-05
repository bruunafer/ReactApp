import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { toast } from "react-toastify";
import { API_URL } from "../config"; 
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

const FormContainer = styled.form`
  display: flex;
  align-items: flex-end;
  gap: 10px;
  flex-wrap: wrap;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: ${(props) => props.large ? "150px" : "120px"};
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  height: 40px;
`;

const Label = styled.label``;

const Button = styled.button`
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #2c73d2;
  color: white;
  height: 42px;
`;

const formatDate = (date) => dayjs.utc(date).local().format("DD/MM/YYYY HH:mm");

const Form = ({ getUsers, onEdit, setOnEdit }) => {
  const ref = useRef();

  useEffect(() => {
    if (onEdit) {
      const user = ref.current;
      user.name.value = onEdit.name;
      user.cpf.value = onEdit.cpf;
      user.gender.value = onEdit.gender;
      user.birthDate.value = dayjs(onEdit.birth_date || onEdit.birthDate).format('YYYY-MM-DD');
      user.email.value = onEdit.email;
      user.phone.value = onEdit.phone;
      user.address.value = onEdit.address;
    }
  }, [onEdit]);

  const handleSubmit = async (e) => {
  e.preventDefault();
  const user = ref.current;

  if (
    !user.name.value || !user.cpf.value || !user.gender.value ||
    !user.birthDate.value || !user.email.value ||
    !user.phone.value || !user.address.value
  ) {
    return toast.warn("Please fill in all fields!");
  }

  const payload = {
    name: user.name.value,
    cpf: user.cpf.value,
    gender: user.gender.value,
    birthDate: user.birthDate.value,
    email: user.email.value,
    phone: user.phone.value,
    address: user.address.value,
  };

  try {
    if (onEdit) {
      const { data } = await axios.put(`${API_URL}/users/${onEdit.id}`, payload);
      toast.success(data.message || "User updated successfully.");
      setOnEdit(data.updatedUser || data.user || { ...payload, id: onEdit.id, updatedAt: new Date() });
      await getUsers();
  }
    else {
      const { data } = await axios.post(`${API_URL}/users`, payload);
      toast.success(data.message || "User created successfully.");
      await getUsers();
    }
  } catch (err) {
    toast.error(err.response?.data?.error || "Error saving user.");
  }

  user.name.value = "";
  user.cpf.value = "";
  user.gender.value = "";
  user.birthDate.value = "";
  user.email.value = "";
  user.phone.value = "";
  user.address.value = "";
};


  return (
    <FormContainer ref={ref} onSubmit={handleSubmit}>
      <InputArea><Label>Name</Label><Input name="name" /></InputArea>
      <InputArea><Label>CPF</Label><Input name="cpf" /></InputArea>
      <InputArea><Label>Gender</Label><Input name="gender" /></InputArea>
      <InputArea><Label>Birth Date</Label><Input name="birthDate" type="date" large /></InputArea>
      <InputArea><Label>Email</Label><Input name="email" type="email" /></InputArea>
      <InputArea><Label>Phone</Label><Input name="phone" /></InputArea>
      <InputArea><Label>Address</Label><Input name="address" /></InputArea>

      {onEdit && (
        <div style={{ width: "100%", marginTop: "10px", color: "#555" }}>
          <p><strong>Created at:</strong> {formatDate(onEdit.createdAt)}</p>
          <p><strong>Updated at:</strong> {formatDate(onEdit.updatedAt)}</p>
        </div>
      )}

      <Button type="submit">SAVE</Button>
    </FormContainer>
  );
};

export default Form;
