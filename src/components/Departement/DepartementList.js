import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Row, Col, Table, Card, CardTitle, CardBody, Button, ButtonGroup } from 'reactstrap';
import { FaEdit, FaTrashAlt, FaPlus } from 'react-icons/fa';
import './DepartementList.css'; // Ensure to include your CSS file
import { Link, useNavigate } from 'react-router-dom';

const DepartementList = () => {
  const [departements, setDepartements] = useState([]);
  const navigate = useNavigate();


useEffect(() => {
  axios.get('http://localhost:8000/departement/departements/')
    .then(response => {
      console.log(response.data);
      setDepartements(response.data);
    })
    .catch(error => {
      console.error("Il y a eu une erreur!", error);
    });
}, []);

const handleDelete = async (id) => {
  try {
    await axios.delete(`http://localhost:8000/departement/deleteDep/${id}/`);
    setDepartements(departements.filter(departement => departement.id_departement !== id));
    console.log(`Deleted departement with ID: ${id}`);
  } catch (error) {
    console.error('Error deleting departement:', error);
  }
};

const handleEdit = (id) => {
  navigate(`/update-departement/${id}`);
};

  const handleAdd = () => {
    // Implement the add departement functionality
    console.log('Add new departement');
  };

  return (
    <Row>
      <Col lg="12">
        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            <i className="bi bi-card-text me-2"> </i>
            Liste des départements hana lina 
          </CardTitle>
          <CardBody>
            <Table className="modern-table" responsive>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nom</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {departements.map(departement => (
                  <tr key={departement.id_departement}>
                    <td>{departement.id_departement}</td>
                    <td>{departement.nom_departement}</td>
                    <td>
                      <ButtonGroup>
                      <Link to={`/update-departement/${departement.id_departement}`}>
                        <Button color="secondary" onClick={() => handleEdit(departement.id_departement)}>
                          <FaEdit />
                        </Button>
                        </Link>
                        <Button color="dark" onClick={() => handleDelete(departement.id_departement)}>
                          <FaTrashAlt />
                        </Button>
                      </ButtonGroup>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <div className="text-center mt-3">
              <Button color="secondary" onClick={handleAdd}>
                <FaPlus /> Ajouter un département
              </Button>
            </div>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default DepartementList;