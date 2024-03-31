import React, { useState } from 'react';
import backgroundImage from './bg.png'; // Import your background image
import './App.css';
function App() {
  return (
    <div className="App" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', minHeight: '100vh', maxWidth: '100vw', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', maxWidth: '45vw' }}><div style={{ marginLeft: '10vw', marginRight: '10vw', marginTop: '-40px', backgroundColor: 'rgb(119, 100, 226)', padding: '20px', borderRadius: '20px' }}><h2 style={{ textAlign: 'center', color: 'white', fontFamily: 'Calibri' }}>SEND CREDENTIAL NFT TO INDIVIDUAL</h2>
      </div>
      </div>
      <div>
        <div style={{ backgroundColor: 'rgb(119, 100, 226)', padding: '5px', borderRadius: '20px', marginTop: '100px', marginRight: '10vh' }}>
          <h1 style={{ textAlign: 'center', color: 'white', fontFamily: 'Calibri' }}>tRuESUME</h1>
        </div>
        <div style={{ marginBottom: '100px', marginTop: '20px', marginRight: '10vh', backgroundColor: 'white', padding: '20px', borderRadius: '10px' }}>
          <Form />
        </div></div>
    </div>
  );
}

function Form() {
  const [formData, setFormData] = useState({
    name: '',
    id: '',
    credential: '',
    walletAddress: '',
    certificate: null,
    nftSenderName: '',
    organization: '',
    position: '',
    isSenior: '',
    orgEmail: '',
    linkedin: '',
    proof: '',
    otp: ''
  });
  const [isVerified, setIsVerified] = useState(false); // New state to track verification status

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'file' ? files[0] : value
    }));
  };

  const handleSeniorityChange = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      isSenior: value
    }));
  };


  const handleVerifyEmail = async () => {
    try {
      // Make a request to your backend service to send OTP to the provided email
      const response = await fetch('/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: formData.orgEmail })
      });
      if (response.ok) {
        console.log('OTP sent successfully!');
      } else {
        console.error('Failed to send OTP');
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
    }
  };
  const handleCheckOTP = async () => {
    try {
      const response = await fetch('/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: formData.orgEmail,
          otp: formData.otp
        })
      });
      if (response.ok) {
        setIsVerified(true);
        console.log('OTP verified successfully!');
      } else {
        setIsVerified(false);
        console.error('Invalid OTP');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isVerified) {
      console.log('Please verify your email before submitting.');
      return;
    }

    // Handle form submission
    try {
      // Send form data to server
      const response = await fetch('/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        console.log('Form submitted successfully!');
        // Reset form after submission
        setFormData({
          // Reset form data
          name: '',
          id: '',
          credential: '',
          walletAddress: '',
          certificate: null,
          nftSenderName: '',
          organization: '',
          position: '',
          isSenior: '',
          orgEmail: '',
          linkedin: '',
          proof: '',
          otp: ''
        });
        setIsVerified(false); // Reset verification status
      } else {
        console.error('Failed to submit form');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div style={{ marginBottom: '20px' }}>
        <div>
          <label style={{ color: 'black', fontFamily: 'Calibri' }}>
            Name of the individual:
          </label>
          <br />
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Enter Name" />
        </div>
      </div>
      <div style={{ marginBottom: '20px' }}>
        <div>
          <label style={{ color: 'black', fontFamily: 'Calibri' }}>
            Their unique ID in the orginsation:
          </label>
          <br />
          <input
            type="text"
            name="id"
            value={formData.id}
            onChange={handleChange}
            required
            placeholder="Enter ID"
          />
        </div>
      </div>
      <div style={{ marginBottom: '20px' }}>
        <div>
          <label style={{ color: 'black', fontFamily: 'Calibri' }}>
            Credential/Statements:
          </label>
          <br />
          <input
            type="text"
            name="credential"
            value={formData.credential}
            onChange={handleChange}
            required
            placeholder="Enter statements"
          />
        </div>
      </div>
      <div style={{ marginBottom: '20px' }}>
        <div>
          <label style={{ color: 'black', fontFamily: 'Calibri' }}>
            Their Blockchain wallet address:
          </label>
          <br />
          <input
            type="text"
            name="walletAddress"
            value={formData.walletAddress}
            onChange={handleChange}
            required
            placeholder="Enter wallet address"
          />
        </div>
      </div>
      <div style={{ marginBottom: '20px' }}>
        <div>
          <label style={{ color: 'black', fontFamily: 'Calibri' }}>
            Upload certificate/image/template:
          </label>
          <br />
          <input
            type="file"
            name="certificate"
            onChange={handleChange}
            required
            placeholder="Upload file"
          />
        </div>
      </div>
      <div style={{ marginBottom: '20px' }}>
        <div>
          <label style={{ color: 'black', fontFamily: 'Calibri' }}>
            Who is sending this NFT? Your name:
          </label>
          <br />
          <input
            type="text"
            name="nftSenderName"
            value={formData.nftSenderName}
            onChange={handleChange}
            required
            placeholder="Enter your name"
          />
        </div>
      </div>
      <div style={{ marginBottom: '20px' }}>
        <div>
          <label style={{ color: 'black', fontFamily: 'Calibri' }}>
            Your organisation:
          </label>
          <br />
          <input
            type="text"
            name="organization"
            value={formData.organization}
            onChange={handleChange}
            required
            placeholder="Enter organisation's name"
          />
        </div>
      </div>
      <div style={{ marginBottom: '20px' }}>
        <div>
          <label style={{ color: 'black', fontFamily: 'Calibri' }}>
            Your position:
          </label>
          <br />
          <input
            type="text"
            name="position"
            value={formData.position}
            onChange={handleChange}
            required
            placeholder="Enter position"
          />
        </div>
      </div>
      <div style={{ marginBottom: '20px' }}>
        <div>
          <label style={{ color: 'black', fontFamily: 'Calibri' }}>
            Are you senior to the individual in the organisation?
          </label>
          <br />
          <div>
            <button type="button" onClick={() => handleSeniorityChange('Yes')} style={{ backgroundColor: formData.isSenior === 'Yes' ? 'green' : 'initial', marginRight: '10px' }}>Yes</button>
            <button type="button" onClick={() => handleSeniorityChange('No')} style={{ backgroundColor: formData.isSenior === 'No' ? 'red' : 'initial' }}>No</button>
          </div>
        </div>
      </div>
      <div style={{ marginBottom: '20px' }}>
        <div>
          <label style={{ color: 'black', fontFamily: 'Calibri' }}>
            Your organisation provided email id:
          </label>
          <br />
          <input
            type="email"
            name="orgEmail"
            value={formData.orgEmail}
            onChange={handleChange}
            required
            placeholder="Enter email"
          />
          <button type="button" onClick={handleVerifyEmail} disabled={isVerified} style={{ marginLeft: '10px' }}>Verify</button>
        </div>
        <div style={{ marginBottom: '20px' }}>
          <div>
            <label style={{ color: 'black', fontFamily: 'Calibri' }}>
              OTP:
            </label>
            <br />
            <input
              type="text"
              name="otp"
              value={formData.otp}
              onChange={handleChange}
              required
              placeholder="Enter otp"
            />
            <button type="button" onClick={handleCheckOTP} style={{ marginLeft: '10px' }} disabled={isVerified}>Check OTP</button>
          </div>
        </div>
      </div>
      <div style={{ marginBottom: '20px' }}>
        <div>
          <label style={{ color: 'black', fontFamily: 'Calibri' }}>
            Your LinkedIn profile/Your organisation's LinkedIn profile link:
          </label>
          <br />
          <input
            type="text"
            name="linkedin"
            value={formData.linkedin}
            onChange={handleChange}
            required
            placeholder="Enter link"
          />
        </div>
      </div>
      <div style={{ marginBottom: '20px' }}>
        <div>
          <label style={{ color: 'black', fontFamily: 'Calibri' }}>
            Proof that this email domain is the organisation's domain (a link to a website or a document that proves this):
          </label>
          <br />
          <input
            type="text"
            name="proof"
            value={formData.proof}
            onChange={handleChange}
            required
            placeholder="Enter link"
          />
        </div>
      </div>

      <div>
        <button type="submit" style={{ backgroundColor: 'rgb(119, 100, 226)', color: 'white', padding: '10px', borderRadius: '10px', marginTop: '20px' }} disabled={!isVerified}>Submit</button> {/* Disable submit button if not verified */}
      </div>
    </form>
  );
}

export default App;
