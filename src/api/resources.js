import { apiClient } from './client';

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
  fetch_by_category: (category_id) => apiClient.get(`/orders/?${category_id}`),
  fetch_by_tag: (tag_id) => apiClient.get(`/orders/?${tag_id}`),
  contractor: () => apiClient.get('/orders/contractor/'),
  customer: () => apiClient.get('/orders/customer/'),
};

export const Order = {
  fetch: (id) => apiClient.get(`/orders/${id}/`),
  create: (title, description, price, category, tags) => apiClient.post('/orders/', {title, description, price, category, tags}),
};

export const OrderCategories = {
  fetch: (id = 0) => {
    if (id === 0) {
      return apiClient.get('/orders/categories/');
    }

    return apiClient.get(`/orders/categories/${id}/`)
  }
};

export const OrderApplication = {
  create: (order_id) => apiClient.post(`/orders/${order_id}/applications/`),
  cancel: (order_id) => apiClient.delete(`/orders/${order_id}/applications/`)
};

export const Tags = {
  search: (term) => apiClient.get(`/tags/search?q=${term}`),
  create: (tag) => apiClient.post('/tags/', {tag})
};
