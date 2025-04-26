import { useRef, useState, useEffect } from "react";

function AutoCameraRecorder() {
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [videoURL, setVideoURL] = useState(null);
  const [stream, setStream] = useState(null);

  useEffect(() => {
    async function startCameraAndRecord() {
      try {
        const videoStream = await navigator.mediaDevices.getUserMedia({ video: true });
        setStream(videoStream); // Store stream reference to stop it later
        videoRef.current.srcObject = videoStream;

        // Initialize MediaRecorder
        mediaRecorderRef.current = new MediaRecorder(videoStream);
        let chunks = [];

        mediaRecorderRef.current.ondataavailable = (event) => {
          chunks.push(event.data);
        };

        mediaRecorderRef.current.onstop = () => {
          const blob = new Blob(chunks, { type: "video/webm" });
          setVideoURL(URL.createObjectURL(blob));

          // Show alert when recording completes
          alert("Video recorded successfully!");

          // Stop camera after recording
          videoStream.getTracks().forEach(track => track.stop());
        };

        // Start recording automatically
        mediaRecorderRef.current.start();

        // Stop recording & camera after 10 seconds
        setTimeout(() => {
          mediaRecorderRef.current.stop();
        }, 10000);
      } catch (error) {
        console.error("Error accessing camera:", error);
      }
    }

    startCameraAndRecord();
  }, []);

  return (
    <div>
      <video ref={videoRef} autoPlay />
      {videoURL && (
        <>
          <h3>Recorded Video:</h3>
          <video src={videoURL} controls />
          <a href={videoURL} download="recorded-video.webm">
            <button>Download Video</button>
          </a>
        </>
      )}
    </div>
  );
}

export default AutoCameraRecorder;