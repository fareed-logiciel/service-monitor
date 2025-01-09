// serviceApi.js
import axios from 'axios';

// Base axios instance (replace baseURL with your actual backend server)
const api = axios.create({
  baseURL: 'http://localhost:4000/api',
});

// Mock data for demonstration
const mockServices = [
  {
    id: 1,
    name: 'AuthService',
    environment: 'Production',
    status: 'Running',
    lastUpdate: '2025-01-01T12:00:00Z',
  },
  {
    id: 2,
    name: 'PaymentService',
    environment: 'QA',
    status: 'Stopped',
    lastUpdate: '2025-01-01T12:05:00Z',
  },
  {
    id: 3,
    name: 'ReportingService',
    environment: 'Development',
    status: 'Pending',
    lastUpdate: '2025-01-01T12:10:00Z',
  },
];

// Mock notifications
const mockNotifications = [
  {
    id: 'notif-1',
    serviceName: 'PaymentService',
    severity: 'Critical',
    message: 'Service has crashed and needs an immediate restart.',
    timestamp: '2025-01-01T13:00:00Z',
  },
  {
    id: 'notif-2',
    serviceName: 'ReportingService',
    severity: 'Warning',
    message: 'Service has been in pending state for over 15 minutes.',
    timestamp: '2025-01-01T13:05:00Z',
  },
];

// Mock historical data
const mockHistoryData = [
  {
    timestamp: '2025-01-01T08:00:00Z',
    oldState: 'Running',
    newState: 'Stopped',
  },
  {
    timestamp: '2025-01-01T08:10:00Z',
    oldState: 'Stopped',
    newState: 'Running',
  },
  {
    timestamp: '2025-01-01T09:00:00Z',
    oldState: 'Running',
    newState: 'Stopped',
  },
];

// Fetch all services
export async function fetchServices() {
  // In a real implementation:
  // const { data } = await api.get('/services');
  // return data;

  // Mock
  return Promise.resolve(mockServices);
}

// Fetch notifications
export async function fetchNotifications() {
  // In a real implementation:
  // const { data } = await api.get('/notifications');
  // return data;

  // Mock
  return Promise.resolve(mockNotifications);
}

// Fetch history for a particular service
export async function fetchServiceHistory(serviceId) {
  // In a real implementation:
  // const { data } = await api.get(`/services/${serviceId}/history`);
  // return data;

  // Mock
  return Promise.resolve(mockHistoryData);
}

// Perform action on a service: start, stop, restart, disable
export async function performServiceAction(serviceId, action) {
  // In a real implementation:
  // const { data } = await api.post(`/services/${serviceId}/actions`, { action });
  // return data;

  // Mock
  return Promise.resolve({ success: true, message: `Action ${action} performed.` });
}
