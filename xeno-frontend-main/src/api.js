import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000';

export const createSegment = async (segmentData, token) => {
  return axios.post(`${API_BASE_URL}/segment/segments`, segmentData, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const startCampaign = async (campaignData, token) => {
  return axios.post(`${API_BASE_URL}/campaigns/start`, campaignData, {
    headers: { Authorization: `Bearer ${token}` }
  });
};
