"use client";
import React, { useState, useEffect } from "react";
import { Button, Input } from "@material-tailwind/react";
import Todo from "./components/todo";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createTodo, getTodos } from "actions/todo-action";

export default function UI() {
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(searchInput);

  // ✅ 검색어 입력 시 `debounce` 적용 (300ms 딜레이)
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchInput);
    }, 100);
    return () => clearTimeout(handler);
  }, [searchInput]);

  const {
    data: todosQuery,
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["todos", debouncedSearch], // ✅ 검색어가 변경될 때마다 쿼리 새로 실행
    queryFn: () => getTodos({ searchInput: debouncedSearch }),
  });

  const createTodoMutation = useMutation({
    mutationFn: () =>
      createTodo({
        title: "title",
        completed: false,
      }),

    onSuccess: () => {
      refetch();
    },
  });

  return (
    <div className="w-2/3 mx-auto flex flex-col items-center py-20 gap-3">
      <h1 className="text-2xl">TODO LIST</h1>

      {/* ✅ 검색 기능 추가 */}
      <Input
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        label="검색"
        placeholder="검색어를 입력하세요"
        icon={<i className="fas fa-search" />}
      />

      {isPending && <p>loading...</p>}

      {/* ✅ 검색된 TODO 리스트 출력 */}
      {todosQuery &&
        todosQuery.map((todo) => <Todo key={todo.id} todo={todo} />)}

      <Button
        onClick={() => createTodoMutation.mutate()}
        loading={createTodoMutation.isPending}
      >
        ADD TODO
      </Button>
    </div>
  );
}
