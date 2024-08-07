

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link} from 'react-router-dom';
import { Row, Col, Card, CardTitle, CardBody, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';

const UpdateModule = () => {
  const [moduleData, setModuleData] = useState({
    nom_module: '',
    duree_module: '',
    id_niveau: '',
   
  });

  const [message, setMessage] = useState('');
  const { id_module } = useParams();
  const navigate = useNavigate();  // Déclaration correcte
  useEffect(() => {
    const fetchModule = async () => {
      try {
        console.log(`Fetching module with ID: ${id_module}`);
        const response = await axios.get(`http://localhost:8000/module/updateModule/${id_module}/`);
        console.log('module data fetched:', response.data);
        setModuleData(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des données module:', error);
      }
    };

    fetchModule();
  }, [id_module]);

  const handleChange = (e) => {
    setModuleData({
      ...moduleData,
      [e.target.name]: e.target.value
    });
  };

  

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    for (const key in moduleData) {
      if (moduleData[key] instanceof File) {
        formData.append(key, moduleData[key]);
      } else {
        formData.append(key,moduleData[key]);
      }
    }
  
    try {
      await axios.put(`http://localhost:8000/module/updateModule/${id_module}/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage('Module mis à jour avec succès!');
      navigate('/module-list'); 
    } catch (error) {
      console.error('Erreur lors de la mise à jour des données module:', error);
      setMessage("Échec de la mise à jour du module.");
    }
  };
  
  return (
    <Row>
      <Col>
        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            <i className="bi bi-bell me-2"> </i>
            Mettre à jour le module
          </CardTitle>
          <CardBody>
            <Form onSubmit={handleSubmit}>
            <FormGroup>
       
                                <Label for="nom_module">Nom du module</Label>
                                <Input
                                    id="nom_module"
                                    name="nom_module"
                                    value={moduleData.nom_module}
                                    onChange={handleChange}
                                    required
                                />
                            
                            </FormGroup>
                            <FormGroup>
                                <Label for="duree_module">Durée (en heure)</Label>
                                <Input
                                    id="duree_module"
                                    name="duree_module"
                                    value={moduleData.duree_module}
                                    onChange={handleChange}
                                    required
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="id_niveau">Niveau</Label>
                                <Input
                                    id="id_niveau"
                                    name="id_niveau"
                                    value={moduleData.id_niveau}
                                    onChange={handleChange}
                                    placeholder="Entrez l'ID du niveau"
                                    required
                                />
                            </FormGroup>
              <Button type="submit">Mettre à jour le module</Button>
            </Form>
          </CardBody>
        </Card>
        {message && <p>{message}</p>}
        <Link to="/module-list">
          <Button color="secondary">Annuler</Button>
        </Link>
      </Col>
    </Row>
  );
};

export default UpdateModule;
