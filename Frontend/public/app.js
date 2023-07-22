// app.js
const socket = io();

const myFace = document.getElementById("myFace");
const muteBtn = document.getElementById("mute");
const cameraBtn = document.getElementById("camera");
const camerasSelect = document.getElementById("cameras");

const call = document.getElementById("call");

// 파일 업로드
const fileUploadForm = document.getElementById("fileUpload");
const selectedFileInput = document.getElementById("selectedFile");

// 동영상 동기화
const videoPlayer = document.getElementById("fileDisplay");
console.log("Video player src: ", videoPlayer.src);
let serverEvent = false;

// 특정 버튼을 누르면 동영상 위에 스켈레톤 이미지 씌우기
const addSkeletonButton = document.getElementById("addSkeletonButton");
addSkeletonButton.addEventListener("click", addSkeletonToVideo);
const canvas = document.getElementById("canvas");
const canvasCtx5 = canvas.getContext('2d');
const video = document.getElementById('fileDisplay');
let skeletonEnabled = false;


call.hidden = true;

let myStream;
let muted = false;
let cameraOff = false;
let roomName;
let myPeerConnection;
let myDataChannel;

async function getCameras() {
  try {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const cameras = devices.filter((device) => device.kind === "videoinput");
    const currentCamera = myStream.getVideoTracks()[0];
    cameras.forEach((camera) => {
      const option = document.createElement("option");
      option.value = camera.deviceId;
      option.innerText = camera.label;
      if (currentCamera.label === camera.label) {
        option.selected = true;
      }
      camerasSelect.appendChild(option);
    });
  } catch (e) {
    console.log(e);
  }
}

async function getMedia(deviceId) {
  const initialConstraints = {
    audio: true,
    video: { facingMode: "user" },
  };

  const cameraConstraints = {
    audio: true,
    video: { deviceId: { exact: deviceId } },
  };

  try {
    myStream = await navigator.mediaDevices.getUserMedia(
        deviceId ? cameraConstraints : initialConstraints
    );

    myFace.srcObject = myStream;
    if (!deviceId) {
      await getCameras();
    }

    // 성공적으로 스트림을 가져왔는지 확인하기 위해 콘솔에 출력합니다.
    console.log("Successfully acquired media stream:", myStream);
  } catch (e) {
    console.error("Error getting media stream:", e);
  }
}

function handleMuteClick() {
  myStream.getAudioTracks().forEach((track) => (track.enabled = !track.enabled));
  if (!muted) {
    muteBtn.innerText = "Unmute";
    muted = true;
  } else {
    muteBtn.innerText = "Mute";
    muted = false;
  }
}

function handleCameraClick() {
  myStream.getVideoTracks().forEach((track) => (track.enabled = !track.enabled));
  if (cameraOff) {
    cameraBtn.innerText = "Turn Camera Off";
    cameraOff = false;
  } else {
    cameraBtn.innerText = "Turn Camera On";
    cameraOff = true;
  }
}

async function handleCameraChange() {
  await getMedia(camerasSelect.value);

  if (muted) {
    myStream.getAudioTracks().forEach((track) => (track.enabled = false));
  } else {
    myStream.getAudioTracks().forEach((track) => (track.enabled = true));
  }

  if (myPeerConnection) {
    const videoTrack = myStream.getVideoTracks()[0];
    const videoSender = myPeerConnection
        .getSenders()
        .find((sender) => sender.track.kind === "video");
    videoSender.replaceTrack(videoTrack);
  }
}

muteBtn.addEventListener("click", handleMuteClick);
cameraBtn.addEventListener("click", handleCameraClick);
camerasSelect.addEventListener("input", handleCameraChange);

// Welcome Form (join a room)

const welcome = document.getElementById("welcome");
const welcomeForm = welcome.querySelector("form");

async function initCall() {
  welcome.hidden = true;
  call.hidden = false;
  await getMedia();
  makeConnection();
}

async function handleWelcomeSubmit(event) {
  event.preventDefault();
  const input = welcomeForm.querySelector("input");
  await initCall();
  socket.emit("join_room", input.value);
  roomName = input.value;
  input.value = "";
}

welcomeForm.addEventListener("submit", handleWelcomeSubmit);

// Socket Code

// Chrome
socket.on("welcome", async () => {
  myDataChannel = myPeerConnection.createDataChannel("chat");
  myDataChannel.addEventListener("message", (event) => console.log(event.data));
  console.log("made data channel");
  const offer = await myPeerConnection.createOffer();
  myPeerConnection.setLocalDescription(offer);
  console.log("sent the offer");
  socket.emit("offer", offer, roomName);
});

// Firefox
socket.on("offer", async (offer) => {
  myPeerConnection.addEventListener("datachannel", (event) => {
    myDataChannel = event.channel;
    myDataChannel.addEventListener("message", (event) => console.log(event.data));
  });
  console.log("received the offer");
  myPeerConnection.setRemoteDescription(offer);
  const answer = await myPeerConnection.createAnswer();
  myPeerConnection.setLocalDescription(answer);
  socket.emit("answer", answer, roomName);
  console.log("sent the answer");
});

socket.on("answer", (answer) => {
  console.log("received the answer");
  myPeerConnection.setRemoteDescription(answer);
});

socket.on("ice", (ice) => {
  console.log("received candidate");
  myPeerConnection.addIceCandidate(ice);
});

// RTC Code

function makeConnection() {
  myPeerConnection = new RTCPeerConnection({
    iceServers: [
      {
        urls: [
          "stun:stun.l.google.com:19302",
          "stun:stun1.l.google.com:19302",
          "stun:stun2.l.google.com:19302",
          // "stun:stun3.l.google.com:19302",
          // "stun:stun4.l.google.com:19302",
        ],
      },
    ],
  });
  myPeerConnection.addEventListener("icecandidate", handleIce);
  myPeerConnection.addEventListener("addstream", handleAddStream);
  myStream.getTracks().forEach((track) => myPeerConnection.addTrack(track, myStream));
}

function handleIce(data) {
  console.log("sent candidate");
  socket.emit("ice", data.candidate, roomName);
}

function handleAddStream(data) {
  const peerFace = document.getElementById("peerFace");
  peerFace.srcObject = data.stream;
}

const form = welcome.querySelector("form");
const room = document.getElementById("room");

room.hidden = true;

function addMessage(message) {
  const ul = room.querySelector("ul");
  const li = document.createElement("li");
  li.innerText = message;
  ul.appendChild(li);
}

function handleMessageSubmit(event) {
  event.preventDefault();
  const input = room.querySelector("#msg input");
  const value = input.value;
  socket.emit("new_message", input.value, roomName, () => {
    addMessage(`You: ${value}`);
  });
  input.value = "";
}

function handleNicknameSubmit(event) {
  event.preventDefault();
  const input = room.querySelector("#name input");
  socket.emit("nickname", input.value);
}

function showRoom() {
  // Show file upload form when entering a room
  fileUploadForm.style.display = "block";
  welcome.hidden = true;
  room.hidden = false;
  const h3 = room.querySelector("h3");
  h3.innerText = `Room ${roomName}`;
  const msgForm = room.querySelector("#msg");
  const nameForm = room.querySelector("#name");
  msgForm.addEventListener("submit", handleMessageSubmit);
  nameForm.addEventListener("submit", handleNicknameSubmit);

  // 스켈레톤 이미지 관련
  video.addEventListener('loadedmetadata', function() {
    canvasCtx5.width = video.videoWidth;
    canvasCtx5.height = video.videoHeight;
  });
}

function handleRoomSubmit(event) {
  event.preventDefault();
  const input = form.querySelector("input");
  socket.emit("enter_room", input.value, showRoom);
  roomName = input.value;
  input.value = "";
}

form.addEventListener("submit", handleRoomSubmit);

socket.on("welcome", (user, newCount) => {
  const h3 = room.querySelector("h3");
  h3.innerText = `Room ${roomName} (${newCount})`;
  addMessage(`${user} arrived!`);
});

socket.on("bye", (left, newCount) => {
  const h3 = room.querySelector("h3");
  h3.innerText = `Room ${roomName} (${newCount})`;
  addMessage(`${left} left ㅠㅠ`);
});

socket.on("new_message", addMessage);

socket.on("room_change", (rooms) => {
  const roomList = welcome.querySelector("ul");
  roomList.innerHTML = "";
  if (rooms.length === 0) {
    return;
  }
  rooms.forEach((room) => {
    const li = document.createElement("li");
    li.innerText = room;
    roomList.append(li);
  });
});

socket.on("new_file", (url) => {
  const fileDisplayElement = document.getElementById("fileDisplay");
  fileDisplayElement.src = url;
});

// 파일 업로드
fileUploadForm.addEventListener("submit", (event) => {
  event.preventDefault();

  // Get the selected file
  const selectedFile = selectedFileInput.files[0];
  console.log(selectedFile.name);
  if (selectedFile) {
    // Create a FormData object
    let formData = new FormData();
    // Add the file to the form data
    formData.append("file", selectedFile);

    // Send the form data using fetch
    fetch("/api/upload", {
      method: "POST",
      body: formData,
    })
        .then((response) => response.json())
        .then((data) => {
          console.log("File uploaded successfully. Server Response: ", data);
          socket.emit("file_uploaded", data.url, roomName);
          // Assume there is an img or video element to display the uploaded file
          const fileDisplayElement = document.getElementById("fileDisplay");
          fileDisplayElement.src = data.url;
        })
        .catch((error) => {
          console.error("Error uploading file: ", error);
        });

    // Clear the input
    selectedFileInput.value = "";
  }
});





// 동영상 동기화
let throttleTimeout;

async function playVideo(timestamp) {
  serverEvent = true;
  return new Promise((resolve) => {
    videoPlayer.onplaying = function() {
      videoPlayer.onplaying = null;
      serverEvent = false;
      resolve();
    };
    videoPlayer.currentTime = timestamp;
    videoPlayer.play();
  });
}

async function pauseVideo(timestamp) {
  serverEvent = true;
  return new Promise((resolve) => {
    videoPlayer.onpause = function() {
      videoPlayer.onpause = null;
      serverEvent = false;
      resolve();
    };
    videoPlayer.currentTime = timestamp;
    videoPlayer.pause();
  });
}

// socket.io 이벤트 리스너 추가
socket.on("play_video", async (timestamp) => {
  await playVideo(timestamp);
  serverEvent = false;
});

socket.on("pause_video", async (timestamp) => {
  await pauseVideo(timestamp);
  serverEvent = false;
});

socket.on("seek_video", (timestamp) => {
  if (!serverEvent) {
    videoPlayer.currentTime = timestamp;
  }
});

videoPlayer.addEventListener("play", (event) => {
  if (!serverEvent) {
    if (throttleTimeout) clearTimeout(throttleTimeout);

    throttleTimeout = setTimeout(() => {
      socket.emit("play_video", videoPlayer.currentTime, roomName);
    }, 100);
  }
});

videoPlayer.addEventListener("pause", (event) => {
  if (!serverEvent) {
    if (throttleTimeout) clearTimeout(throttleTimeout);

    throttleTimeout = setTimeout(() => {
      socket.emit("pause_video", videoPlayer.currentTime, roomName);
    }, 100);
  }
});

videoPlayer.addEventListener("seeked", (event) => {
  if (!serverEvent) {
    if (throttleTimeout) clearTimeout(throttleTimeout);

    throttleTimeout = setTimeout(() => {
      socket.emit("seek_video", videoPlayer.currentTime, roomName);
    }, 100);
  }
});






// 동영상 위에 스켈레톤 이미지를 씌우는 함수
const pose = new Pose({locateFile: (file) => {
    return `https://cdn.jsdelivr.net/npm/@mediapipe/pose@0.2/${file}`;
  }});

async function addSkeletonToVideo() {
  skeletonEnabled = !skeletonEnabled; // 버튼 클릭시 토글
  if(skeletonEnabled) { // 스켈레톤 활성화시 pose 설정
    pose.setOptions({
      modelComplexity: 1,
      smoothLandmarks: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5
    });

    pose.onResults(onResultsPose);

    // 비디오 플레이어가 로드되면 포즈를 감지합니다.
    videoPlayer.oncanplay = () => {
      console.log("onloadstarted");
      window.skeletonApplied = true;

      // Set the canvas size to the video size
      canvas.width = videoPlayer.videoWidth;
      canvas.height = videoPlayer.videoHeight;

      const updatePose = async () => {
        const currentTime = videoPlayer.currentTime;
        try {
          // pass the video element instead of the time
          await pose.send({ image: videoPlayer });
        } catch (error) {
          console.error("Error in pose.send:", error);
        }
        // call the next frame
        requestAnimationFrame(updatePose);
      };

      // start the loop
      updatePose();
    };
  }
}

function zColor(data) {
  const z = clamp(data.from.z + 0.5, 0, 1);
  return `rgba(0, ${255 * z}, ${255 * (1 - z)}, 1)`;
}

// Modify the onResults function
function onResultsPose(results) {
  if(skeletonEnabled) { // 스켈레톤이 활성화되어 있을 때만 그림
    console.log("onResultsPose called with results:");
    console.log(results);

    canvasCtx5.save();
    canvasCtx5.clearRect(0, 0, canvas.width, canvas.height);
    canvasCtx5.drawImage(
        results.image, 0, 0, canvas.width, canvas.height);
    drawConnectors(
        canvasCtx5, results.poseLandmarks, POSE_CONNECTIONS, {
          color: (data) => {
            const x0 = canvas.width * data.from.x;
            const y0 = canvas.height * data.from.y;
            const x1 = canvas.width * data.to.x;
            const y1 = canvas.height * data.to.y;

            const z0 = clamp(data.from.z + 0.5, 0, 1);
            const z1 = clamp(data.to.z + 0.5, 0, 1);

            const gradient = canvasCtx5.createLinearGradient(x0, y0, x1, y1);
            gradient.addColorStop(
                0, `rgba(0, ${255 * z0}, ${255 * (1 - z0)}, 1)`);
            gradient.addColorStop(
                1.0, `rgba(0, ${255 * z1}, ${255 * (1 - z1)}, 1)`);
            return gradient;
          }
        });
    drawLandmarks(
        canvasCtx5,
        Object.values(POSE_LANDMARKS_LEFT)
            .map(index => results.poseLandmarks[index]),
        {color: zColor, fillColor: '#FF0000'});
    drawLandmarks(
        canvasCtx5,
        Object.values(POSE_LANDMARKS_RIGHT)
            .map(index => results.poseLandmarks[index]),
        {color: zColor, fillColor: '#00FF00'});
    drawLandmarks(
        canvasCtx5,
        Object.values(POSE_LANDMARKS_NEUTRAL)
            .map(index => results.poseLandmarks[index]),
        {color: zColor, fillColor: '#AAAAAA'});
    canvasCtx5.restore();
  } else {
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
}