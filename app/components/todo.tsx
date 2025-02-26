"use client";
import { Checkbox, IconButton } from "@material-tailwind/react";
import React, { useState } from "react";

export default function Todo() {
  const [title, setTitle] = useState("");
  const [completed, setCompleted] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  return (
    <div className="flex items-center justify-between w-full gap-2">
      <Checkbox
        checked={completed}
        onChange={(e) => setCompleted(e.target.checked)}
      />

      {isEditing ? (
        <input
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          className="flex-1 border-b-black border-b pb-2"
        />
      ) : (
        <p className={`flex-1 ${completed && "line line-through"}`}>{title}</p>
      )}
      {isEditing ? (
        <IconButton onClick={() => setIsEditing(false)}>
          <i className="fas fa-check" />
        </IconButton>
      ) : (
        <IconButton onClick={() => setIsEditing(true)}>
          <i className="fas fa-pen" />
        </IconButton>
      )}
      <IconButton>
        <i className="fas fa-trash" />
      </IconButton>
    </div>
  );
}
