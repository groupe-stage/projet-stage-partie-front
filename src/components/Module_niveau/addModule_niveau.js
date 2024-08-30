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

const AddModule_niveau = () => {
    const [formData, setFormData] = useState({
        id_module: '',
        id_niveau: '',
    });

    const [niveaux, setNiveaux] = useState([]);
    const [modules, setModules] = useState([]);

    useEffect(() => {
        // Récupérer les données des modules
        axios.get('http://127.0.0.1:8000/module/displayall')
            .then(response => {
                setModules(response.data);
            })
            .catch(error => {
                console.error('Il y a eu une erreur lors de la récupération des modules!', error);
            });

        // Récupérer les données des niveaux
        axios.get('http://127.0.0.1:8000/Niveau/displayallNiveaux')
            .then(response => {
                setNiveaux(response.data);
            })
            .catch(error => {
                console.error('Il y a eu une erreur lors de la récupération des niveaux!', error);
            });
    }, []);

    // Fonction pour gérer les changements dans le formulaire
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const navigate = useNavigate();
    
    // Fonction pour gérer la soumission du formulaire
    const handleSubmit = (e) => {
        e.preventDefault();
        const csrftoken = getCookie('csrftoken');

        axios.post('http://127.0.0.1:8000/Module_niveau/addModule_niveau/', formData, {
            headers: {
                'X-CSRFToken': csrftoken
            }
        })
        .then(response => {
            alert('Affectation ajoutée avec succès !');
            navigate('/Module_niveau-list');
            setFormData({
                id_module: '',
                id_niveau: '',
            });
        })
        .catch(error => {
            console.error('Il y a eu une erreur lors de l\'ajout de l\'affectation !', error);
            alert('Erreur lors de l\'ajout de l\'affectation.');
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
                                <Label for="id_niveau">Niveau</Label>
                                <Input
                                    id="id_niveau"
                                    name="id_niveau"
                                    type="select"
                                    value={formData.id_niveau}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Sélectionnez un niveau</option>
                                    {niveaux.map(niveau => (
                                        <option key={niveau.id_niveau} value={niveau.id_niveau}>
                                            {niveau.libelleNiv}  {/* Utilisez le nom du niveau ici */}
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
                                    value={formData.id_module}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Sélectionnez un module</option>
                                    {modules.map(module => (
                                        <option key={module.id_module} value={module.id_module}>
                                            {module.nom_module}  {/* Utilisez le nom du module ici */}
                                        </option>
                                    ))}
                                </Input>
                            </FormGroup>

                            <Button type="submit">Ajouter l'affectation</Button>
                        </Form>
                    </CardBody>
                </Card>
                <Link to="/Module_niveau-list">
                    <Button color="secondary">
                        Annuler
                    </Button>
                </Link>
            </Col>
        </Row>
    );
};

export default AddModule_niveau;
