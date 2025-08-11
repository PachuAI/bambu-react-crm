import { useState } from "react";

const App = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">
          Vite + React + Tailwind v4
        </h1>
        
        <div className="space-y-4">
          <button
            onClick={() => setCount((count) => count + 1)}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition-colors"
          >
            Count is {count}
          </button>
          
          <p className="text-gray-600 text-center">
            Edit <code className="bg-gray-100 px-2 py-1 rounded text-sm">src/App.tsx</code> and save to test HMR
          </p>
        </div>
        
        <p className="text-sm text-gray-500 text-center mt-6">
          Tailwind CSS v4 is working! 🎉
        </p>
      </div>
    </div>
  );
}

export default App;