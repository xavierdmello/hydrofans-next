"use client";

import {
  FaAppleAlt,
  FaCog,
  FaComments,
  FaHome,
  FaLeaf,
  FaMedal,
  FaTint,
  FaWater,
} from "react-icons/fa";
import { useCallback, useEffect, useRef, useState } from "react";
import Anthropic from "@anthropic-ai/sdk";
import Leaderboard from "./util/Leaderboard";
import RecordButton from "./components/RecordButton";
import WaterIntakeForm from "./components/WaterIntakeForm";
import WaterPosts from "./components/WaterPosts";
import Webcam from "react-webcam";

import Image from "next/image";

const mostWaterIntakeUsers = [
  {
    rank: 1,
    name: "Alice",
    metric: "100 oz",
    profilePic: "https://via.placeholder.com/32",
  },
  {
    rank: 2,
    name: "Bob",
    metric: "90 oz",
    profilePic: "https://via.placeholder.com/32",
  },
  {
    rank: 3,
    name: "Charlie",
    metric: "80 oz",
    profilePic: "https://via.placeholder.com/32",
  },
];

const longestStreakUsers = [
  {
    rank: 1,
    name: "Dave",
    metric: "30 days",
    profilePic: "https://via.placeholder.com/32",
  },
  {
    rank: 2,
    name: "Eve",
    metric: "25 days",
    profilePic: "https://via.placeholder.com/32",
  },
  {
    rank: 3,
    name: "Frank",
    metric: "20 days",
    profilePic: "https://via.placeholder.com/32",
  },
];

function App() {
  const webcamRef = useRef<Webcam>(null);

  // Internal variable used by capture - do not use, does not store image data. Check the base64 variables.
  const [capturedImage, setCapturedImage] = useState<string>("");
  const [facingMode, setFacingMode] = useState<"user" | "environment">(
    "environment"
  );
  const [initialWaterImage, setInitialWaterImage] = useState<string>("");
  const [endWaterImage, setEndWaterImage] = useState<string>("");
  const [isRecording, setIsRecording] = useState(false);
  const [currentPage, setCurrentPage] = useState<string>("home");
  const [challengeStatus, setChallengeStatus] = useState<
    | "notStarted"
    | "verifyingFull"
    | "verifyingEmpty"
    | "failedNotFull"
    | "failedNotEmpty"
  >("notStarted");

  useEffect(() => {
    if (isRecording && challengeStatus === "notStarted") {
      setChallengeStatus("verifyingFull");
    }
  }, [isRecording]);

  // Once the record button is pressed and an image has been saved, send it to the Claude API.
  useEffect(() => {
    async function callClaude() {}
  }, [challengeStatus]);

  const toggleRecording = useCallback(() => {
    setIsRecording((prev) => !prev);
  }, []);

  useEffect(() => {
    console.log("Challengestatus: ", challengeStatus);
    // call backend to check if challenge is complete
    if (challengeStatus == "verifyingFull") {
    }
  }, [challengeStatus]);
  const videoConstraints = {
    width: 480,
    height: 640,
    facingMode: facingMode,
  };

  useEffect(() => {
    if (isRecording) {
      capture(setInitialWaterImage);
    } else {
      capture(setEndWaterImage);
    }
  }, [isRecording]);

  const capture = useCallback(
    (setImageState: React.Dispatch<React.SetStateAction<string>>) => {
      const imageSrc = webcamRef.current?.getScreenshot();
      if (imageSrc) {
        setCapturedImage(imageSrc);

        const image = new window.Image();
        image.src = imageSrc;
        image.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = image.width;
          canvas.height = image.height;

          const ctx = canvas.getContext("2d");
          if (ctx) {
            ctx.drawImage(image, 0, 0);
            const base64Image = canvas.toDataURL("image/jpeg");
            setImageState(base64Image);
          }
        };
      }
    },
    [webcamRef]
  );

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return null;
      case "waterIntake":
        return <WaterIntakeForm />;
      case "leaderboard":
        return (
          <div>
            <Leaderboard
              title="Most Water Intake Today"
              users={mostWaterIntakeUsers}
            />
            <br />
            <Leaderboard title="Longest Streak" users={longestStreakUsers} />
          </div>
        );

      case "posts":
        return <WaterPosts />;
      case "settings":
        return <WaterIntakeForm />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#00afef] flex flex-col items-center justify-center py-4">
      <div className="md:w-4/5 w-[95%] max-w-[800px] mx-auto flex flex-col items-center bg-white rounded-2xl shadow-lg h-full min-h-[calc(100vh-2rem)]">
        {/* <img src={logo} className="w-64 mt-8 mb-8" alt="Hydrofans" /> */}
        {currentPage === "home" && (
          <div className="mx-5 overflow-hidden rounded-lg flex flex-col items-center md:max-w-[50%] max-w-[95%]">
            <Image
              src="/logo.png"
              alt="Hydrofans"
              width={256}
              height={64}
              className="mt-8 mb-8"
              priority
            />
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              className="w-full rounded-lg"
              videoConstraints={videoConstraints}
            />

            <br />

            <RecordButton
              isRecording={isRecording}
              onToggleRecording={toggleRecording}
              pending={
                challengeStatus === "verifyingFull" ||
                challengeStatus === "verifyingEmpty"
              }
            />
          </div>
        )}
        <div className="flex-grow">{renderPage()}</div>
        <div className="w-full mt-auto flex justify-around py-4 bg-gray-200">
          <FaHome
            className={`text-2xl cursor-pointer ${
              currentPage === "home" ? "text-blue-600" : "text-gray-600"
            }`}
            onClick={() => setCurrentPage("home")}
          />
          <FaTint
            className={`text-2xl cursor-pointer ${
              currentPage === "waterIntake" ? "text-blue-600" : "text-gray-600"
            }`}
            onClick={() => setCurrentPage("waterIntake")}
          />
          <FaMedal
            className={`text-2xl cursor-pointer ${
              currentPage === "leaderboard" ? "text-blue-600" : "text-gray-600"
            }`}
            onClick={() => setCurrentPage("leaderboard")}
          />
          <FaComments
            className={`text-2xl cursor-pointer ${
              currentPage === "posts" ? "text-blue-600" : "text-gray-600"
            }`}
            onClick={() => setCurrentPage("posts")}
          />
          <FaCog
            className={`text-2xl cursor-pointer ${
              currentPage === "settings" ? "text-blue-600" : "text-gray-600"
            }`}
            onClick={() => setCurrentPage("settings")}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
