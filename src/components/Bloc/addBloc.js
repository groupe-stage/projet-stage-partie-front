import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Card,
  Row,
  Col,
  CardTitle,
  CardBody,
  Button,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';

const AddBloc = () => {
    const [formData, setFormData] = useState({
        nom_bloc: '',
        nbretage: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('http://127.0.0.1:8000/bloc/addBloc/', formData)
        .then(response => {
            alert('Bloc added successfully!');
            navigate('/bloc-list'); 
            setFormData({
                nom_bloc: '',
                nbretage: '',
            });
        })
        .catch(error => {
            console.error('There was an error adding the bloc!', error);
            alert('Error adding bloc.');
        });
    };

    return (
        <Row>
            <Col>
                <Card>
                    <CardTitle tag="h6" className="border-bottom p-3 mb-0">
                        <i className="bi bi-bell me-2"> </i>
                        Ajouter un Bloc
                    </CardTitle>
                    <CardBody>
                        <Form onSubmit={handleSubmit}>
                            <FormGroup>
                                <Label for="nom_bloc">Nom</Label>
                                <Input
                                    id="nom_bloc"
                                    name="nom_bloc"
                                    value={formData.nom_bloc}
                                    onChange={handleChange}
                                    required
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="nbretage">Nombre d'étages</Label>
                                <Input
                                    id="nbretage"
                                    name="nbretage"
                                    value={formData.nbretage}
                                    onChange={handleChange}
                                    type="number"
                                    required
                                />
                            </FormGroup>
                            <Button type="submit">Ajouter le Bloc</Button>
                        </Form>
                    </CardBody>
                </Card>
                <Link to="/bloc-list">
                    <Button color="secondary">
                        Annuler
                    </Button>
                </Link>
            </Col>
        </Row>
    );
};

export default AddBloc;
