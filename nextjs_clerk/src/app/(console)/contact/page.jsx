export default function ContactPage() {
    return (
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
        <form className="grid grid-cols-1 gap-6 max-w-2xl">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              placeholder="Your Name"
              className="mt-1 w-full px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-blue-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="mt-1 w-full px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-blue-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Message</label>
            <textarea
              rows="5"
              placeholder="Your message..."
              className="mt-1 w-full px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-blue-200"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
          >
            Send Message
          </button>
        </form>
      </div>
    );
  }
  