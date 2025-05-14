import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useAuth } from "./Signuppage";
import Navbar from "./NavBar";
const MakeReport = () => {
    const {username , signedup} = useAuth();
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("General");
  const [priority, setPriority] = useState("Low");
  const [photo, setPhoto] = useState(null); // base64
  const [imagePreviewURL, setImagePreviewURL] = useState(null); // blob URL
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [address, setAddress] = useState("");
  const [recording, setRecording] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const recognitionRef = useRef(null);

  // Get user location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setLatitude(latitude);
        setLongitude(longitude);
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await response.json();
          setAddress(data.display_name);
        } catch (err) {
          console.error("Geocoding failed", err);
        }
      },
      () => alert("Location access denied."),
      { enableHighAccuracy: true }
    );
  }, []);

  // Start webcam
  const startCamera = () => {

    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      videoRef.current.srcObject = stream;
    });
  };

  // Convert base64 to File
  const dataURLtoFile = (dataurl, filename) => {
    let arr = dataurl.split(",");
    let mime = arr[0].match(/:(.*?);/)[1];
    let bstr = atob(arr[1]);
    let n = bstr.length;
    let u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };

  const capturePhoto = () => {
    const context = canvasRef.current.getContext("2d");
    context.drawImage(videoRef.current, 0, 0, 640, 480);
    const imageData = canvasRef.current.toDataURL("image/png");
    setPhoto(imageData);

    const imageFile = dataURLtoFile(imageData, "photo.png");
    const previewURL = URL.createObjectURL(imageFile);
    setImagePreviewURL(previewURL);
  };



  const startRecording = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return alert("Browser does not support speech recognition");

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => setRecording(true);
    recognition.onend = () => setRecording(false);
    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript;
      setDescription(text);
      analyzeComplaint(text);
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3001/submit-report", {
        description,
        address,
        imagePreviewURL
      });
      alert("Complaint submitted successfully");
      setDescription("");
      setPhoto(null);
      setImagePreviewURL(null);
    } catch (err) {
      alert("Error submitting complaint");
      console.log(err);
    }
  };

  return (
    <div>
        {
    signedup ? null : <Navigate to={"/"}/>
}
        <Navbar></Navbar>
    <div className="bg-gray-100 min-h-screen p-6">

      <h1 className="text-3xl font-bold text-center mb-6">Citizen Complaint Form</h1>
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-6">
        <p className="text-sm mb-2 text-gray-600">
          <strong>Location:</strong> {latitude?.toFixed(4)}, {longitude?.toFixed(4)} <br />
          <strong>Address:</strong> {address}
        </p>

        <button
          onClick={startRecording}
          className="bg-indigo-600 text-white px-4 py-2 rounded mb-4 mr-4"
          >
          {recording ? "Recording..." : "🎙️ Speak Complaint"}
        </button>
        <button
          onClick={stopRecording}
          className="bg-red-500 text-white px-4 py-2 rounded mb-4"
          >
          Stop
        </button>

        <form onSubmit={handleSubmit}>
          <label className="block mb-2 font-semibold">Complaint Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
            className="w-full p-3 border rounded mb-4"
            placeholder="Describe the complaint..."
            required
            ></textarea>

          <div className="mb-4">
            <label className="block font-semibold">Category: </label>
            <input value={category} readOnly className="bg-gray-100 px-4 py-2 border rounded w-full" />
          </div>

          <div className="mb-4">
            <label className="block font-semibold">Priority: </label>
            <input value={priority} readOnly className="bg-gray-100 px-4 py-2 border rounded w-full" />
          </div>

          <div className="mb-4">
            <video ref={videoRef} width="640" height="480" autoPlay className="rounded" />
            <canvas ref={canvasRef} width="640" height="480" style={{ display: "none" }} />
            <div className="flex gap-4 mt-2">
              <button type="button" onClick={startCamera} className="bg-blue-600 text-white px-4 py-2 rounded">
                Start Camera
              </button>
              <button type="button" onClick={capturePhoto} className="bg-green-600 text-white px-4 py-2 rounded">
                Capture Photo
              </button>
            </div>
          </div>

          {imagePreviewURL && (
              <div className="mb-4">
              <img src={imagePreviewURL} alt="Captured" className="rounded shadow-md" />
            </div>
          )}

          <button type="submit" className="w-full bg-purple-700 text-white py-3 rounded hover:bg-purple-800">
            Submit Complaint
          </button>
        </form>
      </div>
    </div>
          </div>
  );
};

export default MakeReport;
