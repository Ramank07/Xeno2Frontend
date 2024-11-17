import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useToken } from '../contexts/TokenProvider';
const Segments = () => {
  const [segments, setSegments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useToken();  // Get the token from context

  useEffect(() => {
    const fetchSegments = async () => {
      try {
        const response = await axios.get('http://localhost:5000/segment/segments', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setSegments(response.data);
      } catch (err) {
        setError('Failed to load segments');
      } finally {
        setLoading(false);
      }
    };

    fetchSegments();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Your Segments</h2>
      <ul>
        {segments.length === 0 ? (
          <p>No segments found.</p>
        ) : (
          segments.map((segment) => (
            <li key={segment.id}>
              <strong>{segment.name}</strong>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Segments;
