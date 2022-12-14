// ! FILES
import {
  findTodos,
  createTodo,
  removeTodo,
  updateTodo,
} from '../todos_storage.js';
import { json } from 'node:stream/consumers';

export const index = async (req, res) => {
  return findTodos();
};

export const create = async (req, res) => {
  return createTodo(await json(req));
};

export const remove = async (req, res, url) => {
  const id = parseInt(url.searchParams.get('id'), 10);

  await removeTodo(id);
  res.writeHead(204);
};

export const update = async (req, res, url) => {
  const id = parseInt(url.searchParams.get('id'), 10);

  return updateTodo(id, await json(req));
};
