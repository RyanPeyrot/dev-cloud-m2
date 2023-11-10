import {act, renderHook} from '@testing-library/react';
import useTasks from './index';

test('useTasks custom hook', () => {
  const storedTasks = [
    {id: 1, text: 'Task 1', completed: false},
    {id: 2, text: 'Task 2', completed: true},
  ];
  localStorage.setItem('tasks', JSON.stringify(storedTasks));

  const {result} = renderHook(() => useTasks());

  expect(result.current.tasks).toEqual(storedTasks);
  localStorage.removeItem('tasks');
});

test('adding new tasks', () => {
  const task = {id: Date.now(), text: 'Task 1', completed: false};
  const {result} = renderHook(() => useTasks());

  act(() => {
    result.current.addTask(task.text);
  });
  expect(result.current.tasks[0].text).toEqual(task.text);
});

test('Complete task', () => {
  const storedTasks = [
    {id: 1, text: 'Task 1', completed: false},
    {id: 2, text: 'Task 2', completed: true},
  ];
  localStorage.setItem('tasks', JSON.stringify(storedTasks));

  const {result} = renderHook(() => useTasks());
  const task = {id: 1, text: 'Task 1', completed: true};

  act(() => {
    result.current.toggleTask(task.id);
  });
  expect(result.current.tasks[0]).toEqual(task);
  localStorage.removeItem('tasks');
});

test('Delete task', () => {
  const storedTasks = [
    {id: 1, text: 'Task 1', completed: false},
    {id: 2, text: 'Task 2', completed: true},
  ];
  localStorage.setItem('tasks', JSON.stringify(storedTasks));

  const {result} = renderHook(useTasks);
  const task = {id: 1, text: 'Task 1', completed: false};

  act(() => {
    result.current.deleteTask(2);
  });
  expect(result.current.tasks).toEqual([task]);
  localStorage.removeItem('tasks');
});
