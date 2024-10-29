import {UseEvent} from 'src/use/event/UseEvent'
import {useState} from 'react'

export const HomePage = () => {
  const [a, setA] = useState(10)
  const [b, setB] = useState(20)
  const [result, setResult] = useState(null)

  const plusValue: number = () => {
    setResult(a + b)
  }
  const minusValue: number = () => {
    setResult(a - b)
  }

  return (
    <main className="text-purple">
      <h1>계산기</h1>
      <label>
        <input
          type="number"
          value={a}
          onChange={(e) => {
            setA(Number(e.target.value))
          }}
        />
      </label>
      <label>
        <input
          type="number"
          value={b}
          onChange={(e) => {
            setB(Number(e.target.value))
          }}
        />
      </label>
      <button onClick={plusValue}>+</button>
      <button onClick={minusValue}>-</button>
      <div>total: {result}</div>
    </main>
  )
}

/*
export const HomePage = () => {
  const [a, setA] = useState(50)
  const [b, setB] = useState(10)
  const [result, setResult] = useState(null)

  // 더하기 함수
  const plusValue = () => {
    setResult(a + b)
  }
  const minusValue = () => {
    setResult(a - b)
  }
  // 빼기 함수

  return (
    <main className="text-purple">
      단순한 계산기
      <label htmlFor="1">
        <input type="number" value={a} onChange={(e) => setA(Number(e.target.value))} />
      </label>
      <label htmlFor="1">
        <input type="number" value={b} onChange={(e) => setB(Number(e.target.value))} />
      </label>
      <div>
        <button type="button" onClick={plusValue}>
          +
        </button>
        <button type="button" onClick={minusValue}>
          -
        </button>
      </div>
      결과 {result}
    </main>
  )
}
*/
