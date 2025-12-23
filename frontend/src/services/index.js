import api from './api';

export const authService = {
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  getMe: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  }
};

export const formationService = {
  getPublicFormations: async (filters = {}) => {
    const response = await api.get('/formations/public', { params: filters });
    return response.data;
  },

  getFormations: async (filters = {}) => {
    const response = await api.get('/formations', { params: filters });
    return response.data;
  },

  getFormation: async (id) => {
    const response = await api.get(`/formations/${id}`);
    return response.data;
  },

  createFormation: async (data) => {
    const response = await api.post('/formations', data);
    return response.data;
  },

  updateFormation: async (id, data) => {
    const response = await api.put(`/formations/${id}`, data);
    return response.data;
  },

  deleteFormation: async (id) => {
    const response = await api.delete(`/formations/${id}`);
    return response.data;
  }
};

export const formateurService = {
  getFormateurs: async (filters = {}) => {
    const response = await api.get('/formateurs', { params: filters });
    return response.data;
  },

  getFormateur: async (id) => {
    const response = await api.get(`/formateurs/${id}`);
    return response.data;
  },

  createFormateur: async (data) => {
    const response = await api.post('/formateurs', data);
    return response.data;
  },

  updateFormateur: async (id, data) => {
    const response = await api.put(`/formateurs/${id}`, data);
    return response.data;
  },

  deleteFormateur: async (id) => {
    const response = await api.delete(`/formateurs/${id}`);
    return response.data;
  },

  registerExternal: async (data) => {
    const response = await api.post('/formateurs/register-externe', data);
    return response.data;
  },

  addEvaluation: async (id, evaluation) => {
    const response = await api.post(`/formateurs/${id}/evaluation`, evaluation);
    return response.data;
  }
};

export const entrepriseService = {
  getEntreprises: async (filters = {}) => {
    const response = await api.get('/entreprises', { params: filters });
    return response.data;
  },

  getEntreprise: async (id) => {
    const response = await api.get(`/entreprises/${id}`);
    return response.data;
  },

  createEntreprise: async (data) => {
    const response = await api.post('/entreprises', data);
    return response.data;
  },

  updateEntreprise: async (id, data) => {
    const response = await api.put(`/entreprises/${id}`, data);
    return response.data;
  },

  deleteEntreprise: async (id) => {
    const response = await api.delete(`/entreprises/${id}`);
    return response.data;
  }
};

export const sessionService = {
  getSessions: async (filters = {}) => {
    const response = await api.get('/sessions', { params: filters });
    return response.data;
  },

  getSession: async (id) => {
    const response = await api.get(`/sessions/${id}`);
    return response.data;
  },

  createSession: async (data) => {
    const response = await api.post('/sessions', data);
    return response.data;
  },

  updateSession: async (id, data) => {
    const response = await api.put(`/sessions/${id}`, data);
    return response.data;
  },

  deleteSession: async (id) => {
    const response = await api.delete(`/sessions/${id}`);
    return response.data;
  },

  addParticipant: async (sessionId, participantId) => {
    const response = await api.post(`/sessions/${sessionId}/participants`, { participantId });
    return response.data;
  }
};

export const participantService = {
  register: async (data) => {
    const response = await api.post('/participants/register', data);
    return response.data;
  },

  getParticipants: async (filters = {}) => {
    const response = await api.get('/participants', { params: filters });
    return response.data;
  },

  getParticipant: async (id) => {
    const response = await api.get(`/participants/${id}`);
    return response.data;
  },

  updateParticipant: async (id, data) => {
    const response = await api.put(`/participants/${id}`, data);
    return response.data;
  },

  deleteParticipant: async (id) => {
    const response = await api.delete(`/participants/${id}`);
    return response.data;
  },

  sendEvaluation: async (id) => {
    const response = await api.post(`/participants/${id}/send-evaluation`);
    return response.data;
  }
};
