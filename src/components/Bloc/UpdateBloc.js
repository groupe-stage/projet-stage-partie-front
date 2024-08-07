import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { Row, Col, Card, CardTitle, CardBody, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';

const UpdateBloc = () => {
  const [blocData, setBlocData] = useState({
    nom_bloc: '',
    nbretage: ''
  });

  const [message, setMessage] = useState('');
  const { id_bloc } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBloc = async () => {
      try {
        console.log(`Fetching bloc with ID: ${id_bloc}`);
        const response = await axios.get(`http://localhost:8000/bloc/updateBloc/${id_bloc}/`);
        console.log('Bloc data fetched:', response.data);
        setBlocData(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des données du bloc:', error);
      }
    };

    fetchBloc();
  }, [id_bloc]);

  const handleChange = (e) => {
    setBlocData({
      ...blocData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:8000/bloc/updateBloc/${id_bloc}/`, blocData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setMessage('Bloc mis à jour avec succès!');
      navigate('/bloc-list'); 
    } catch (error) {
      console.error('Erreur lors de la mise à jour des données du bloc:', error);
      setMessage("Échec de la mise à jour du bloc.");
    }
  };

  return (
    <Row>
      <Col>
        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            <i className="bi bi-bell me-2"> </i>
            Mettre à jour le bloc
          </CardTitle>
          <CardBody>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label for="nom_bloc">Nom du bloc</Label>
                <Input
                  id="nom_bloc"
                  name="nom_bloc"
                  value={blocData.nom_bloc}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="nbretage">Nombre d'étages</Label>
                <Input
                  id="nbretage"
                  name="nbretage"
                  type="number"
                  value={blocData.nbretage}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              <Button type="submit">Mettre à jour le bloc</Button>
            </Form>
          </CardBody>
        </Card>
        {message && <p>{message}</p>}
        <Link to="/bloc-list">
          <Button color="secondary">Annuler</Button>
        </Link>
      </Col>
    </Row>
  );
};

export default UpdateBloc;
