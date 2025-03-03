"use client";
import { Checkbox, IconButton, Spinner } from "@material-tailwind/react";
import { useMutation } from "@tanstack/react-query";
import { deleteTodo, updateTodo } from "actions/todo-action";
import { queryClient } from "app/config/reactquery-client-provider";
import dayjs from "dayjs";
import React, { useState } from "react";

export type TodoType = {
  completed: boolean;
  created_at: string;
  id: number;
  title: string;
  updated_at: string;
};

export default function Todo({ todo }: { todo: TodoType }) {
  const [title, setTitle] = useState(todo.title);
  const [completed, setCompleted] = useState(todo.completed);
  const [isEditing, setIsEditing] = useState(false);

  const updateTodoMutation = useMutation({
    mutationFn: () =>
      updateTodo({
        id: todo.id,
        title,
        completed,
      }),
    onSuccess: () => {
      setIsEditing(false);
      queryClient.invalidateQueries({
        queryKey: ["todos"],
      });
    },
  });

  const deleteTodoMutation = useMutation({
    mutationFn: () => deleteTodo(todo.id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["todos"],
      });
    },
  });
  return (
    <div className="flex items-center justify-between w-full gap-2">
      <Checkbox
        checked={completed}
        onChange={(e) => {
          setCompleted(e.target.checked);
          updateTodoMutation.mutate();
        }}
      />

      {isEditing ? (
        <input
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          className="flex-1 border-b-black border-b pb-2"
        />
      ) : (
        <>
          <p className={`flex-1 ${completed && "line line-through"}`}>
            {title}
          </p>
          <p>{dayjs(todo.created_at).format("YYYY-MM-DD HH:mm:ss")}</p>
        </>
      )}
      {isEditing ? (
        <IconButton
          onClick={() => {
            updateTodoMutation.mutate();
            setIsEditing(false);
          }}
        >
          {updateTodoMutation.isPending ? (
            <Spinner />
          ) : (
            <i className="fas fa-check" />
          )}
        </IconButton>
      ) : (
        <IconButton onClick={() => setIsEditing(true)}>
          <i className="fas fa-pen" />
        </IconButton>
      )}
      <IconButton
        onClick={() => {
          deleteTodoMutation.mutate();
        }}
      >
        <i className="fas fa-trash" />
      </IconButton>
    </div>
  );
}
