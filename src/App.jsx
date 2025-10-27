import React, { useState } from 'react';
import NamaAnalyzer from './components/NamaAnalyzer';
import ProgramDiskonPanjangNama from './components/ProgramDiskonPanjangNama';
import ProgramDiskonBerdasarkanPanjangNama2 from './components/ProgramDiskonBerdasarkanPanjangNama2';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('diskon2');

  return (
    <div className="app">
      <div className="app-container">
        {/* Header */}
        <header className="app-header">
          <h1 className="app-title">Program Analisis & Diskon Nama</h1>
          <p className="app-subtitle">Pilih program yang ingin digunakan</p>
        </header>

        {/* Navigation Tabs */}
        <div className="tabs-container">
          <div className="tabs">
            <button
              className={`tab-button ${activeTab === 'diskon2' ? 'active' : ''}`}
              onClick={() => setActiveTab('diskon2')}
            >
              💰 Diskon Vokal
            </button>
            <button
              className={`tab-button ${activeTab === 'diskon' ? 'active' : ''}`}
              onClick={() => setActiveTab('diskon')}
            >
              📝 Diskon Karakter
            </button>
            <button
              className={`tab-button ${activeTab === 'analisis' ? 'active' : ''}`}
              onClick={() => setActiveTab('analisis')}
            >
              📊 Analisis Nama
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <main className="tab-content">
          {activeTab === 'diskon2' && (
            <div className="tab-panel">
              <ProgramDiskonBerdasarkanPanjangNama2 />
            </div>
          )}
          {activeTab === 'diskon' && (
            <div className="tab-panel">
              <ProgramDiskonPanjangNama />
            </div>
          )}
          {activeTab === 'analisis' && (
            <div className="tab-panel">
              <NamaAnalyzer />
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="app-footer">
          <p>© 2024 Program Analisis & Diskon Nama</p>
        </footer>
      </div>
    </div>
  );
}

export default App;

// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'


// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }


