import React, { useState, useEffect } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, Button } from '@chakra-ui/react';


const ClientsTable = () => {
  const [clients, setClients] = useState([]);
  const [shouldUpdate, setShouldUpdate] = useState(false);

  useEffect(() => {
    fetch('/products')
      .then(response => response.json())
      .then(data => setClients(data));
  }, [shouldUpdate]);

  const handleEdit = (client) => {
    fetch('/products')
    .then(response => response.json())
    .then(data => setClients(data));
};

  const handleDelete = (client) => {
    fetch(`/products/${client.id}`, { method: 'DELETE' })
      .then(response => response.json())
      .then(() => setShouldUpdate(!shouldUpdate));
  };

  
   

  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>Marca</Th>
          <Th>Modelo</Th>
          <Th>Capacidade</Th>
          <Th>Data de lancamento</Th>
          <Th>Alterar</Th>
          <Th>Excluir</Th>
        </Tr>
      </Thead>
      <Tbody>
        {clients.map(client => (
          <Tr key={client.id}>
            <Td>{client.marca}</Td>
            <Td>{client.modelo}</Td>
            <Td>{client.capacidade}</Td>
            <Td>{client.data_de_lancamento}</Td>
            <Td>
              <Button colorScheme="blue" onClick={() => handleEdit(client)}>
                Editar
              </Button>
            </Td>
            <Td>
              <Button colorScheme="red" onClick={() => handleDelete(client)}>
                Excluir
              </Button>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default ClientsTable;
