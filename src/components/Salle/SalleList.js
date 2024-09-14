import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Row, Col, Table, Card, CardTitle, CardBody, Button, ButtonGroup } from 'reactstrap';
import { FaEdit, FaTrashAlt, FaPlus } from 'react-icons/fa';
import './SalleList.css'; // Ensure to include your CSS file
import { Link } from 'react-router-dom';

const SalleList = () => {
  const [salles, setSalles] = useState([]);
  const [blocs, setBlocs] = useState([]);

  useEffect(() => {
    const fetchSalles = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/salle/displayAllS');
        setSalles(response.data);
      } catch (error) {
        console.error("Il y a eu une erreur!", error);
      }
    };

    const fetchBlocs = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/bloc/displayAllBlocs');
        setBlocs(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des blocs:", error);
      }
    };

   
    

    fetchSalles();
    fetchBlocs();
  }, []);

  const handleDelete = (id) => {
    // Implement the delete functionality
    console.log(`Delete salle with ID: ${id}`);
  };

  const handleEdit = (id) => {
    // Implement the edit functionality
    console.log(`Edit salle with ID: ${id}`);
  };

  const handleAdd = () => {
    // Implement the add salle functionality
    console.log('Add new salle');
  };

  // Function to get bloc name by ID
  const getBlocNameById = (id) => {
    const bloc = blocs.find(bloc => bloc.id_bloc === id);
    return bloc ? bloc.nom_bloc : 'Unknown';
  };

 
  return (
    <Row>
      <Col lg="12">
        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            <i className="bi bi-card-text me-2"> </i>
            Liste des salles 
          </CardTitle>
          <CardBody>
            <Table className="modern-table" responsive>
              <thead>
                <tr>
                  <th>Nom de la Salle</th>
                  <th>Capacité</th>
                  <th>Disponibilité</th>
                  <th>Bloc</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {salles.map(salle => (
                  <tr key={salle.id_salle}>
                    <td>{salle.nom_salle}</td>
                    <td>{salle.capacite}</td>
                    <td>{salle.dispo ? 'Oui' : 'Non'}</td>
                    <td>{getBlocNameById(salle.id_bloc)}</td>
                    <td>
                      <ButtonGroup>
                        <Link to={`/salle-up/${salle.id_salle}`}>
                          <Button color="secondary" onClick={() => handleEdit(salle.id_salle)}>
                            <FaEdit />
                          </Button>
                        </Link>
                        <Link to={`/salle-del/${salle.id_salle}`}>
                          <Button color="dark" onClick={() => handleDelete(salle.id_salle)}>
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
              <Link to="/addSalle">
                <Button color="secondary" onClick={handleAdd}>
                  <FaPlus /> Ajouter une salle
                </Button>
              </Link>
            </div>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default SalleList;
