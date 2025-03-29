import { useState } from 'react'
import './App.css'

function App() {
  return (
    <div className="app-container">
      <div className="webcam-container">
        <h2>Webcam</h2>
        {/* Webcam component will go here */}
      </div>
      
      <div className="info-panel">
        <div className="transcription-box">
          <h2>English Transcription</h2>
          {/* Transcription content will go here */}
        </div>
        
        <div className="waveform-box">
          <h2>Detected Waveform</h2>
          {/* Waveform visualization will go here */}
        </div>
        
        <div className="options-box">
          <h2>Options</h2>
          {/* Options and controls will go here */}
        </div>
      </div>
    </div>
  )
}

export default App
