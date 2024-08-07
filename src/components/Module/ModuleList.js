import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Row, Col, Table, Card, CardTitle, CardBody, Button, ButtonGroup } from 'reactstrap';
import { FaEdit, FaTrashAlt, FaPlus } from 'react-icons/fa';
import './ModuleList.css'; // Ensure to include your CSS file
import { Link } from 'react-router-dom';

const ModuleList = () => {
  const [module, setModule] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/module/displayall/')
      .then(response => {
        setModule(response.data);
      })
      .catch(error => {
        console.error("Il y a eu une erreur!", error);
      });
  }, []);

  const handleDelete = (id) => {
    // Implement the delete functionality
    console.log(`Delete module with ID: ${id}`);
  };

  const handleEdit = (id) => {
    // Implement the edit functionality
    console.log(`Edit module with ID: ${id}`);
  };

  const handleAdd = () => {
    // Implement the add session functionality
    console.log('Add new module');
  };

  return (
    <Row>
      <Col lg="12">
        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            <i className="bi bi-card-text me-2"> </i>
            Liste des modules
          </CardTitle>
          <CardBody>
            <Table className="modern-table" responsive>
              <thead>
                <tr>
                 
                  <th>Nom d'un module</th>
                  <th>Duré du module (en heure)</th>
                  <th>Niveau</th>
                </tr>
              </thead>
              <tbody>
                {module.map(module => (
                  <tr key={module.id_module}>
            
                    <td>{module.nom_module}</td>
                    <td>{module.duree_module}</td>
                    <td>{module.id_niveau}</td>
                    <td>
                      <ButtonGroup>
                      <Link to={`/module-up/${module.id_module}`}>
                        <Button color="secondary" onClick={() => handleEdit(module.id_module)}>
                          <FaEdit />
                        </Button>
                        </Link>
                        <Link to={`/module-del/${module.id_module}`}>
                        <Button color="dark" onClick={() => handleDelete(module.id_module)}>
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
               
                <Link to="/addModule">
              <Button color="secondary" onClick={handleAdd}>
                <FaPlus /> Ajouter un module
              </Button>
              </Link>
            </div>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default ModuleList;
