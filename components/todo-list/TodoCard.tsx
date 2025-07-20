"use client";

import React, { useState } from "react";
import { Card, Checkbox, Typography } from "antd";
import { StarFilled, StarOutlined, CloseCircleOutlined, DeleteOutlined } from "@ant-design/icons";
import { useThemeStore } from "@/stores/themeStore";
import { useTranslation } from "react-i18next";
import styles from "./TodoCard.module.css";
import type { CheckboxChangeEvent } from "antd/es/checkbox";

const { Text, Paragraph } = Typography;

export interface TodoCardProps {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  priority: "high" | "medium" | "low";
  dueDate?: string;
  onToggleComplete?: (id: string, completed: boolean) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  className?: string;
  style?: React.CSSProperties;
}

const TodoCard: React.FC<TodoCardProps> = ({
  id,
  title,
  description,
  completed,
  priority,
  dueDate,
  onToggleComplete,
  onEdit,
  onDelete,
  className,
  style,
}) => {
  const { theme } = useThemeStore();
  const { t } = useTranslation();
  const [isStarred, setIsStarred] = useState(false);
  const [isCompleted, setIsCompleted] = useState(completed);

  const handleCheckboxChange = (e: CheckboxChangeEvent) => {
    const newCompletedState = e.target.checked;
    setIsCompleted(newCompletedState);
    if (onToggleComplete) {
      onToggleComplete(id, newCompletedState);
    }
  };
  
  const handleStarClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsStarred(!isStarred);
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onEdit) {
      onEdit(id);
    }
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDelete) {
      onDelete(id);
    }
  };

  const getPriorityColor = () => {
    switch (priority) {
      case "high":
        return "#ff4d4f";
      case "medium":
        return "#faad14";
      case "low":
        return "#52c41a";
      default:
        return "#52c41a";
    }
  };

  return (
    <Card
      className={`${styles.todoCard} ${isCompleted ? styles.selected : ""} ${styles[theme]} ${className || ""}`}
      style={style}
      variant="borderless"
    >
      <div className={styles.todoHeader}>
        <Checkbox
          checked={isCompleted}
          onChange={handleCheckboxChange}
          className={styles.checkbox}
          onClick={(e) => e.stopPropagation()}
        />
        <div className={styles.titleContainer}>
          <Text
            className={`${styles.todoTitle} ${isCompleted ? styles.completed : ""}`}
            ellipsis={{ tooltip: title }}
          >
            {title}
          </Text>
        </div>
        {!isCompleted ? (
          <div className={styles.iconActions}>
            {isStarred ? (
              <StarFilled 
                className={styles.starIcon} 
                onClick={handleStarClick}
                style={{fontSize: "24px"}}
              />
            ) : (
              <StarOutlined 
                className={styles.starIcon} 
                onClick={handleStarClick}
                style={{fontSize: "24px"}}
              />
            )}
            <CloseCircleOutlined 
              className={styles.closeIcon} 
              onClick={handleDeleteClick}
              style={{fontSize: "24px"}}
            />
          </div>
        ) : (
          <div className={styles.iconActions}>
            {isStarred ? (
              <StarFilled 
                className={styles.starIcon} 
                onClick={handleStarClick}
                style={{fontSize: "24px"}}
              />
            ) : (
              <StarOutlined 
                className={styles.starIcon} 
                onClick={handleStarClick}
                style={{fontSize: "24px"}}
              />
            )}
            <DeleteOutlined 
              className={styles.deleteIcon} 
              onClick={handleDeleteClick}
              style={{fontSize: "24px"}}
            />
          </div>
        )}
      </div>

      <Paragraph
        className={`${styles.todoDescription} ${isCompleted ? styles.completed : ""}`}
        ellipsis={{ rows: 2, expandable: false, tooltip: description }}
      >
        {description}
      </Paragraph>

      {dueDate && (
        <div className={styles.dueDate}>
          <Text type="secondary">{t("dashboard.todoList.dueDate", "Due")}: {dueDate}</Text>
        </div>
      )}
    </Card>
  );
};

export default TodoCard;