// ! FILES
import { readFile, writeFile } from 'node:fs/promises';
import { NotFoundError } from './errors.js';

const path = './src/storage/todos.json';

/**
 * @typedef {Object} Todos
 * @property {id} Number
 * @property {string} Title
 * @property {boolean} Completed
 */

/**
 * @return {Promise<Todos[]>}
 */

export const findTodos = async () => {
  const data = await readFile(path, 'utf-8');

  return JSON.parse(data);
};

/**
 * @param {string} title
 * @param {boolean} completed
 * @return {Promise<Todo>}
 */

export const createTodo = async ({ title, completed = false }) => {
  const todo = { title, completed, id: Date.now() };
  const todos = [todo, ...(await findTodos())];

  await writeFile(path, JSON.stringify(todos, null, 2));
  return todo;
};

/**
 * @param {boolean} id
 * @return {Promise}
 */

export const removeTodo = async (id) => {
  const todos = await findTodos();
  const todo = todos.findIndex((todo) => todo.id === id);

  if (todo === -1) {
    throw new NotFoundError();
  }
  await writeFile(
    path,
    JSON.stringify(
      todos.filter((todo) => todo.id !== id),
      null,
      2
    )
  );
};

/**
 * @param {number} id
 * @param {{completed?: boolean, title?: string}} partialTodo
 * @return {Promise<Todo>}
 */

export const updateTodo = async (id, partialTodo) => {
  const todos = await findTodos();
  const todo = todos.find((todo) => todo.id === id);

  if (todo === undefined) {
    throw new NotFoundError();
  }
  Object.assign(todo, partialTodo);
  await writeFile(path, JSON.stringify(todos, null, 2));
  return todo;
};
