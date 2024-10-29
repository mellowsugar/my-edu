import {useState} from 'react'
// import {UseEvent} from 'src/use/event/UseEvent'
import {todoList} from './todoList'

export const HomePage = () => {
  // 필터 상태: 초기값은 모두 "all"
  const [authorFilter, setAuthorFilter] = useState('all')
  const [priorityFilter, setPriorityFilter] = useState('all')

  // 필터링된 리스트 계산
  const filteredList = todoList.filter((item: any) => {
    const matchesAuthor = authorFilter === 'all' || item.author === authorFilter
    const matchesPriority = priorityFilter === 'all' || item.priority === priorityFilter
    return maㅁtchesAuthor && matchesPriority
  })

  // 고유한 author와 priority 목록 생성 (중복 제거)
  const authors = ['all', ...new Set(todoList.map((item: any) => item.author))]
  const priorities = ['all', ...new Set(todoList.map((item: any) => item.priority))]

  return (
    <main className="text-purple">
      <h1>할 일 목록</h1>

      <div>
        <label>
          Author:
          <select value={authorFilter} onChange={(e) => setAuthorFilter(e.target.value)}>
            {authors.map((author) => (
              <option key={author} value={author}>
                {author}
              </option>
            ))}
          </select>
        </label>

        <label>
          Priority:
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
          >
            {priorities.map((priority) => (
              <option key={priority} value={priority}>
                {priority}
              </option>
            ))}
          </select>
        </label>
      </div>

      {/* 필터링된 할 일 목록 */}
      <div>
        {filteredList.length > 0 ? (
          filteredList.map((item: any) => (
            <div key={item.id}>
              <p>Task: {item.task}</p>
              <p>Author: {item.author}</p>
              <p>Priority: {item.priority}</p>
              <hr />
            </div>
          ))
        ) : (
          <p>선택된 필터에 맞는 할 일이 없습니다.</p>
        )}
      </div>

      {/* <UseEvent /> */}
    </main>
  )
}
