// 스켈레톤 이미지 씌우기
const addSkeletonButton = document.getElementById("addSkeletonButton");
addSkeletonButton.addEventListener("click", addSkeletonToVideo);
const canvas = document.getElementById("canvas");
const canvasCtx5 = canvas.getContext('2d');
const video = document.getElementById('fileDisplay');
let skeletonEnabled = false;

// 동영상 위에 스켈레톤 이미지를 씌우는 함수
const pose = new Pose({locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/pose@0.2/${file}`;
    }});

function canPlayEventHandler() {
    console.log("onloadstarted");
    window.skeletonApplied = true;

    // Set the canvas size to the video size
    canvas.width = videoPlayer.videoWidth;
    canvas.height = videoPlayer.videoHeight;

    const updatePose = async () => {
        try {
            // pass the video element
            await pose.send({ image: videoPlayer });
        } catch (error) {
            console.error("Error in pose.send:", error);
        }
        // call the next frame
        requestAnimationFrame(updatePose);
    };
    // start the loop
    updatePose();
    videoPlayer.removeEventListener('canplay', canPlayEventHandler);
}



async function addSkeletonToVideo() {
    skeletonEnabled = !skeletonEnabled; // 버튼 클릭시 토글
    if(skeletonEnabled) { // 스켈레톤 활성화시 pose 설정
        addSkeletonButton.textContent = 'Remove Skeleton'; // Add the line to change the button text
        pose.setOptions({
            modelComplexity: 1,
            smoothLandmarks: true,
            minDetectionConfidence: 0.5,
            minTrackingConfidence: 0.5
        });

        pose.onResults(onResultsPose);

        // 비디오 플레이어가 로드되면 포즈를 감지합니다.
        videoPlayer.addEventListener('canplay', canPlayEventHandler);
    } else {
        addSkeletonButton.textContent = 'Add Skeleton'; // Add the line to change the button text back
        videoPlayer.removeEventListener('canplay', canPlayEventHandler);

        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
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
        addSkeletonButton.textContent = 'Add Skeleton'; // Add the line to change the button text back
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
}
