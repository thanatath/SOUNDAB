import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause, faFaceMeh } from "@fortawesome/free-solid-svg-icons";
const WavPlayer = ({ setisShowYoutube }) => {
  const [audioElements, setAudioElements] = useState({});
  const [activeAudioKey, setActiveAudioKey] = useState(null);
  const [playbackPosition, setPlaybackPosition] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRawFile, setIsRawFile] = useState(false);
  const [Changed, setChanged] = useState(0);

  useEffect(() => {
    const preloadAudioFiles = () => {
      const rawFile = "./" + process.env.NEXT_PUBLIC_FILE_RAW;
      console.log(rawFile);
      const fullFile = "./" + process.env.NEXT_PUBLIC_FILE_FULL;

      const audioFiles = {
        raw: new Audio(rawFile),
        full: new Audio(fullFile),
      };
      setAudioElements(audioFiles);
    };

    preloadAudioFiles();
  }, []);

  useEffect(() => {
    if (audioElements[activeAudioKey]) {
      const audioElement = audioElements[activeAudioKey];
      const updatePosition = () => {
        setPlaybackPosition(audioElement.currentTime);
        if (audioElement.currentTime === audioElement.duration) {
          setIsPlaying(false);
          setisShowYoutube(true);
        }
      };

      audioElement.addEventListener("timeupdate", updatePosition);

      return () => {
        audioElement.removeEventListener("timeupdate", updatePosition);
      };
    }
  }, [audioElements, activeAudioKey, setisShowYoutube]);

  const playSound = (key) => {
    setChanged(Changed + 1);

    const audioElement = audioElements[key];
    if (!audioElement) return;

    if (audioElements[activeAudioKey]) {
      audioElements[activeAudioKey].pause();
    }

    audioElement.currentTime = playbackPosition;
    audioElement.play();
    setActiveAudioKey(key);
    setIsPlaying(true);
  };

  const resumePlayback = () => {
    if (audioElements[activeAudioKey]) {
      audioElements[activeAudioKey].currentTime = playbackPosition;
      audioElements[activeAudioKey].play();
      setIsPlaying(true);
    } else {
      playSound("raw");
      setIsRawFile(true);
    }
  };

  const handlePause = () => {
    if (audioElements[activeAudioKey]) {
      setPlaybackPosition(audioElements[activeAudioKey].currentTime);
      audioElements[activeAudioKey].pause();
      setIsPlaying(false);
    }
  };

  const handleSeek = (e) => {
    if (audioElements[activeAudioKey]) {
      const seekTime = parseFloat(e.target.value);
      setPlaybackPosition(seekTime);
      audioElements[activeAudioKey].currentTime = seekTime;
    }
  };

  return (
    <div className="w-full">
      <div className="text-center mb-4">
        <h1 className="text-2xl font-bold">ไฟล์ต้นฉบับ vs ไฟล์ปรับแต่งแล้ว</h1>
      </div>

      <div className="flex flex-row gap-2 mb-4">
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          transition={{ type: "spring", stiffness: 100, delay: 0.1 }}
          animate={{ opacity: 1, x: 0 }}
          className="card flex w-1/2 bg-base-100 shadow-md"
        >
          <div className="card-body">
            <h2 className="card-title text-success">ไฟล์ต้นฉบับ</h2>
            <p>ไฟล์ที่ยังไม่ผ่านการ Mix & Mastering</p>
            <div className="card-actions justify-end">
              <button
                disabled={isRawFile}
                className="btn btn-success mx-auto"
                onClick={() => {
                  if (!isPlaying || activeAudioKey !== "raw") {
                    playSound("raw");
                    setIsRawFile(true);
                  }
                }}
              >
                เลือกฟัง
              </button>
            </div>
          </div>
        </motion.div>
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            transition={{ type: "spring", stiffness: 100, delay: 0.1 }}
            animate={{ opacity: 1, x: 0 }}
            className="card flex w-1/2 bg-base-100 shadow-md"
          >
            <div className="card-body">
              <h2 className="card-title text-warning">ไฟล์ปรับแต่งแล้ว</h2>
              <p>ไฟล์ที่ Mix & Mastering เสร็จสมบูรณ์</p>
              <div className="card-actions justify-end">
                <button
                  disabled={!isRawFile}
                  className=" mx-auto btn btn-warning"
                  onClick={() => {
                    if (!isPlaying || activeAudioKey !== "full") {
                      playSound("full");
                      setIsRawFile(false);
                    }
                  }}
                >
                  เลือกฟัง
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 100 }}
        transition={{
          type: "spring",
          stiffness: 100,
          delay: 0.4,
          duration: 0.5,
        }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <ul className="steps mb-4 ">
          <li className="step step-neutral">
            <span className="text-sm ">
              <p>กด</p>
              <button
                className=" mx-auto btn btn-sm btn-success"
                disabled={isRawFile || Changed > 0}
                onClick={() => {
                  if (!isPlaying || activeAudioKey !== "raw") {
                    playSound("raw");
                    setIsRawFile(true);
                  }
                }}
              >
                เลือกฟัง
              </button>

              <p>ไฟล์ต้นฉบับ</p>
            </span>
          </li>
          <li className={Changed > 0 ? "step step-neutral" : "step"}>
            <span className="text-sm">
              <p>กด</p>
              <button
                className=" mx-auto btn btn-sm btn-warning"
                disabled={!isRawFile || Changed > 1}
                onClick={() => {
                  if (!isPlaying || activeAudioKey == "raw") {
                    playSound("full");
                    setIsRawFile(false);
                  }
                }}
              >
                เลือกฟัง
              </button>
              <p>ไฟล์ที่ปรับแต่งแล้ว</p>
            </span>{" "}
          </li>
          <li className={Changed > 1 ? "step step-neutral" : "step"}>
            <span className="text-sm">สลับฟังเปรียบเทียบได้เลย</span>
          </li>
        </ul>
      </motion.div>

      {audioElements[activeAudioKey] ? (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          transition={{
            type: "spring",
            stiffness: 100,
            delay: 0.2,
            duration: 0.5,
          }}
          animate={{ opacity: 1, y: 0 }}
          className="card card-compact w-full bg-base-100 shadow-md"
        >
          <div className="card-body">
            <h2 className="card-title">
              คุณกำลังฟัง
              <span>
                {isRawFile ? (
                  <span className="text-success">ไฟล์ต้นฉบับ</span>
                ) : (
                  <span className="text-warning">ไฟล์ที่ปรับแต่งแล้ว</span>
                )}
              </span>
            </h2>

            <input
              hidden={!audioElements}
              type="range"
              min={0}
              onChange={handleSeek}
              max={audioElements[activeAudioKey]?.duration.toFixed(0)}
              value={playbackPosition}
              className="range range-info"
            />

            <div className="card-actions mx-auto">
              <div>
                <button
                  className="btn-info btn"
                  onClick={isPlaying ? handlePause : resumePlayback}
                >
                  <div className="mx-auto text-center">
                    {isPlaying ? (
                      <FontAwesomeIcon
                        icon={faPause}
                        style={{ color: "#ffffff" }}
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faPlay}
                        style={{ color: "#ffffff" }}
                      />
                    )}
                  </div>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      ) : null}
    </div>
  );
};

export default WavPlayer;
