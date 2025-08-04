/**
 * API Test Script (Browser Console Version)
 *
 * This file provides test functions that can be run in the browser console.
 * Import this file in your app and call the test functions from the console.
 */

import {
  productEndpoints,
  userEndpoints,
  orderEndpoints,
  todoEndpoints,
  authEndpoints,
  dashboardEndpoints,
} from "../endpoints";

// Global object to expose test functions
declare global {
  interface Window {
    apiTests: {
      testAuth: () => Promise<string>;
      testProducts: () => Promise<void>;
      testUsers: () => Promise<void>;
      testOrders: () => Promise<void>;
      testTodos: () => Promise<void>;
      testDashboard: () => Promise<void>;
      runAllTests: () => Promise<void>;
    };
  }
}

/**
 * Test Authentication
 */
async function testAuth() {
  console.log("🔑 Testing Authentication API...");
  try {
    const loginResponse = await authEndpoints.login({
      username: "kminchelle",
      password: "0lelplR",
    });
    console.log("✅ Login successful:", loginResponse);
    return loginResponse.token;
  } catch (error) {
    console.error("❌ Auth test failed:", error);
    throw error;
  }
}

/**
 * Test Products API
 */
async function testProducts() {
  console.log("\n📦 Testing Products API...");
  try {
    // Get all products
    const products = await productEndpoints.getAll({ limit: 5 });
    console.log("✅ Retrieved products:", products);

    // Get single product
    const product = await productEndpoints.getById(1);
    console.log("✅ Retrieved product by ID:", product);

    // Search products
    const searchResults = await productEndpoints.search("phone", { limit: 3 });
    console.log("✅ Search results:", searchResults);

    // Get products by category
    const categoryProducts = await productEndpoints.getByCategory(
      "smartphones",
      { limit: 3 }
    );
    console.log("✅ Category products:", categoryProducts);
  } catch (error) {
    console.error("❌ Products test failed:", error);
  }
}

/**
 * Test Users API
 */
async function testUsers() {
  console.log("\n👥 Testing Users API...");
  try {
    // Get all users
    const users = await userEndpoints.getAll({ limit: 5 });
    console.log("✅ Retrieved users:", users);

    // Get single user
    const user = await userEndpoints.getById(1);
    console.log("✅ Retrieved user by ID:", user);

    // Search users
    const searchResults = await userEndpoints.search("john", { limit: 3 });
    console.log("✅ Search results:", searchResults);
  } catch (error) {
    console.error("❌ Users test failed:", error);
  }
}

/**
 * Test Orders API
 */
async function testOrders() {
  console.log("\n🛒 Testing Orders API...");
  try {
    // Get all orders
    const orders = await orderEndpoints.getAll({ limit: 5 });
    console.log("✅ Retrieved orders:", orders);

    // Get single order
    const order = await orderEndpoints.getById(1);
    console.log("✅ Retrieved order by ID:", order);

    // Get orders by user
    const userOrders = await orderEndpoints.getByUserId(1, { limit: 3 });
    console.log("✅ User orders:", userOrders);
  } catch (error) {
    console.error("❌ Orders test failed:", error);
  }
}

/**
 * Test Todos API
 */
async function testTodos() {
  console.log("\n📝 Testing Todos API...");
  try {
    // Get all todos
    const todos = await todoEndpoints.getAll({ limit: 5 });
    console.log(
      `✅ Retrieved ${todos.todos?.length || 0} todos:`,
      todos.todos?.map((t) => t.title)
    );

    // Get single todo
    const todo = await todoEndpoints.getById(1);
    console.log("✅ Retrieved todo by ID:", todo.title);

    // Get todos by user
    const userTodos = await todoEndpoints.getByUser(1, { limit: 3 });
    console.log(
      `✅ Retrieved ${userTodos.todos?.length || 0} todos for user ID 1`
    );

    // Search todos
    const searchResults = await todoEndpoints.search("groceries", { limit: 3 });
    console.log(
      `✅ Search results: ${searchResults.todos?.length || 0} todos found`
    );
  } catch (error) {
    console.error("❌ Todos test failed:", error);
  }
}

/**
 * Test Dashboard API
 */
async function testDashboard() {
  console.log("\n📊 Testing Dashboard API...");
  try {
    // Get revenue summary
    const revenueSummary = await dashboardEndpoints.getRevenueSummary("month");
    console.log("✅ Revenue summary:", revenueSummary);

    // Get chart data
    const salesChart = await dashboardEndpoints.getChartData("sales", "month");
    console.log("✅ Sales chart data:", salesChart);

    // Get summary stats
    const stats = await dashboardEndpoints.getSummaryStats();
    console.log("✅ Summary stats:", stats);
  } catch (error) {
    console.error("❌ Dashboard test failed:", error);
  }
}

/**
 * Run all tests
 */
async function runAllTests() {
  console.log("🚀 Starting API integration tests...\n");

  try {
    await testAuth();
    await testProducts();
    await testUsers();
    await testOrders();
    await testTodos();
    await testDashboard();

    console.log("\n✨ All tests completed!");
  } catch (error) {
    console.error("❌ Test execution failed:", error);
  }
}

// Expose test functions to window for console access
if (typeof window !== "undefined") {
  window.apiTests = {
    testAuth,
    testProducts,
    testUsers,
    testOrders,
    testTodos,
    testDashboard,
    runAllTests,
  };
}

/**
 * To use this in the browser console:
 * 1. Import this file in your app
 * 2. Open browser console and run:
 *    window.apiTests.runAllTests()
 *
 * Or test specific endpoints:
 *    window.apiTests.testProducts()
 */

export {
  testAuth,
  testProducts,
  testUsers,
  testOrders,
  testTodos,
  testDashboard,
  runAllTests,
};
