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
  Input,
  Spinner
} from 'reactstrap';

// Function to get the value of a cookie by its name
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
        id_niveaux: [],  // To handle multiple selected Niveaux
    });
    const [niveaux, setNiveaux] = useState([]);
    const [modules, setModules] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [existingCombos, setExistingCombos] = useState([]);

    useEffect(() => {
        // Fetch data for modules
        axios.get('http://127.0.0.1:8000/module/displayall')
            .then(response => {
                setModules(response.data);
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des modules!', error);
                setError('Erreur lors de la récupération des modules.');
            });

        // Fetch data for niveaux
        axios.get('http://127.0.0.1:8000/Niveau/displayallNiveaux')
            .then(response => {
                setNiveaux(response.data);
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des niveaux!', error);
                setError('Erreur lors de la récupération des niveaux.');
            });

        // Fetch existing combinations
        axios.get('http://127.0.0.1:8000/modniv/displayall/')
            .then(response => {
                setExistingCombos(response.data);
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des combinaisons existantes!', error);
            });
    }, []);

    // Handle form changes
    const handleChange = (e) => {
        const { name, value, checked } = e.target;

        if (name === "id_niveaux") {
            const selectedNiveaux = formData.id_niveaux.slice();  // Copy the array
            const parsedValue = parseInt(value, 10);  // Parse value to an integer

            if (checked) {
                if (!selectedNiveaux.includes(parsedValue)) {
                    selectedNiveaux.push(parsedValue);  // Add selected niveau
                }
            } else {
                const index = selectedNiveaux.indexOf(parsedValue);  // Find index of unselected niveau
                if (index > -1) {
                    selectedNiveaux.splice(index, 1);  // Remove unselected niveau
                }
            }

            setFormData({
                ...formData,
                id_niveaux: selectedNiveaux
            });
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    const navigate = useNavigate();

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const csrftoken = getCookie('csrftoken');

        try {
            // Create a set of existing combinations for fast lookup
            const existingComboSet = new Set(
                existingCombos.map(combo => `${combo.id_module}-${combo.id_niveau}`)
            );

            // Filter out combinations that already exist
            const newCombos = formData.id_niveaux.filter(id_niveau => {
                const comboKey = `${formData.id_module}-${id_niveau}`;
                return !existingComboSet.has(comboKey);
            });

            if (newCombos.length === 0) {
                alert('Tous les combos existent déjà.');
                return;
            }

            // Create a promise for each selected Niveau that is not a duplicate
            const requests = newCombos.map(id_niveau => {
                return axios.post('http://127.0.0.1:8000/modniv/add/', {
                    id_module: formData.id_module,
                    id_niveau: id_niveau
                }, {
                    headers: {
                        'X-CSRFToken': csrftoken
                    }
                });
            });

            // Execute all promises
            await Promise.all(requests);

            alert('Affectations ajoutées avec succès !');
            navigate('/Module_niveau-list');
            setFormData({
                id_module: '',
                id_niveaux: [],
            });
        } catch (err) {
            console.error('Erreur lors de l\'ajout des affectations !', err);
            setError('Erreur lors de l\'ajout des affectations.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Row>
            <Col>
                <Card>
                    <CardTitle tag="h6" className="border-bottom p-3 mb-0">
                        Ajouter des affectations
                    </CardTitle>
                    <CardBody>
                        {loading ? (
                            <div className="text-center">
                                <Spinner color="primary" />
                            </div>
                        ) : (
                            <Form onSubmit={handleSubmit}>
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
                                                {module.nom_module}
                                            </option>
                                        ))}
                                    </Input>
                                </FormGroup>

                                <FormGroup>
                                    <Label>Niveaux</Label>
                                    {niveaux.map(niveau => (
                                        <FormGroup check key={niveau.id_niveau}>
                                            <Label check>
                                                <Input
                                                    type="checkbox"
                                                    name="id_niveaux"
                                                    value={niveau.id_niveau}
                                                    checked={formData.id_niveaux.includes(niveau.id_niveau)}
                                                    onChange={handleChange}
                                                    className="custom-checkbox"  // Apply custom class
                                                />
                                                {niveau.libelleNiv}
                                            </Label>
                                        </FormGroup>
                                    ))}
                                </FormGroup>

                                <Button type="submit" color="primary">Ajouter les affectations</Button>
                                {error && <p className="text-danger mt-2">{error}</p>}
                            </Form>
                        )}
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
