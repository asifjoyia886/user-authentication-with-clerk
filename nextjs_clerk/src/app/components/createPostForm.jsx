'use client'
import { useRef, useState } from "react"
import { useAuth } from '@clerk/nextjs'

export default function PostCreateForm() {
  const formRef = useRef(null)
  const { getToken } = useAuth()

  const [responseMessage, setResponseMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const DJANGO_BACKEND_API = 'http://localhost:8888/api/createpost/'
  const FAST_BACKEND_API = 'http://localhost:8002/api/posts'

  const handleSubmit = async (apiUrl) => {
    setLoading(true)
    setResponseMessage('')
    
    try {
      const token = await getToken()
      const formData = new FormData(formRef.current)
      const formObj = Object.fromEntries(formData)
      const body = JSON.stringify(formObj)

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body
      })

      if (response.ok) {
        const data = await response.text()
        setResponseMessage(`✅ Success: ${data}`)
        formRef.current.reset()
      } else {
        const errorText = await response.text()
        setResponseMessage(`❌ Server error: ${errorText}`)
      }

    } catch (error) {
      setResponseMessage(`❌ Network error: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-xl mx-auto mt-8 bg-white shadow-lg rounded-2xl p-6 space-y-4 border border-gray-200">
      <h2 className="text-2xl font-semibold text-center text-gray-800">Create a Post</h2>

      <form ref={formRef} className="space-y-4">
        <textarea
          name="content"
          placeholder="Write your content here..."
          required
          className="w-full min-h-[120px] p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
        ></textarea>

        <div className="flex justify-between space-x-4">
          <button
            type="button"
            onClick={() => handleSubmit(FAST_BACKEND_API)}
            className="w-1/2 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg transition"
            disabled={loading}
          >
            Submit to FastAPI
          </button>

          <button
            type="button"
            onClick={() => handleSubmit(DJANGO_BACKEND_API)}
            className="w-1/2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition"
            disabled={loading}
          >
            Submit to Django
          </button>
        </div>
      </form>

      {responseMessage && (
        <div className={`text-sm text-center px-4 py-2 rounded-md ${responseMessage.startsWith('✅') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {responseMessage}
        </div>
      )}
    </div>
  )
}
