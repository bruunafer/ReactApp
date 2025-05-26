import axios from "axios";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";
import { API_URL } from "../config"; //importa o endpoint correto

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
  width: 120px;
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


const Form = ({ getUsers, onEdit, setOnEdit }) => {
  const ref = useRef();

  useEffect(() => {
    if (onEdit) {
      const user = ref.current;
      user.nome.value = onEdit.nome;
      user.cpf.value = onEdit.cpf;
      user.sexo.value = onEdit.sexo;
      user.data_nascimento.value = onEdit.data_nascimento;
      user.email.value = onEdit.email;
      user.fone.value = onEdit.fone;
      user.endereco.value = onEdit.endereco;
    }
  }, [onEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = ref.current;

    if (
      !user.nome.value || !user.cpf.value || !user.sexo.value ||
      !user.data_nascimento.value || !user.email.value ||
      !user.fone.value || !user.endereco.value
    ) {
      return toast.warn("Preencha todos os campos!");
    }

    const payload = {
      nome: user.nome.value,
      cpf: user.cpf.value,
      sexo: user.sexo.value,
      data_nascimento: user.data_nascimento.value,
      email: user.email.value,
      fone: user.fone.value,
      endereco: user.endereco.value,
    };

    try {
      if (onEdit) {
        const { data } = await axios.put(`${API_URL}/users/${onEdit.id}`, payload);
        toast.success(data);
      } else {
        const { data } = await axios.post(`${API_URL}/users`, payload);
        toast.success(data);
      }
    } catch (err) {
      toast.error(err.response?.data || "Erro ao salvar");
    }

    user.nome.value = "";
    user.cpf.value = "";
    user.sexo.value = "";
    user.data_nascimento.value = "";
    user.email.value = "";
    user.fone.value = "";
    user.endereco.value = "";

    setOnEdit(null);
    getUsers();
  };

  return (
    <FormContainer ref={ref} onSubmit={handleSubmit}>
      <InputArea><Label>Nome</Label><Input name="nome" /></InputArea>
      <InputArea><Label>CPF</Label><Input name="cpf" /></InputArea>
      <InputArea><Label>Sexo</Label><Input name="sexo" /></InputArea>
      <InputArea><Label>Data de Nascimento</Label><Input name="data_nascimento" type="date" /></InputArea>
      <InputArea><Label>E-mail</Label><Input name="email" type="email" /></InputArea>
      <InputArea><Label>Telefone</Label><Input name="fone" /></InputArea>
      <InputArea><Label>Endereço</Label><Input name="endereco" /></InputArea>
      <Button type="submit">SALVAR</Button>
    </FormContainer>
  );
};

export default Form;
