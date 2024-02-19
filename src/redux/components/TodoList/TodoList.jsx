import React from "react";
import { StyledDiv, StyledTodoListHeader, StyledTodoListBox } from "./styles";
import Todo from "../Todo";
import { getTodos } from "../../../api/todos";
import { useQuery } from "react-query";

function TodoList({ isActive }) {
  const {isLoading, isError, data} = useQuery("todos", getTodos);

  if(isLoading) {
    return <h1>로딩중입니다...</h1>;
  }

  if(isError) {
    return <h1>오류가 발생했습니다</h1>;
  }
  return (
    <StyledDiv>
      <StyledTodoListHeader>
        {isActive ? "해야 할 일 ⛱" : "완료한 일 ✅"}
      </StyledTodoListHeader>
      <StyledTodoListBox>
        {data.data
          .filter((item) => item.isDone === !isActive)
          .map((item) => {
            return <Todo key={item.id} todo={item} isActive={isActive} />;
          })}
      </StyledTodoListBox>
    </StyledDiv>
  );
}

export default TodoList;
