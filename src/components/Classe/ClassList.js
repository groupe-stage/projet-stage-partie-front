import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Row, Col, Table, Card, CardTitle, CardBody, Button, ButtonGroup, Input, FormGroup } from 'reactstrap';
import { FaEdit, FaTrashAlt, FaPlus, FaSortAlphaDown, FaSortAlphaUp } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './ClassList.css'; // Ensure to include your CSS file

const ClassList = () => {
  const [classes, setClasses] = useState([]);
  const [nivData, setNivData] = useState([]);
  const [filteredClasses, setFilteredClasses] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState('');
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' or 'desc'
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch classes
    axios.get('http://127.0.0.1:8000/Classe/classe_list/')
      .then(response => {
        setClasses(response.data);
      })
      .catch(error => {
        console.error("Il y a eu une erreur!", error);
      });
    
    // Fetch niveau data
    axios.get('http://127.0.0.1:8000/Niveau/niveau_list/') // Update the URL to your API endpoint
      .then(response => {
        setNivData(response.data);
      })
      .catch(error => {
        console.error("Il y a eu une erreur avec les niveaux!", error);
      });
  }, []);

  useEffect(() => {
    const filtered = classes.filter(cls => {
      const niveau = getNiveauAndSpecialite(cls.id_niveau);
      const searchPattern = searchQuery.toLowerCase();

      // Extract niveau and classe from the search query
      const searchNiveau = searchPattern.match(/^\D+/); // Match non-digit characters for niveau
      const searchClasse = searchPattern.match(/\d+$/); // Match trailing digits for classe

      // Check if searchPattern matches either niveau or classe
      const combinedNiveauClasse = `${niveau} ${cls.libelleClasse}`.toLowerCase();

      // Check if searchNiveau and searchClasse are present
      const niveauMatch = searchNiveau ? combinedNiveauClasse.includes(searchNiveau[0]) : true;
      const classeMatch = searchClasse ? cls.libelleClasse.includes(searchClasse[0]) : true;

      return niveauMatch && classeMatch;
    });

    const sorted = filtered.sort((a, b) => {
      if (sortField) {
        if (a[sortField] < b[sortField]) return sortOrder === 'asc' ? -1 : 1;
        if (a[sortField] > b[sortField]) return sortOrder === 'asc' ? 1 : -1;
      }
      return 0;
    });

    setFilteredClasses(sorted);
  }, [searchQuery, sortField, sortOrder, classes]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSort = (field) => {
    const newOrder = (sortField === field && sortOrder === 'asc') ? 'desc' : 'asc';
    setSortField(field);
    setSortOrder(newOrder);
  };

  const handleDelete = (id) => {
    navigate(`/deleteClass/${id}`);
  };

  const handleEdit = (id) => { 
    navigate(`/class-update/${id}`);
  };

  const handleAdd = () => {
    navigate('/createClass');
  };

  // Function to get the niveau and specialite from nivData based on id_niveau
  const getNiveauAndSpecialite = (idNiveau) => {
    const niveau = nivData.find(n => n.id_niveau === idNiveau);
    return niveau ? `${niveau.libelleNiv || ''} ${niveau.specialite || ''}` : 'N/A';
  };

  return (
    <Row>
      <Col lg="12">
        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            <i className="bi bi-card-text me-2"> </i>
            Liste des Classes
          </CardTitle>
          <CardBody>
            <FormGroup className="mb-3">
              <Input
                type="text"
                placeholder="Rechercher par Niveau et Classe"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </FormGroup>
            <div className="mb-3">
              <Button color="secondary" onClick={() => handleSort('NbEtudiantClasse')}>
                Nombre d'Étudiants {sortField === 'NbEtudiantClasse' && (sortOrder === 'asc' ? <FaSortAlphaUp /> : <FaSortAlphaDown />)}
              </Button>
            </div>
            <Table className="modern-table" responsive>
              <thead>
                <tr>
                  <th>ID Classe</th>
                  <th>Niveau</th>
                  <th>Classe</th>
                  <th>Nombre d'Étudiants</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredClasses.map(cls => (
                  <tr key={cls.id_classe}>
                    <td>{cls.id_classe}</td>
                    <td>{getNiveauAndSpecialite(cls.id_niveau)}</td>
                    <td>{cls.libelleClasse}</td>
                    <td>{cls.NbEtudiantClasse}</td>
                    <td>
                      <ButtonGroup>
                        <Button color="secondary" onClick={() => handleEdit(cls.id_classe)}>
                          <FaEdit />
                        </Button>
                        <Button color="dark" onClick={() => handleDelete(cls.id_classe)}>
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
                <FaPlus /> Ajouter une classe
              </Button>
            </div>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default ClassList;
