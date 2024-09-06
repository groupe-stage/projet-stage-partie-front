import React, { useState, useEffect } from 'react';
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

// Fonction pour obtenir la valeur d'un cookie par son nom
const getCookie = (name) => {
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
};

const AddSallex = () => {
    const [formData, setFormData] = useState({
        id_salles: [], // Utilisation d'un tableau pour plusieurs salles
        id_examen: ''
    });

    const [salles, setSalles] = useState([]);
    const [examens, setExamens] = useState([]);

    useEffect(() => {
        // Récupérer les données des salles
        axios.get('http://127.0.0.1:8000/salle/displayAllS')
            .then(response => {
                setSalles(response.data);
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des salles:', error);
            });

        // Récupérer les données des examens
        axios.get('http://127.0.0.1:8000/examen/displayall/')
            .then(response => {
                setExamens(response.data);
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des examens:', error);
            });
    }, []);

    // Gérer les changements du formulaire
    const handleChange = (e) => {
        const { name, value, checked } = e.target;
        if (name === 'id_salles') {
            if (checked) {
                // Ajouter l'id_salle à la liste des salles sélectionnées
                setFormData(prevState => ({
                    ...prevState,
                    id_salles: [...prevState.id_salles, value]
                }));
            } else {
                // Retirer l'id_salle de la liste des salles sélectionnées
                setFormData(prevState => ({
                    ...prevState,
                    id_salles: prevState.id_salles.filter(id => id !== value)
                }));
            }
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    const navigate = useNavigate();

    // Gérer la soumission du formulaire
    const handleSubmit = (e) => {
        e.preventDefault();
        const csrftoken = getCookie('csrftoken');

        // Soumettre chaque salle individuellement
        const promises = formData.id_salles.map(id_salle =>
            axios.post('http://127.0.0.1:8000/sallex/add/', { id_salle, id_examen: formData.id_examen }, {
                headers: {
                    'X-CSRFToken': csrftoken
                }
            })
        );

        Promise.all(promises)
            .then(() => {
                alert('Affectations ajoutées avec succès !');
                navigate('/sallex-list');
                setFormData({
                    id_salles: [],
                    id_examen: ''
                });
            })
            .catch(error => {
                console.error('Erreur lors de l\'ajout des affectations:', error);
                alert('Échec de l\'ajout des affectations.');
            });
    };

    return (
        <Row>
            <Col>
                <Card>
                    <CardTitle tag="h6" className="border-bottom p-3 mb-0">
                        Ajouter une affectation
                    </CardTitle>
                    <CardBody>
                        <Form onSubmit={handleSubmit}>
                            <FormGroup>
                                <Label for="id_salles">Salles</Label>
                                {salles.map(salle => (
                                    <FormGroup check key={salle.id_salle}>
                                        <Label check>
                                            <Input
                                                id={`salle-${salle.id_salle}`}
                                                name="id_salles"
                                                type="checkbox"
                                                value={salle.id_salle}
                                                checked={formData.id_salles.includes(salle.id_salle.toString())}
                                                onChange={handleChange}
                                            />
                                            {salle.nom_salle}
                                        </Label>
                                    </FormGroup>
                                ))}
                            </FormGroup>
                           
                            <FormGroup>
                                <Label for="id_examen">Examen</Label>
                                <Input
                                    id="id_examen"
                                    name="id_examen"
                                    type="select"
                                    value={formData.id_examen}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Sélectionner un examen</option>
                                    {examens.map(examen => (
                                        <option key={examen.id_examen} value={examen.id_examen}>
                                            {examen.nom_examen}
                                        </option>
                                    ))}
                                </Input>
                            </FormGroup>
                            <Button type="submit">Ajouter l'affectation</Button>
                        </Form>
                    </CardBody>
                </Card>
                <Link to="/Salle_examen-list">
                    <Button color="secondary">
                        Annuler
                    </Button>
                </Link>
            </Col>
        </Row>
    );
};

export default AddSallex;
