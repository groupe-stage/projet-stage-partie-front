import React from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from 'reactstrap';

const DeleteSession = () => {
  const { id_session } = useParams();
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8000/session/deleteSession/${id_session}/`);
      alert('Session supprimée avec succès!');
      navigate('/session-list');  // Redirige vers la liste des utilisateurs ou une autre page
    } catch (error) {
      console.error('Erreur lors de la suppression de la session:', error);
      alert('Échec de la suppression de la session.');
    }
  };

  return (
    <div>
      <h2>Êtes-vous sûr de vouloir supprimer cette session ?</h2>
      <Button color="danger" onClick={handleDelete}>
        Supprimer
      </Button>
    </div>
  );
};

export default DeleteSession;
