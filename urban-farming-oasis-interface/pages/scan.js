import NavBar from '../components/navbar';
import { Camera, getNumbersOfCamera } from "react-camera-pro";
import { useState, useRef, useEffect } from 'react';
import Result from './components/scan-result';

export default function Scan() {
  // Ambatukamehameha
  const camera = useRef(null);
  const [image, setImage] = useState(null);
  const [taken, setTaken] = useState(false);
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState(false);

  const next_pred_pls = () => {
    setPrediction(false)
  }


  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setImage(file);
      console.log(image)
    } else {
      setImage(null);
    }
    setTaken(!taken);
  };

  const predict_soil = async (event) => {
    event.preventDefault();
    if (!image) return;

    setLoading(true);
    const formData = new FormData();
    formData.append('file', image);

    try {
      const response = await fetch('http://localhost:5000/predict_soil', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      setPrediction(data);
    } catch (error) {
      console.error('Error:', error);
      // Handle the error
    } finally {
      setLoading(false);
      // console.log(predictionClass[prediction[0].indexOf(Math.max(...prediction[0]))])
    }
  };


  return (
    <>
      {!prediction ? <div style={{ height: "calc(100vh - 70px)", backgroundColor: "#FAF4DF" }}
        className="flex flex-col justify-center items-center">

        <div className="w-11/12 font-bold text-center">Place soil in camera view to determine the most suitable type of crop to plant!</div>

        <div style={{ display: !taken ? "block" : "none" }} className="w-11/12 my-2">
          <Camera ref={camera} aspectRatio={1 / 1} />
        </div>
        <div style={{ display: !taken ? "none" : "block" }} className="w-11/12 my-2">
          <img src={image} alt='Taken photo' />
        </div>

        <button onClick={() => {
          setImage(camera.current.takePhoto());
          setTaken(!taken);
        }}
          className="text-white bg-slate-600 px-2 py-1 rounded-md"
        >
          {!taken ? "Take Photo" : "Retake Photo"}
        </button>
        <button
          className="text-white bg-slate-600 px-2 py-1 rounded-md"
          onClick={() => {
            if (camera.current) {
              camera.current.switchCamera();
            }
          }}
        >Switch Camera</button>

        <form>
          <input type="file" name="file" accept="image/*" onChange={handleImageChange} required />
        </form>
        {/* <Link href="/scan-result"
          className="text-white bg-slate-600 px-2 py-1 rounded-md my-2"
        >Get Crop Recommendation</Link> */}

        <button onClick={predict_soil} disabled={loading}
          className="text-white bg-slate-600 px-2 py-1 rounded-md my-2"
        >
          {loading ? "Thinking..." : "Get Crop Recommendation"}
        </button>
      </div> : <Result soil_type={prediction['soil_type']} soil_desc={prediction['soil_description']} crops={prediction['crops']} start_next_pred={next_pred_pls} />}
      <NavBar />
    </>
  )
}
