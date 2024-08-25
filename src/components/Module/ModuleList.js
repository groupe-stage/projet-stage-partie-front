import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Row, Col, Table, Card, CardTitle, CardBody, Button, ButtonGroup } from 'reactstrap';
import { FaEdit, FaTrashAlt, FaPlus } from 'react-icons/fa';
import './ModuleList.css'; // Ensure to include your CSS file
import { Link } from 'react-router-dom';

const ModuleList = () => {
  const [modules, setModules] = useState([]);
  const [niveaux, setNiveaux] = useState([]);

  useEffect(() => {
    // Fetch all modules
    axios.get('http://127.0.0.1:8000/module/displayall/')
      .then(response => {
        setModules(response.data);
      })
      .catch(error => {
        console.error("Il y a eu une erreur lors de la récupération des modules!", error);
      });

    // Fetch all niveaux
    axios.get('http://127.0.0.1:8000/Niveau/displayallNiveaux/')
      .then(response => {
        setNiveaux(response.data);
      })
      .catch(error => {
        console.error("Il y a eu une erreur lors de la récupération des niveaux!", error);
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

  // Function to get the libelleNiv based on id_niveau
  const getLibelleNiv = (id) => {
    const niveau = niveaux.find(niveau => niveau.id_niveau === id);
    return niveau ? niveau.libelleNiv : 'Inconnu';
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
                  <th>Nom du module</th>
                  <th>Durée du module (en heure)</th>
                  <th>Niveau</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {modules.map(module => (
                  <tr key={module.id_module}>
                    <td>{module.nom_module}</td>
                    <td>{module.duree_module}</td>
                    <td>{getLibelleNiv(module.id_niveau)}</td>
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
