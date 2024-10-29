import {useState, useRef, useEffect} from 'react'
export interface Todo {
  id: number
  message: string
}
export interface TodoListProps {
  list: Todo[]
  doneMap: Record<string | number, boolean>
  onToggleDone: (id: number | string) => void
  onRemoveItem: (id: number | string) => void
}
export const TodoList = (props: TodoListProps) => {
  const {list, doneMap, onToggleDone, onRemoveItem} = props
  return (
    <>
      {list.map((item) => {
        return (
          <TodoItem
            key={item.id}
            isDone={doneMap[item.id]}
            onToggleDone={onToggleDone}
            onRemoveItem={onRemoveItem}
            {...item}
          />
        )
      })}
    </>
  )
}
export interface TodoItemProps extends Todo {
  isDone?: boolean
  onToggleDone: (id: number | string) => void
  onRemoveItem: (id: number | string) => void
}
export const TodoItem = (props: TodoItemProps) => {
  const {onToggleDone, isDone, message, onRemoveItem} = props
  return (
    <div className="flex py-5 divide-y divide-blue-200">
      <span className={isDone ? 'underline decoration-pink-500 text-pink' : 'underline decoration-indigo-500 text-indigo'}>{message}</span>
      <button onClick={() => onToggleDone(props.id)} className={isDone ? 'px-5 bg-transparent' : 'px-5 bg-transparent'}>done</button>
      <button onClick={() => onRemoveItem(props.id)} className="px-5 bg-transparent">remove</button>
    </div>
  )
}
export interface TodoAddItemProps {
  onAddItem: (message: string) => void
}
export const TodoAddItem = (props: TodoAddItemProps) => {
  const {onAddItem} = props
  let message = ''
  const refInput = useRef<HTMLInputElement>(null)
  const handleAddItem = () => {
    onAddItem(message)
    message = ''
    if (refInput.current) {
      refInput.current.value = message
    }
  }
  const onInput = (event: any) => {
    message = event.target.value.trim()
  }
  return (
    <div className="flex">
      <input placeholder="add todo" onChange={onInput} ref={refInput} className="flex-1 p-5 border-0 bg-amber-200		 "/>
      <button onClick={handleAddItem} className="w-50 py-5 px-0 border-0 bg-[#d8e5ddff]">add</button>
    </div>
  )
}
export interface LocalStorageProps {
  list: Todo[]
  doneMap: Record<string | number, boolean>
}
export const LocalStorage = (props: LocalStorageProps) => {
  const {list, doneMap} = props
  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list))
    localStorage.setItem('doneMap', JSON.stringify(doneMap))
  }, [list, doneMap])
  return null
}
const getStorage = (key: string): any => {
  const value = localStorage.getItem(key)
  if (value) {
    try {
      const parsedValue = JSON.parse(value)
      if (typeof parsedValue === 'object') {
        return parsedValue as Todo[]
      }
      return
    } catch (error) {
      console.error('Failed to parse localStorage:', error)
    }
  }
  return
}
export const HomePage = () => {
  const [list, setList] = useState(
    getStorage('list') ?? [
      {id: 1, message: 'Apple'},
      {id: 2, message: 'Banana'},
      {id: 3, message: 'Cherry'},
    ],
  )
  let idCounter = list.length
  const [doneMap, setDoneMap] = useState<Record<string | number, boolean>>(
    getStorage('doneMap') ?? {},
  )
  const onAddItem = (message: string) => {
    idCounter += 1
    setList((value) => [...value, {id: idCounter, message}])
  }
  const onToggleDone = (id: string | number) => {
    setDoneMap((value) => ({...value, [id]: !value[id]}))
  }
  const onRemoveItem = (id: number | string) => {
    const index = list.findIndex((item) => item.id === id)
    if (index !== -1) {
      const newList = [...list.slice(0, index), ...list.slice(index + 1)]
      setList(newList)
    }
  }
  return (
    <main className="text-purple border-dashed border-2 border-sky-500">
      <LocalStorage list={list} doneMap={doneMap} />
      <TodoAddItem onAddItem={onAddItem} />
      <TodoList
        list={list}
        doneMap={doneMap}
        onToggleDone={onToggleDone}
        onRemoveItem={onRemoveItem}
      />
    </main>
  )
}