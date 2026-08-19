import { useState } from 'react';
import classNames from 'classnames/bind';
import { DragDropProvider, type DragEndEvent } from '@dnd-kit/react';
import { useSortable, isSortable } from '@dnd-kit/react/sortable';

import styles from './Todo.module.scss';

import todoList from '@/data/todoList.json';

import DeleteIcon from '@/assets/images/icons/icon-cross.svg?react';

import Checkbox from '@/components/Checkbox';
import Button from '@/components/Button';

const cx = classNames.bind(styles);

type FilterStatus = 'all' | 'active' | 'completed';

type TodoItem = {
  id: string;
  title: string;
  isCompleted: boolean;
};

type SortableTodoItemProps = {
  idx: number;
  item: TodoItem;
  onToggleStatus: (item: TodoItem) => void;
  onDeleteItem: (id: string) => void;
};

const SortableTodoItem = (props: SortableTodoItemProps) => {
  const {
    idx,
    item,
    onToggleStatus,
    onDeleteItem
  } = props;

  const [element, setElement] = useState<Element | null>(null);
  const { isDragging } = useSortable({
    id: item.id,
    index: idx,
    element
  });

  return (
    <li
      ref={setElement}
      className={cx('todo-item', { dragging: isDragging })}
    >
      <Checkbox
        label={item.title}
        checked={item.isCompleted}
        onChange={() => onToggleStatus(item)}
      />
      <Button
        className={cx('delete-btn')}
        icon={<DeleteIcon />}
        variant='default'
        aria-label={`Delete "${item.title}"`}
        onClick={() => onDeleteItem(item.id)}
      />
    </li>
  );
};

const Todo = () => {
  const [newTodo, setNewTodo] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');
  const [todos, setTodos] = useState<TodoItem[]>(todoList);

  const filteredTodos = todos.filter(item => {
    switch (filterStatus) {
      case 'active':
        return !item.isCompleted;
      case 'completed':
        return item.isCompleted;
      case 'all':
      default:
        return item;
    }
  });

  const itemLeftCount = filteredTodos.filter(item => !item.isCompleted).length;

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo(e.target.value);
  };

  const onKeyDownInput = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      setTodos((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          title: newTodo,
          isCompleted: false
        }
      ]);
      setNewTodo('');
    }
  };

  const onFilterStatus = (status: FilterStatus) => {
    setFilterStatus(status);
  };

  const onToggleStatus = (item: TodoItem) => {
    setTodos((prev) => {
      const isExist = prev.find(prevItem => prevItem.id === item.id);

      if (isExist) {
        return prev.map((prevItem) => {
          if (prevItem.id === item.id) {
            return { ...prevItem, isCompleted: !prevItem.isCompleted };
          }

          return prevItem;
        });
      }

      return prev;
    });
  };

  const onDeleteItem = (id: string) => {
    setTodos((prev) => prev.filter(prevItem => prevItem.id !== id));
  };

  const onClearCompleted = () => {
    setTodos((prev) => prev.filter(prevItem => !prevItem.isCompleted));
  };

  const onDragEnd = (e: DragEndEvent) => {
    if (e.canceled || !e.operation.source) {
      return;
    };

    const { source } = e.operation;

    if (isSortable(source)) {
      const { initialIndex, index } = source;

      if (initialIndex !== index) {
        const draggedItem = filteredTodos[initialIndex];
        const targetItem = filteredTodos[index];

        if (!draggedItem || !targetItem) {
          return;
        }

        setTodos((prev) => {
          const fromIdx = prev.findIndex(item => item.id === draggedItem.id);
          const toIdx = prev.findIndex(item => item.id === targetItem.id);

          const newItems = [...prev];
          newItems.splice(fromIdx, 1);
          newItems.splice(toIdx, 0, draggedItem);

          return newItems;
        });
      }
    }
  };

  return (
    <div className={cx('todo-container')}>
      <div className={cx('todo-input')}>
        <span className={cx('checkmark')}></span>
        <input
          type='text'
          name='todoInput'
          value={newTodo}
          placeholder='Create a new todo...'
          onChange={onChangeInput}
          onKeyDown={onKeyDownInput}
        />
      </div>
      <DragDropProvider onDragEnd={onDragEnd}>
        <ul className={cx('todo-list')}>
          {filteredTodos.map((item, idx) => {
            return (
              <SortableTodoItem
                key={item.id}
                idx={idx}
                item={item}
                onToggleStatus={onToggleStatus}
                onDeleteItem={onDeleteItem}
              />
            );
          })}
          <li className={cx('toolbar')}>
            <p className={cx('left-title')}>{`${itemLeftCount} items left`}</p>
            <div className={cx('status-filter', 'desktop')}>
              <Button variant='text' active={filterStatus === 'all'} onClick={() => onFilterStatus('all')}>All</Button>
              <Button variant='text' active={filterStatus === 'active'} onClick={() => onFilterStatus('active')}>Active</Button>
              <Button variant='text' active={filterStatus === 'completed'} onClick={() => onFilterStatus('completed')}>Completed</Button>
            </div>
            <Button variant='text' onClick={onClearCompleted}>Clear Completed</Button>
          </li>
        </ul>
      </DragDropProvider>
      <div className={cx('status-filter', 'mobile')}>
        <Button variant='text' active={filterStatus === 'all'} onClick={() => onFilterStatus('all')}>All</Button>
        <Button variant='text' active={filterStatus === 'active'} onClick={() => onFilterStatus('active')}>Active</Button>
        <Button variant='text' active={filterStatus === 'completed'} onClick={() => onFilterStatus('completed')}>Completed</Button>
      </div>
      {filteredTodos.length > 0 && (<p className={cx('todo-tip')}>Drag and drop to reorder list</p>)}
    </div>
  );
};

export default Todo;
