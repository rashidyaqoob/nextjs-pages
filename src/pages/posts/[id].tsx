import { GetStaticPaths, GetStaticProps } from 'next';
import React from 'react';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export default function TodoPage({ todo }: { todo: Todo }) {
  return (
    <div>
      <h1>Todo ID: {todo.id}</h1>
      <h2>{todo.title}</h2>
      <p>{todo.completed ? 'Completed' : 'Not Completed'}</p>
    </div>
  );
}


export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/todos');
  const todos = await res.json();

  const paths = todos.map((todo: Todo) => ({
    params: { id: todo.id.toString() },
  }));

  return {
    paths,
    fallback: false, 
  };
};


export const getStaticProps: GetStaticProps = async ({ params }) => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${params?.id}`);
  const todo = await res.json();

  return {
    props: {
      todo,
    },
  };
};
