import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { Row, Col, Card, CardTitle, CardBody, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';

const UpdateExamen = () => {
  const [examenData, setExamenData] = useState({
    nom_examen: '',
    date_examen: '',
    duree_examen: '',
    type_examen: '',
    id_session: '',
    id_module: '',
  });

  const [sessions, setSessions] = useState([]);
  const [modules, setModules] = useState([]);
  const [message, setMessage] = useState('');
  const { id_examen } = useParams();
  const navigate = useNavigate();  

  useEffect(() => {
    const fetchExamen = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/examen/updateExamen/${id_examen}/`);
        setExamenData(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des données examen:', error);
      }
    };

    const fetchSessions = async () => {
      try {
        const response = await axios.get('http://localhost:8000/session/displayall/'); // Adjust the URL according to your API
        setSessions(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des données sessions:', error);
      }
    };

    const fetchModules = async () => {
      try {
        const response = await axios.get('http://localhost:8000/module/displayall/'); // Adjust the URL according to your API
        setModules(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des données modules:', error);
      }
    };

    fetchExamen();
    fetchSessions();
    fetchModules();
  }, [id_examen]);

  const handleChange = (e) => {
    setExamenData({
      ...examenData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    for (const key in examenData) {
      formData.append(key, examenData[key]);
    }

    try {
      await axios.put(`http://localhost:8000/examen/updateExamen/${id_examen}/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage('Examen mis à jour avec succès!');
      navigate('/examen-list'); 
    } catch (error) {
      console.error('Erreur lors de la mise à jour des données examen:', error);
      setMessage("Échec de la mise à jour de l'examen.");
    }
  };

  return (
    <Row>
      <Col>
        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            <i className="bi bi-bell me-2"> </i>
            Mettre à jour l'examen
          </CardTitle>
          <CardBody>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label for="nom_examen">Nom d'examen</Label>
                <Input
                  id="nom_examen"
                  name="nom_examen"
                  value={examenData.nom_examen}
                  onChange={handleChange}
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label for="date_examen">Date</Label>
                <Input
                  id="date_examen"
                  name="date_examen"
                  type="date"
                  value={examenData.date_examen}
                  onChange={handleChange}
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label for="duree_examen">Durée (en heure)</Label>
                <Input
                  id="duree_examen"
                  name="duree_examen"
                  value={examenData.duree_examen}
                  onChange={handleChange}
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label for="type_examen">Type d'examen</Label>
                <Input
                  id="type_examen"
                  name="type_examen"
                  value={examenData.type_examen}
                  onChange={handleChange}
                  type="select"
                  required
                >
                  <option value="">Sélectionnez le type d'examen</option>
                  <option value="theorique">Théorique</option>
                  <option value="pratique">Pratique</option>
                </Input>
              </FormGroup>

              <FormGroup>
                <Label for="id_session">Session</Label>
                <Input
                  id="id_session"
                  name="id_session"
                  type="select"
                  value={examenData.id_session}
                  onChange={handleChange}
                  required
                >
                  <option value="">Sélectionnez une session</option>
                  {sessions.map((session) => (
                    <option key={session.id} value={session.id}>
                      {session.nom_session}
                    </option>
                  ))}
                </Input>
              </FormGroup>

              <FormGroup>
                <Label for="id_module">Module</Label>
                <Input
                  id="id_module"
                  name="id_module"
                  type="select"
                  value={examenData.id_module}
                  onChange={handleChange}
                  required
                >
                  <option value="">Sélectionnez un module</option>
                  {modules.map((module) => (
                    <option key={module.id} value={module.id}>
                      {module.nom_module}
                    </option>
                  ))}
                </Input>
              </FormGroup>

              <Button type="submit">Mettre à jour l'examen</Button>
            </Form>
          </CardBody>
        </Card>
        {message && <p>{message}</p>}
        <Link to="/examen-list">
          <Button color="secondary">Annuler</Button>
        </Link>
      </Col>
    </Row>
  );
};

export default UpdateExamen;
