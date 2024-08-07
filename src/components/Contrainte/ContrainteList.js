import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Row, Col, Table, Card, CardTitle, CardBody, Button, ButtonGroup } from 'reactstrap';
import { FaEdit, FaTrashAlt, FaPlus } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import './ContrainteList.css';

const ContrainteList = () => {
  const [contraintes, setContraintes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8000/Contrainte/contraintes/')
      .then(response => {
        setContraintes(response.data);
      })
      .catch(error => {
        console.error("Il y a eu une erreur!", error);
      });
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/Contrainte/deleteContrainte/${id}/`);
      setContraintes(contraintes.filter(contrainte => contrainte.id_contrainte !== id));
      console.log(`Deleted contrainte with ID: ${id}`);
    } catch (error) {
      console.error('Error deleting contrainte:', error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/update-contrainte/${id}`);
  };

  const handleAdd = () => {
    navigate('/addContrainte');
  };

  return (
    <Row>
      <Col lg="12">
        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            <i className="bi bi-card-text me-2"> </i>
            Liste des Contraintes
          </CardTitle>
          <CardBody>
            <Table className="modern-table" responsive>
              <thead>
                <tr>
                  <th>Nom</th>
                  <th>Type</th>
                  <th>Date Début</th>
                  <th>Date Fin</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {contraintes.map(contrainte => (
                  <tr key={contrainte.id_contrainte}>
                    <td>{contrainte.nom_contrainte}</td>
                    <td>{contrainte.type_contrainte}</td>
                    <td>{contrainte.date_debut_contrainte}</td>
                    <td>{contrainte.date_fin_contrainte}</td>
                    <td>{contrainte.status_contrainte}</td>
                    <td>
                      <ButtonGroup>
                        <Link to={`/update-contrainte/${contrainte.id_contrainte}`}>
                          <Button color="secondary" onClick={() => handleEdit(contrainte.id_contrainte)}>
                            <FaEdit />
                          </Button>
                        </Link>
                        <Button color="dark" onClick={() => handleDelete(contrainte.id_contrainte)}>
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
                <FaPlus /> Ajouter une contrainte
              </Button>
            </div>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default ContrainteList;