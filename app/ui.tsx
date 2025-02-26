"use client";
import React from "react";
import { Input, Typography } from "@material-tailwind/react";
import Todo from "./components/todo";

export default function UI() {
  return (
    <div className="w-2/3 mx-auto flex flex-col items-center py-20 gap-3">
      <h1 className="text-2xl">TODO LIST</h1>
      <Input
        label="오늘 할일"
        placeholder="오늘 할일"
        icon={<i className="fas fa-search" />}
      />
      <Todo />
    </div>
  );
}
