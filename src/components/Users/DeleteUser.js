import React from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from 'reactstrap';

const DeleteUser = () => {
  const { id_user } = useParams();
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8000/users/deleteusers/${id_user}/`);
      alert('Utilisateur supprimé avec succès!');
      navigate('/user-list');  // Redirige vers la liste des utilisateurs ou une autre page
    } catch (error) {
      console.error('Erreur lors de la suppression de l’utilisateur:', error);
      alert('Échec de la suppression de l’utilisateur.');
    }
  };

  return (
    <div>
      <h2>Êtes-vous sûr de vouloir supprimer cet utilisateur ?</h2>
      <Button color="danger" onClick={handleDelete}>
        Supprimer
      </Button>
    </div>
  );
};

export default DeleteUser;
