import React from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from 'reactstrap';

const DeleteDep = () => {
  const { id_departement } = useParams();
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8000/departement/deleteDep/${id_departement}/`);
      alert('Département supprimé avec succès!');
      navigate('/DepartementList');
    } catch (error) {
      console.error('Erreur lors de la suppression du département:', error);
      alert('Échec de la suppression du département.');
    }
  };

  return (
    <div>
      <h2>Êtes-vous sûr de vouloir supprimer ce département ?</h2>
      <Button color="danger" onClick={handleDelete}>
        Supprimer
      </Button>
    </div>
  );
};

export default DeleteDep;