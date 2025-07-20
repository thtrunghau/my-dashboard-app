"use client";

import { useState } from "react";
import {
  Typography,
  Row,
  Col,
  Empty,
  Modal,
  Form,
  Input,
  Select,
  DatePicker,
} from "antd";
import { useTranslation } from "react-i18next";
import { useLanguageSync } from "@/hooks/useLanguageSync";
import { AddButton } from "@/components/common/buttons";
import { TodoCard } from "@/components/todo-list";
import { TodoCardProps } from "@/components/todo-list/TodoCard";

const { Text, Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;

// Mock data for todos
const initialTodos = [
  {
    id: "1",
    title: "Complete dashboard UI",
    description:
      "Finish implementing all components for the admin dashboard UI kit",
    completed: false,
    priority: "high",
    dueDate: "2023-12-25",
  },
  {
    id: "2",
    title: "Review pull requests",
    description: "Review and merge team pull requests for the new features",
    completed: true,
    priority: "medium",
    dueDate: "2023-12-20",
  },
  {
    id: "3",
    title: "Update documentation",
    description:
      "Update project documentation with new API endpoints and usage examples",
    completed: false,
    priority: "low",
    dueDate: "2023-12-30",
  },
];

export default function ClientTodoListPage({ locale }: { locale: string }) {
  const { isHydrated } = useLanguageSync(locale);
  const { t } = useTranslation();
  const [todos, setTodos] = useState(initialTodos);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingTodo, setEditingTodo] = useState<TodoCardProps | null>(null);
  const [form] = Form.useForm();

  // Show fallback content during hydration to prevent mismatch
  if (!isHydrated) {
    return (
      <div style={{ textAlign: "center", padding: "20px" }}>
        <Text type="secondary">Loading...</Text>
      </div>
    );
  }

  const handleAddTodo = () => {
    setEditingTodo(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEditTodo = (id: string) => {
    const todoToEdit = todos.find((todo) => todo.id === id);
    if (todoToEdit) {
      // Create a properly typed object for editingTodo
      const typedTodoToEdit: TodoCardProps = {
        id: todoToEdit.id,
        title: todoToEdit.title,
        description: todoToEdit.description,
        completed: todoToEdit.completed,
        priority: todoToEdit.priority as "high" | "medium" | "low",
        dueDate: todoToEdit.dueDate,
      };

      setEditingTodo(typedTodoToEdit);
      form.setFieldsValue({
        title: todoToEdit.title,
        description: todoToEdit.description,
        priority: todoToEdit.priority,
        dueDate: todoToEdit.dueDate ? todoToEdit.dueDate : undefined,
      });
      setIsModalVisible(true);
    }
  };

  const handleDeleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleToggleComplete = (id: string, completed: boolean) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, completed } : todo))
    );
  };

  const handleModalOk = () => {
    form.validateFields().then((values) => {
      if (editingTodo) {
        // Update existing todo
        setTodos(
          todos.map((todo) =>
            todo.id === editingTodo.id ? { ...todo, ...values } : todo
          )
        );
      } else {
        // Add new todo
        const newTodo = {
          id: String(Date.now()),
          ...values,
          completed: false,
        };
        setTodos([...todos, newTodo]);
      }
      setIsModalVisible(false);
      form.resetFields();
    });
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  return (
    <div>
      <Row justify="space-between" align="middle" style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} md={16}>
          <Title level={2}>{t("dashboard.todoList.title", "Todo List")}</Title>
        </Col>
        <Col xs={24} sm={12} md={8} style={{ textAlign: "right" }}>
          <AddButton onClick={handleAddTodo}>Add New Task</AddButton>
        </Col>
      </Row>

      {todos.length > 0 ? (
        <Row gutter={[16, 16]}>
          {todos.map((todo) => (
            <Col xs={24} sm={24} md={24} lg={24} key={todo.id}>
              <TodoCard
                id={todo.id}
                title={todo.title}
                description={todo.description}
                completed={todo.completed}
                priority={todo.priority as "high" | "medium" | "low"}
                dueDate={todo.dueDate}
                onToggleComplete={handleToggleComplete}
                onEdit={handleEditTodo}
                onDelete={handleDeleteTodo}
              />
            </Col>
          ))}
        </Row>
      ) : (
        <Empty
          description={t(
            "dashboard.todoList.empty",
            "No todos yet. Click 'Add' to create one."
          )}
          style={{ margin: "48px 0" }}
        />
      )}

      <Modal
        title={
          editingTodo
            ? t("dashboard.todoList.editTodo", "Edit Todo")
            : t("dashboard.todoList.addTodo", "Add Todo")
        }
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        destroyOnHidden
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="title"
            label={t("dashboard.todoList.title", "Title")}
            rules={[
              {
                required: true,
                message: t(
                  "dashboard.todoList.titleRequired",
                  "Please enter a title"
                ),
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label={t("dashboard.todoList.description", "Description")}
          >
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item
            name="priority"
            label={t("dashboard.todoList.priority", "Priority")}
            rules={[
              {
                required: true,
                message: t(
                  "dashboard.todoList.priorityRequired",
                  "Please select a priority"
                ),
              },
            ]}
          >
            <Select>
              <Option value="high">
                {t("dashboard.todoList.highPriority", "High")}
              </Option>
              <Option value="medium">
                {t("dashboard.todoList.mediumPriority", "Medium")}
              </Option>
              <Option value="low">
                {t("dashboard.todoList.lowPriority", "Low")}
              </Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="dueDate"
            label={t("dashboard.todoList.dueDate", "Due Date")}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
