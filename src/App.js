import React, { useState } from 'react';
import { useSpeechRecognition } from 'react-speech-recognition';
import Field from './Field';
import './App.css';

function App() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [state, setState] = useState('');
    const [district, setDistrict] = useState('');
    const [village, setVillage] = useState('');
    const [panNumber, setPANNumber] = useState('');
    const [aadhaarNumber, setAadhaarNumber] = useState('');

    const {
        listening,
        startListening,
        stopListening,
    } = useSpeechRecognition();

    // Function to handle form submission
    const handleSubmit = () => {
        const formData = {
            firstName,
            lastName,
            state,
            district,
            village,
            panNumber,
            aadhaarNumber,
        };

        // Save the form data to localStorage
        const savedData = JSON.parse(localStorage.getItem('formData')) || [];
        savedData.push(formData);
        localStorage.setItem('formData', JSON.stringify(savedData));

        // Clear form fields
        setFirstName('');
        setLastName('');
        setState('');
        setDistrict('');
        setVillage('');
        setPANNumber('');
        setAadhaarNumber('');

        window.alert('Your details have been submitted successfully!');

    };
    return ( <
        div className = "container" >
        <
        div className = "form_area" >
        <
        h1 className = "title" > Address Details < /h1> <
        form className = "form" >
        <
        div className = "form_group" >
        <
        Field label = "First Name"
        value = { firstName }
        onInputChange = { setFirstName }
        onStartRecording = { startListening }
        onStopRecording = { stopListening }
        isRecording = { listening }
        required /
        >
        <
        Field label = "Last Name"
        value = { lastName }
        onInputChange = { setLastName }
        required /
        >
        <
        Field label = "State"
        value = { state }
        onInputChange = { setState }
        required /
        >
        <
        Field label = "District"
        value = { district }
        onInputChange = { setDistrict }
        required / >
        <
        Field label = "Village"
        value = { village }
        onInputChange = { setVillage }
        required / >
        <
        Field label = "PAN Number"
        value = { panNumber }
        onInputChange = { setPANNumber }
        required /
        >
        <
        Field label = "Aadhaar Number"
        value = { aadhaarNumber }
        onInputChange = { setAadhaarNumber }
        required / >
        <
        /div> <
        button onClick = { handleSubmit }
        className = "btn" >
        Submit <
        /button> <
        /form> <
        /div> <
        /div>
    );
}

export default App;