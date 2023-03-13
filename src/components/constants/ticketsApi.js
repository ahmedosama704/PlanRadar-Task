import axios from 'axios';

const ticketApi = axios.create({
  baseURL: 'http://localhost:8000',
});

export const getTickets = async () => {
  const res = await ticketApi.get('/tickets');
  return res.data;
};

export const addTicket = async (ticket) => {
  return await ticketApi.post('/tickets/', ticket);
};
export const updateTicket = async (ticket) => {
  return await ticketApi.patch(`/tickets/${ticket.id}`, ticket);
};
export default ticketApi;
