import React, { useState } from 'react';
import { useToken } from '../contexts/TokenProvider';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Segments from '../components/Segments';

function Dashboard() {
  const { token } = useToken();  // Get the token from context
  const navigate = useNavigate();
  
  // Form state
  const [name, setName] = useState('');
  const [conditions, setConditions] = useState([{ field: '', operator: '', value: '' }]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAddCondition = () => {
    setConditions([...conditions, { field: '', operator: '', value: '' }]);
  };

  const handleRemoveCondition = (index) => {
    const newConditions = conditions.filter((_, i) => i !== index);
    setConditions(newConditions);
  };

  const handleChangeCondition = (index, field, value) => {
    const updatedConditions = [...conditions];
    updatedConditions[index][field] = value;
    setConditions(updatedConditions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the input
    if (!name || conditions.some(cond => !cond.field || !cond.operator || !cond.value)) {
      setError("Please fill all fields correctly.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        'http://localhost:5000/segment/segments',  // Your backend URL
        { name, conditions },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      console.log(response.data);
      setLoading(false);
      navigate('/segments');  // Redirect to a page that lists the segments or success page
    } catch (error) {
      console.error("Error creating segment:", error);
      setError('An error occurred while creating the segment.');
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Create Audience Segment</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Segment Name"
            required
          />
        </div>

        <div>
          <label>Conditions:</label>
          {conditions.map((condition, index) => (
            <div key={index} style={{ marginBottom: '10px' }}>
              <input
                type="text"
                value={condition.field}
                onChange={(e) => handleChangeCondition(index, 'field', e.target.value)}
                placeholder="Field"
                required
              />
              <select
                value={condition.operator}
                onChange={(e) => handleChangeCondition(index, 'operator', e.target.value)}
                required
              >
                <option value="">Select operator</option>
                <option value=">">{'>'}</option> {/* Unicode → */}
                <option value=">=">{'\u2265'}</option> {/* Unicode ≥ */}
                <option value="<">{'<'}</option> {/* Unicode ← */}
                <option value="<=">{'\u2264'}</option> {/* Unicode ≤ */}
                <option value="=">{'='}</option>
              </select>
              <input
                type="text"
                value={condition.value}
                onChange={(e) => handleChangeCondition(index, 'value', e.target.value)}
                placeholder="Value"
                required
              />
              <button type="button" onClick={() => handleRemoveCondition(index)}>
                Remove
              </button>
            </div>
          ))}
          <button type="button" onClick={handleAddCondition}>
            Add Condition
          </button>
        </div>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Create Segment'}
        </button>
      </form>


      <Segments />
    </div>
  );
}

export default Dashboard;
