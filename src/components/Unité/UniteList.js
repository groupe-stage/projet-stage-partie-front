import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Row, Col, Table, Card, CardTitle, CardBody, Button, ButtonGroup } from 'reactstrap';
import { FaEdit, FaTrashAlt, FaPlus } from 'react-icons/fa';
import './UniteList.css';
import { Link, useNavigate } from 'react-router-dom';

const UniteList = () => {
  const [unites, setUnites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8000/unite/unites/')
      .then(response => {
        console.log(response.data);
        setUnites(response.data);
      })
      .catch(error => {
        console.error("Il y a eu une erreur!", error);
      });
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/unite/deleteUnite/${id}/`);
      setUnites(unites.filter(unite => unite.id_unite !== id));
      console.log(`Deleted unite with ID: ${id}`);
    } catch (error) {
      console.error('Error deleting unite:', error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/update-unite/${id}`);
  };

  const handleAdd = () => {
    navigate('/addUnite');
  };

  return (
    <Row>
      <Col lg="12">
        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            <i className="bi bi-card-text me-2"> </i>
            Liste des Unités
          </CardTitle>
          <CardBody>
            <Table className="modern-table" responsive>
              <thead>
                <tr>
                  
                  <th>Nom</th>
                  <th>Département</th> {/* Modifier le header */}
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {unites.map(unite => (
                  <tr key={unite.id_unite}>
                   
                    <td>{unite.nom_unite}</td>
                    <td>{unite.nom_departement}</td> {/* Afficher le nom du département */}
                    <td>
                      <ButtonGroup>
                        <Link to={`/update-unite/${unite.id_unite}`}>
                          <Button color="secondary" onClick={() => handleEdit(unite.id_unite)}>
                            <FaEdit />
                          </Button>
                        </Link>
                        <Button color="dark" onClick={() => handleDelete(unite.id_unite)}>
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
                <FaPlus /> Ajouter une unité
              </Button>
            </div>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default UniteList;