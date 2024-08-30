import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Row, Col, Table, Card, CardTitle, CardBody, Button, ButtonGroup } from 'reactstrap';
import { FaTrashAlt, FaPlus } from 'react-icons/fa';
import './Salle_examenList.css'; // Ensure to include your CSS file
import { Link } from 'react-router-dom';

const Salle_examenList = () => {
  const [salle_examen, setSalle_examen] = useState([]);
  const [salles, setSalles] = useState([]);
  const [examens, setExamens] = useState([]);

  useEffect(() => {
    // Récupérer les données de Module_niveau
    axios.get('http://127.0.0.1:8000/Salle_examen/displayall/')
      .then(response => {
        setSalle_examen(response.data);
      })
      .catch(error => {
        console.error("Il y a eu une erreur!", error);
      });

    // Récupérer les données des modules
    const fetchSalles = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/salle/displayAllS');
        setSalles(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des salles:", error);
      }
    };

    // Récupérer les données des niveaux
    const fetchExamens = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/examen/displayall/');
        setExamens(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des examens:", error);
      }
    };

    fetchExamens();
    fetchSalles();
  }, []);

  // Fonction pour obtenir le nom du module par ID
  const getSalleNameById = (id) => {
    const salle = salles.find(salle => salle.id_salle === id);
    return salle ? salle.nom_salle : 'Inconnu';
  };

  // Fonction pour obtenir le nom du niveau par ID
  const getExamenNameById = (id) => {
    const examen = examens.find(examen => examen.id_examen === id);
    return examen ? examen.nom_examen : 'Inconnu';
  };

  // Fonction pour gérer la suppression
  const handleDelete = (id_module, id_niveau) => {
    console.log(`Supprimer l'affectation avec ID Module: ${id_module} et ID Niveau: ${id_niveau}`);
  };

  // Fonction pour ajouter une nouvelle affectation
  const handleAdd = () => {
    console.log('Ajouter une nouvelle affectation');
  };

  return (
    <Row>
      <Col lg="12">
        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            Liste des affectations des examens aux salles
          </CardTitle>
          <CardBody>
            <Table className="modern-table" responsive>
              <thead>
                <tr>
                  <th>Salle</th>
                  <th>Examen</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {salle_examen.map((item) => (
                  <tr key={`${item.id_salle}-${item.id_examen}`}>
                    <td>{getSalleNameById(item.id_salle)}</td>
                    <td>{getExamenNameById(item.id_examen)}</td>
                    <td>{item.date_salle}</td>
                    <td>
                      <ButtonGroup>
                        <Link to={`/Salle_examen-del/${item.id_salle}`}>
                          <Button color="dark" onClick={() => handleDelete(item.id_salle, item.id_examen)}>
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
              <Link to="/addSalle_examen">
                <Button color="secondary" onClick={handleAdd}>
                  <FaPlus /> Ajouter une affectation
                </Button>
              </Link>
            </div>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default Salle_examenList;
