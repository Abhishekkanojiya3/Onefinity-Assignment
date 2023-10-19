import React, { useState } from 'react';
import MicIcon from '@mui/icons-material/Mic';
import './App.css';

const Field = ({ label, value, onInputChange }) => {
  // State to track if the microphone is listening
  const [isListening, setIsListening] = useState(false);

  // Initialize the recognition object
  let recognition = null;

  // Function to handle input changes
  const handleInputChange = (text) => {
    onInputChange(text);
  };

  // Function to start recording with the microphone
  const startRecording = () => {
    // Create a new speech recognition object
    recognition = new window.webkitSpeechRecognition();
    recognition.lang = 'en-US';

    // When speech recognition starts
    recognition.onstart = () => {
      setIsListening(true);
    };

    // When speech recognition provides a result
    recognition.onresult = (event) => {
      const last = event.results.length - 1;
      const result = event.results[last][0].transcript;
      handleInputChange(result);
    };

    // When speech recognition ends
    recognition.onend = () => {
      setIsListening(false);
    };

    // When an error occurs during speech recognition
    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
    };

    // Start speech recognition
    recognition.start();
  };

  // Function to stop recording
  const stopRecording = () => {
    if (recognition) {
      recognition.stop();
    }
  };

  return (
    <div className="field-container">
      {/* Label for the input field */}
      <label>{label} <span className="required">*</span></label>
      
      {/* Input field and microphone icon */}
      <div className="input-container">
        <input type="text" className="form_style" value={value} onChange={(e) => handleInputChange(e.target.value)} />

        {/* Microphone icon for speech recognition */}
        <MicIcon
          style={{ color: isListening ? 'green' : 'inherit' }}
          onClick={isListening ? stopRecording : startRecording}
        />
      </div>
    </div>
  );
};

export default Field;
