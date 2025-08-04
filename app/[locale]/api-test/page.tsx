"use client";

import { useState } from "react";
import { Card, Typography, Button, Space, Divider, message } from "antd";
import {
  testAuth,
  testProducts,
  testUsers,
  testOrders,
  testTodos,
  testDashboard,
  runAllTests,
} from "@/services/api/tests";

const { Title, Text, Paragraph } = Typography;

/**
 * API Test Page
 *
 * A simple page to run API integration tests from the UI
 */
export default function ApiTestPage() {
  const [loading, setLoading] = useState<Record<string, boolean>>({});

  const runTest = async (testName: string, testFn: () => Promise<unknown>) => {
    setLoading((prev) => ({ ...prev, [testName]: true }));
    try {
      console.group(`Running test: ${testName}`);
      await testFn();
      console.groupEnd();
      message.success(
        `${testName} completed successfully! Check the console for details.`
      );
    } catch (error) {
      console.error(`Test failed: ${testName}`, error);
      message.error(`${testName} failed! Check the console for details.`);
    } finally {
      setLoading((prev) => ({ ...prev, [testName]: false }));
    }
  };

  const tests = [
    { name: "Authentication", fn: testAuth },
    { name: "Products", fn: testProducts },
    { name: "Users", fn: testUsers },
    { name: "Orders", fn: testOrders },
    { name: "Todos", fn: testTodos },
    { name: "Dashboard", fn: testDashboard },
  ];

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "24px" }}>
      <Title level={2}>API Integration Tests</Title>

      <Paragraph>
        This page allows you to test the API integration with DummyJSON. Open
        your browser console to see the detailed test results.
      </Paragraph>

      <Card title="Run All Tests" style={{ marginBottom: "24px" }}>
        <Paragraph>
          Run all API tests sequentially. This will test authentication,
          products, users, orders, todos, and dashboard endpoints.
        </Paragraph>
        <Button
          type="primary"
          loading={loading["all"]}
          onClick={() => runTest("all", runAllTests)}
        >
          Run All Tests
        </Button>
      </Card>

      <Title level={3}>Individual Tests</Title>

      <Space direction="vertical" style={{ width: "100%" }}>
        {tests.map((test) => (
          <Card key={test.name} size="small" title={`Test ${test.name} API`}>
            <Button
              loading={loading[test.name]}
              onClick={() => runTest(test.name, test.fn)}
            >
              Run {test.name} Test
            </Button>
          </Card>
        ))}
      </Space>

      <Divider />

      <Paragraph>
        <Text strong>Note:</Text> All test results are output to the browser
        console. Press F12 or right-click and select &quot;Inspect&quot; to open
        the developer tools. Select the &quot;Console&quot; tab to see test
        results.
      </Paragraph>
    </div>
  );
}
