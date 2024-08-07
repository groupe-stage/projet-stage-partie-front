import React from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from 'reactstrap';

const DeleteNiveau = () => {
  const { id_niveau } = useParams();
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await axios.delete(`http://127.0.0.1:8000/Niveau/deleteNiveau/${id_niveau}/`);
      alert('Niveau supprimé avec succès!');
      navigate('/NiveauList');  // Redirect to the niveau list or another page
    } catch (error) {
      console.error('Erreur lors de la suppression du niveau:', error);
      alert('Échec de la suppression du niveau.');
    }
  };

  return (
    <div>
      <h2>Êtes-vous sûr de vouloir supprimer ce niveau ?</h2>
      <Button color="danger" onClick={handleDelete}>
        Supprimer
      </Button>
    </div>
  );
};

export default DeleteNiveau;
