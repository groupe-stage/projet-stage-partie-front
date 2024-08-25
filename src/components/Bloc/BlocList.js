import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Row, Col, Table, Card, CardTitle, CardBody, Button, ButtonGroup } from 'reactstrap';
import { FaEdit, FaTrashAlt, FaPlus } from 'react-icons/fa';
import './BlocList.css'; // Ensure to include your CSS file
import { Link } from 'react-router-dom';

const BlocList = () => {
  const [blocs, setBlocs] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/bloc/displayAllBlocs/')
      .then(response => {
        setBlocs(response.data);
      })
      .catch(error => {
        console.error("Il y a eu une erreur!", error);
      });
  }, []);

  const handleDelete = (id) => {
    // Implement the delete functionality
    console.log(`Delete bloc with ID: ${id}`);
  };

  const handleEdit = (id) => {
    // Implement the edit functionality
    console.log(`Edit bloc with ID: ${id}`);
  };

  const handleAdd = () => {
    // Implement the add bloc functionality
    console.log('Add new bloc');
  };

  return (
    <Row>
      <Col lg="12">
        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            <i className="bi bi-card-text me-2"> </i>
            Liste des blocs 
          </CardTitle>
          <CardBody>
            <Table className="modern-table" responsive>
              <thead>
                <tr>
                  <th>Nom</th>
                  <th>Nombre d'étages</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {blocs.map(bloc => (
                  <tr key={bloc.id_bloc}>
                    <td>{bloc.nom_bloc}</td>
                    <td>{bloc.nbretage}</td>
                    <td>
                      <ButtonGroup>
                        <Link to={`/bloc-up/${bloc.id_bloc}`}>
                          <Button color="secondary" onClick={() => handleEdit(bloc.id_bloc)}>
                            <FaEdit />
                          </Button>
                        </Link>
                        <Link to={`/bloc-del/${bloc.id_bloc}`}>
                          <Button color="dark" onClick={() => handleDelete(bloc.id_bloc)}>
                            <FaTrashAlt />
                          </Button>
                        </Link>
                      </ButtonGroup>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <div className="text-center mt-3">
              <Link to="/addBloc">
                <Button color="secondary" onClick={handleAdd}>
                  <FaPlus /> Ajouter un bloc
                </Button>
              </Link>
            </div>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default BlocList;
