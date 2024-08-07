import React from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from 'reactstrap';

const DeleteSalle = () => {
  const { id_salle } = useParams();
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8000/salle/deleteSalle/${id_salle}/`);
      alert('Salle supprimée avec succès!');
      navigate('/salle-list');
    } catch (error) {
      console.error('Erreur lors de la suppression de la salle:', error);
      alert('Échec de la suppression de la salle.');
    }
  };

  return (
    <div>
      <h2>Êtes-vous sûr de vouloir supprimer cette salle ?</h2>
      <Button color="danger" onClick={handleDelete}>
        Supprimer
      </Button>
    </div>
  );
};

export default DeleteSalle;
