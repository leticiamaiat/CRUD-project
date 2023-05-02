import React, { useState } from 'react';
import { Button, FormControl, FormLabel, Input, VStack } from '@chakra-ui/react';

const AddProductForm = ({ onAdd }) => {
  const [formData, setFormData] = useState({
    marca: '',
    modelo: '',
    capacidade: '',
    data_de_lancamento: '',
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch('/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        setFormData({
          marca: '',
          modelo: '',
          capacidade: '',
          data_de_lancamento: '',
        });
        onAdd(data);
      });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <VStack spacing={4}>
        <FormControl id="marca">
          <FormLabel>Marca</FormLabel>
          <Input type="text" name="marca" value={formData.marca} onChange={handleInputChange} />
        </FormControl>
        <FormControl id="modelo">
          <FormLabel>Modelo</FormLabel>
          <Input type="text" name="modelo" value={formData.modelo} onChange={handleInputChange} />
        </FormControl>
        <FormControl id="capacidade">
          <FormLabel>Capacidade</FormLabel>
          <Input
            type="text"
            name="capacidade"
            value={formData.capacidade}
            onChange={handleInputChange}
          />
        </FormControl>
        <FormControl id="data_de_lancamento">
          <FormLabel>Data de lançamento</FormLabel>
          <Input
            type="date"
            name="data_de_lancamento"
            value={formData.data_de_lancamento}
            onChange={handleInputChange}
          />
        </FormControl>
        <Button type="submit" colorScheme="blue">
          Adicionar produto
        </Button>
      </VStack>
    </form>
  );
};

export default AddProductForm;
