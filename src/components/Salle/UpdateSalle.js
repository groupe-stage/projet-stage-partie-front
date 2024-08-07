import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';

const EditSalle = () => {
  const { id_salle } = useParams();
  const navigate = useNavigate();
  
  const [salleData, setSalleData] = useState({
    nom_salle: '',
    capacite: '',
    dispo: true,
    id_bloc: '',
    id_examen: ''
  });
  
  const [blocs, setBlocs] = useState([]);
  const [examens, setExamens] = useState([]); // Assuming you want to list exams too

  useEffect(() => {
    // Fetch salle data
    axios.get(`http://localhost:8000/salle/updateSalle/${id_salle}/`)
      .then(response => {
        setSalleData(response.data);
      })
      .catch(error => {
        console.error("Erreur lors de la récupération de la salle!", error);
      });
    
    // Fetch blocs data
    axios.get('http://localhost:8000/bloc/displayAllBlocs/')
      .then(response => {
        setBlocs(response.data);
      })
      .catch(error => {
        console.error("Erreur lors de la récupération des blocs!", error);
      });

    // Fetch examens data
    axios.get('http://localhost:8000/examen/displayall/') // Assuming you have a similar endpoint for exams
      .then(response => {
        setExamens(response.data);
      })
      .catch(error => {
        console.error("Erreur lors de la récupération des examens!", error);
      });
  }, [id_salle]);

  const handleChange = (e) => {
    setSalleData({
      ...salleData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:8000/salle/updateSalle/${id_salle}/`, salleData)
      .then(response => {
        alert('Salle modifiée avec succès!');
        navigate('/salle-list');
      })
      .catch(error => {
        console.error("Erreur lors de la modification de la salle!", error);
      });
  };

  return (
    <Row>
      <Col lg="12">
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="nom_salle">Nom de la Salle</Label>
            <Input
              id="nom_salle"
              name="nom_salle"
              value={salleData.nom_salle}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="capacite">Capacité</Label>
            <Input
              id="capacite"
              name="capacite"
              type="number"
              value={salleData.capacite}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="dispo">Disponibilité</Label>
            <Input
              id="dispo"
              name="dispo"
              type="select"
              value={salleData.dispo}
              onChange={handleChange}
              required
            >
              <option value={true}>Oui</option>
              <option value={false}>Non</option>
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="id_bloc">Bloc</Label>
            <Input
              id="id_bloc"
              name="id_bloc"
              type="select"
              value={salleData.id_bloc}
              onChange={handleChange}
              required
            >
              <option value="">Sélectionnez un bloc</option>
              {blocs.map(bloc => (
                <option key={bloc.id_bloc} value={bloc.id_bloc}>
                  {bloc.nom_bloc}
                </option>
              ))}
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="id_examen">Examen</Label>
            <Input
              id="id_examen"
              name="id_examen"
              type="select"
              value={salleData.id_examen}
              onChange={handleChange}
              required
            >
              <option value="">Sélectionnez un examen</option>
              {examens.map(examen => (
                <option key={examen.id_examen} value={examen.id_examen}>
                  {examen.nom_examen}
                </option>
              ))}
            </Input>
          </FormGroup>
          <Button type="submit" color="primary">Modifier la salle</Button>
        </Form>
      </Col>
    </Row>
  );
};

export default EditSalle;
