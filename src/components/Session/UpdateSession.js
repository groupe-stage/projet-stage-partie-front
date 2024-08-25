import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Row, Col, Card, CardTitle, CardBody, Form, FormGroup, Label, Input, Button } from 'reactstrap';

// Utility function to get the CSRF token from cookies
function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

const UpdateSession = () => {
  const [sessionData, setSessionData] = useState({
    nom_session: '',
    type_session: '',
  });
  const [message, setMessage] = useState('');
  const { id_session } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSession = async () => {
      try {
        console.log(`Fetching session with ID: ${id_session}`);
        const response = await axios.get(`http://127.0.0.1:8000/session/updateSession/${id_session}/`);
        console.log('Session data fetched:', response.data);
        setSessionData(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des données session:', error);
      }
    };

    fetchSession();
  }, [id_session]);

  const handleChange = (e) => {
    setSessionData({
      ...sessionData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Retrieve CSRF token from cookies
    const csrftoken = getCookie('csrftoken');

    try {
      await axios.put(`http://127.0.0.1:8000/session/updateSession/${id_session}/`, sessionData, {
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrftoken,  // Include CSRF token in the headers
        },
      });
      setMessage('Session mis à jour avec succès!');
      navigate('/session-list');
    } catch (error) {
      console.error('Erreur lors de la mise à jour des données session:', error);
      setMessage("Échec de la mise à jour de la session.");
    }
  };

  return (
    <Row>
      <Col>
        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            <i className="bi bi-bell me-2"> </i>
            Mettre à jour la session
          </CardTitle>
          <CardBody>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label for="nom_session">Nom de la session</Label>
                <Input
                  id="nom_session"
                  name="nom_session"
                  value={sessionData.nom_session}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="type_session">Type de session</Label>
                <Input
                  id="type_session"
                  name="type_session"
                  value={sessionData.type_session}
                  onChange={handleChange}
                  type="select"
                  required
                >
                  <option value="">Sélectionnez type de session</option>
                  <option value="principale">Principale</option>
                  <option value="ratrapage">Rattrapage</option>
                  <option value="decembre">Décembre</option>
                  <option value="septembre">Septembre</option>
                </Input>
              </FormGroup>
              <Button type="submit">Mettre à jour la session</Button>
            </Form>
          </CardBody>
        </Card>
        {message && <p>{message}</p>}
        <Link to="/session-list">
          <Button color="secondary">Annuler</Button>
        </Link>
      </Col>
    </Row>
  );
};

export default UpdateSession;
