import { useCallback, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './assets/Navbar'
import { useAuth, useUser } from '@clerk/clerk-react'

function App() {
  const [count, setCount] = useState(0)
  const { userId, getToken } = useAuth()
  const { user } = useUser()

  const handleUserBackend = useCallback(async () => {
    try {
      const token = await getToken()
      const requestHeaders = {
        "Authorization": `Bearer ${token}`
      }

      console.log("Clerk Auth Headers:", requestHeaders)
      console.log("User Info:", user)

      const response = await fetch('http://localhost:8888/api/hello', {
        headers: requestHeaders
      })

      if (response.ok) {
        const data = await response.json()
        console.log("8888 backend:", data)
      } else {
        const text = await response.text()
        console.error("8888 error:", text)
      }
    } catch (error) {
      console.error('Error fetching 8888 backend:', error)
    }
  }, [getToken, user, userId])

  const handleFastApiBackend = useCallback(async () => {
    try {
      const token = await getToken();
  
      if (!token) {
        console.error("No token received from Clerk!");
        return;
      }
  
      const response = await fetch('http://localhost:8002', {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log(token)
      if (response.ok) {
        const data = await response.json();
        console.log("8002 FastAPI backend:", data);
      } else {
        const text = await response.text();
        console.error("8002 error:", text);
      }
    } catch (error) {
      console.error("Error fetching FastAPI backend:", error);
    }
  }, [getToken]);
  

  return (
    <>
      <Navbar />
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <button onClick={handleUserBackend}>Call Clerk Auth Backend (8888)</button>
        <button onClick={handleFastApiBackend} style={{ marginLeft: '1rem' }}>
          Call FastAPI Backend (8002)
        </button>
      </div>

      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
