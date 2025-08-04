/**
 * API Test Script
 *
 * This file contains tests for all API endpoints.
 * Run this script to verify that all API integrations are working correctly.
 */

import {
  productEndpoints,
  userEndpoints,
  orderEndpoints,
  todoEndpoints,
  authEndpoints,
  dashboardEndpoints,
} from "../endpoints";
import apiClient from "../client";
import { ProductCategory } from "../types";

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

    const currentUser = await authEndpoints.getCurrentUser();
    console.log("✅ Current user retrieved:", currentUser);

    return loginResponse.token; // Return token for other tests
  } catch (error) {
    console.error("❌ Auth test failed:", error);
    return null;
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
    console.log(
      `✅ Retrieved ${products.items.length} products:`,
      products.items.map((p: { title: string }) => p.title)
    );

    // Get single product
    if (products.items.length > 0) {
      const productId = products.items[0].id;
      const product = await productEndpoints.getById(
        typeof productId === "string" ? parseInt(productId, 10) : productId
      );
      console.log(`✅ Retrieved product by ID: ${product.title}`);
    }

    // Search products
    const searchResults = await productEndpoints.search("phone", { limit: 3 });
    console.log(
      `✅ Search results: ${searchResults.items.length} products found`
    );

    // Get product categories
    try {
      const response = await apiClient.get<string[]>("/products/categories");
      const categories = response.data;

      if (categories.length > 0) {
        const category = categories[0] as ProductCategory;
        const categoryProducts = await productEndpoints.getByCategory(
          category,
          { limit: 3 }
        );
        console.log(
          `✅ Retrieved ${categoryProducts.items.length} products in category '${category}'`
        );
      }
    } catch (error) {
      console.error("❌ Could not fetch product categories:", error);
    }
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
    console.log(
      `✅ Retrieved ${users.items.length} users:`,
      users.items.map(
        (u: { firstName: string; lastName: string }) =>
          `${u.firstName} ${u.lastName}`
      )
    );

    // Get single user
    if (users.items.length > 0) {
      const userId = users.items[0].id;
      const user = await userEndpoints.getById(
        typeof userId === "string" ? parseInt(userId, 10) : userId
      );
      console.log(
        `✅ Retrieved user by ID: ${user.firstName} ${user.lastName}`
      );
    }

    // Search users
    const searchResults = await userEndpoints.search("john", { limit: 3 });
    console.log(`✅ Search results: ${searchResults.items.length} users found`);
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
    console.log(`✅ Retrieved ${orders.items.length || 0} orders`);

    // Get single order
    if (orders.items && orders.items.length > 0) {
      const orderId = orders.items[0].id;
      const order = await orderEndpoints.getById(
        typeof orderId === "string" ? parseInt(orderId, 10) : orderId
      );
      console.log(
        `✅ Retrieved order by ID: ${order.id}, Total: $${order.total}`
      );
    }

    // Get orders by user
    const userId = 1;
    const userOrders = await orderEndpoints.getByUserId(userId, { limit: 3 });
    console.log(
      `✅ Retrieved ${
        userOrders.items.length || 0
      } orders for user ID ${userId}`
    );
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
      todos.todos?.map((t: { title: string }) => t.title)
    );

    // Get single todo
    if (todos.todos && todos.todos.length > 0) {
      const todoId = todos.todos[0].id;
      const todo = await todoEndpoints.getById(
        typeof todoId === "string" ? parseInt(todoId, 10) : todoId
      );
      console.log(`✅ Retrieved todo by ID: ${todo.title}`);
    }

    // Get todos by user
    const userId = 1;
    const userTodos = await todoEndpoints.getByUser(userId, { limit: 3 });
    console.log(
      `✅ Retrieved ${userTodos.todos?.length || 0} todos for user ID ${userId}`
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
    console.log("✅ Retrieved revenue summary:", revenueSummary);

    // Get chart data
    const salesChart = await dashboardEndpoints.getChartData("sales", "month");
    console.log(
      "✅ Retrieved sales chart data with",
      salesChart.labels.length,
      "data points"
    );

    // Get pricing tiers
    const pricingTiers = await dashboardEndpoints.getPricingTiers();
    console.log(`✅ Retrieved ${pricingTiers.length} pricing tiers`);

    // Get summary stats
    const stats = await dashboardEndpoints.getSummaryStats();
    console.log("✅ Retrieved summary stats:", stats);
  } catch (error) {
    console.error("❌ Dashboard test failed:", error);
  }
}

/**
 * Run all tests
 */
async function runAllTests() {
  console.log("🚀 Starting API integration tests...\n");

  // First test auth
  await testAuth();

  // Test all other APIs
  await Promise.all([
    testProducts(),
    testUsers(),
    testOrders(),
    testTodos(),
    testDashboard(),
  ]);

  console.log("\n✨ All tests completed!");
}

// Execute all tests
runAllTests().catch((error) => {
  console.error("❌ Test execution failed:", error);
});

/**
 * To run this test in the browser console:
 * 1. Import the test script in a component
 * 2. Call runAllTests() from the console
 *
 * To run with Node.js:
 * 1. You'll need to set up a Node.js environment with proper import handling
 * 2. Make sure to handle browser-specific APIs like localStorage
 */
