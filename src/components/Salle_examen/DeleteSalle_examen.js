import React from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from 'reactstrap';

// Function to get the value of a cookie by its name
function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith(name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

// Default Axios configuration for CSRF
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const DeleteSallex = () => {
  const { idse } = useParams(); // Get the ID of the Sallex from URL params
  const navigate = useNavigate(); // Use navigate hook to redirect after deletion

  // Function to handle delete
  const handleDelete = async () => {
    try {
      const csrftoken = getCookie('csrftoken'); // Get CSRF token from cookie

      await axios.delete(`http://127.0.0.1:8000/sallex/delete/${idse}/`, {
        headers: {
          'X-CSRFToken': csrftoken // Include CSRF token in headers
        }
      });

      alert('Assignment deleted successfully!');
      navigate('/Sallex-list'); // Redirect after successful deletion
    } catch (error) {
      console.error('Error deleting assignment:', error.response || error);
      alert('Failed to delete assignment.');
    }
  };

  return (
    <div>
      <h2>Are you sure you want to delete this assignment?</h2>
      <Button color="danger" onClick={handleDelete}>
        Delete
      </Button>
    </div>
  );
};

export default DeleteSallex;
