/**
 * API endpoints exports
 * Central export point for all API endpoint functions
 */

import productEndpoints from "./products";
import userEndpoints from "./users";
import authEndpoints from "./auth";
import orderEndpoints from "./orders";
import dashboardEndpoints from "./dashboard";
import todoEndpoints from "./todos";

// Export individual endpoint groups
export {
  productEndpoints,
  userEndpoints,
  authEndpoints,
  orderEndpoints,
  dashboardEndpoints,
  todoEndpoints,
};

// Default export is an object containing all endpoint groups
const endpoints = {
  products: productEndpoints,
  users: userEndpoints,
  auth: authEndpoints,
  orders: orderEndpoints,
  dashboard: dashboardEndpoints,
  todos: todoEndpoints,
};

export default endpoints;
