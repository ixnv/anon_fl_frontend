import { apiClient } from './client';
import {ORDER_APPLICATION_STATUS_ACCEPTED, ORDER_APPLICATION_STATUS_DECLINED} from "../constants/OrderApplicationStatus";

export const Account = {
  register: (email, username, password) => apiClient.post('/account/register', {email, username, password}),
  login: (username, password) => apiClient.post('/account/login', {username, password}),
};

export const CurrentUser = {
  fetch: () => apiClient.get('/account/me'),
  partial_update: (name) => apiClient.patch('/account/me', {name})
};

export const User = {
  fetch: (id) => apiClient.get(`/users/${id}`)
};

export const OrderList = {
  fetch: () => apiClient.get('/orders/'),
  fetch_by_filter: (query) => apiClient.get(`/orders/?${query}`),
  fetch_by_category: (category_id) => apiClient.get(`/orders/?category=${category_id}`),
  fetch_by_tag: (tag_id) => apiClient.get(`/orders/?tag=${tag_id}`),
  contractor: () => apiClient.get('/orders/contractor/'),
  customer: () => apiClient.get('/orders/customer/'),
};

export const Order = {
  fetch: (id) => apiClient.get(`/orders/${id}/`),
  create: (title, description, price, category, tags) => apiClient.post('/orders/', {
    title, description, price, category, tags
  }),
};

export const OrderCategories = {
  fetch: (id = 0) => {
    return id === 0 ? apiClient.get('/orders/categories/'): apiClient.get(`/orders/categories/${id}/`);
  }
};

export const OrderApplication = {
  create: (order_id) => apiClient.post(`/orders/${order_id}/applications/`),
  cancel: (order_id) => apiClient.delete(`/orders/${order_id}/applications/`),
  accept: (order_id, application_id) => apiClient.put(`/orders/${order_id}/applications/${application_id}/status/`, {
    status: ORDER_APPLICATION_STATUS_ACCEPTED
  }),
  decline: (order_id, application_id) => apiClient.put(`/orders/${order_id}/applications/${application_id}/status/`, {
    status: ORDER_APPLICATION_STATUS_DECLINED
  })
};

export const OrderChat = {
  fetch: (order_id, page=0) => apiClient.get(`/orders/${order_id}/chat/messages/`),
  sendMessage: (order_id, message) => apiClient.post(`/orders/${order_id}/chat/messages/`, {message}),
  readMessages: (order_id) => apiClient.put(`/orders/${order_id}/chat/messages/`)
};

export const Tags = {
  search: (term) => apiClient.get(`/tags/search?q=${term}`),
  create: (tag) => apiClient.post('/tags/', {tag})
};

export const UserNotificationsSettings = {
  get: () => apiClient.get('/account/settings/notifications/'),
  update: settings => apiClient.put('/account/settings/notifications/', settings)
};

export const Notifications = {
  mark_as_read: () => apiClient.post('/notifications/mark_as_read')
};
