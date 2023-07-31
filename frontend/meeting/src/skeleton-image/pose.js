// 스켈레톤 이미지 씌우기
const addSkeletonButton = document.getElementById('addSkeletonButton');
addSkeletonButton.addEventListener('click', addSkeletonToVideo);
const canvas = document.getElementById('canvas');
const canvasCtx5 = canvas.getContext('2d');
const video = document.getElementById('fileDisplay');
let skeletonEnabled = false;

// 동영상 위에 스켈레톤 이미지를 씌우는 함수
const pose = new Pose({
    locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/pose@0.2/${file}`;
    },
});

function canPlayEventHandler() {
    console.log('onloadstarted');
    window.skeletonApplied = true;

    // Set the canvas size to the video size
    canvas.width = videoPlayer.videoWidth;
    canvas.height = videoPlayer.videoHeight;

    const updatePose = async () => {
        try {
            // pass the video element
            await pose.send({ image: videoPlayer });
        } catch (error) {
            console.error('Error in pose.send:', error);
        }
        // call the next frame
        requestAnimationFrame(updatePose);
    };
    // start the loop
    updatePose();
    videoPlayer.removeEventListener('canplay', canPlayEventHandler);
}

// 스케렐톤 씌우기 2
async function addSkeletonToVideo() {
    skeletonEnabled = !skeletonEnabled; // 버튼 클릭시 토글
    if (skeletonEnabled) {
        // 스켈레톤 활성화시 pose 설정
        addSkeletonButton.textContent = 'Remove Skeleton'; // Add the line to change the button text
        pose.setOptions({
            modelComplexity: 1,
            smoothLandmarks: true,
            minDetectionConfidence: 0.5,
            minTrackingConfidence: 0.5,
        });

        pose.onResults(onResultsPose);

        // 비디오 플레이어가 로드되면 포즈를 감지합니다.
        videoPlayer.addEventListener('canplay', canPlayEventHandler);
    } else {
        addSkeletonButton.textContent = 'Add Skeleton'; // Add the line to change the button text back
        videoPlayer.removeEventListener('canplay', canPlayEventHandler);

        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
}

function zColor(data) {
    const z = clamp(data.from.z + 0.5, 0, 1);
    return `rgba(0, ${255 * z}, ${255 * (1 - z)}, 1)`;
}

// Modify the onResults function
function onResultsPose(results) {
    if (skeletonEnabled) {
        // 스켈레톤이 활성화되어 있을 때만 그림
        canvasCtx5.save();
        canvasCtx5.clearRect(0, 0, canvas.width, canvas.height);
        canvasCtx5.drawImage(results.image, 0, 0, canvas.width, canvas.height);
        drawConnectors(canvasCtx5, results.poseLandmarks, POSE_CONNECTIONS, {
            color: (data) => {
                const x0 = canvas.width * data.from.x;
                const y0 = canvas.height * data.from.y;
                const x1 = canvas.width * data.to.x;
                const y1 = canvas.height * data.to.y;

                const z0 = clamp(data.from.z + 0.5, 0, 1);
                const z1 = clamp(data.to.z + 0.5, 0, 1);

                const gradient = canvasCtx5.createLinearGradient(x0, y0, x1, y1);
                gradient.addColorStop(0, `rgba(0, ${255 * z0}, ${255 * (1 - z0)}, 1)`);
                gradient.addColorStop(1.0, `rgba(0, ${255 * z1}, ${255 * (1 - z1)}, 1)`);
                return gradient;
            },
        });
        drawLandmarks(
            canvasCtx5,
            Object.values(POSE_LANDMARKS_LEFT).map((index) => results.poseLandmarks[index]),
            { color: zColor, fillColor: '#FF0000' }
        );
        drawLandmarks(
            canvasCtx5,
            Object.values(POSE_LANDMARKS_RIGHT).map((index) => results.poseLandmarks[index]),
            { color: zColor, fillColor: '#00FF00' }
        );
        drawLandmarks(
            canvasCtx5,
            Object.values(POSE_LANDMARKS_NEUTRAL).map((index) => results.poseLandmarks[index]),
            { color: zColor, fillColor: '#AAAAAA' }
        );
        canvasCtx5.restore();
    } else {
        addSkeletonButton.textContent = 'Add Skeleton'; // Add the line to change the button text back
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    // impactpoint 구현
    if (skeletonEnabled && !calculated) {
        calculateImpactPoint(results);
    }
}

const addSkeletonButton2 = document.getElementById('addSkeletonButton2');
addSkeletonButton2.addEventListener('click', addSkeletonToVideo2);
const canvas2 = document.getElementById('canvas2');
const canvasCtx6 = canvas2.getContext('2d');
const video2 = document.getElementById('fileDisplay2');
let skeletonEnabled2 = false;

// 동영상 위에 스켈레톤 이미지를 씌우는 함수
const pose2 = new Pose({
    locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/pose@0.2/${file}`;
    },
});

function canPlayEventHandler2() {
    console.log('onloadstarted');
    window.skeletonApplied2 = true;

    // Set the canvas size to the video size
    canvas2.width = video2.videoWidth;
    canvas2.height = video2.videoHeight;

    const updatePose2 = async () => {
        try {
            // pass the video element
            await pose2.send({ image: video2 });
        } catch (error) {
            console.error('Error in pose.send:', error);
        }
        // call the next frame
        requestAnimationFrame(updatePose2);
    };
    // start the loop
    updatePose2();
    video2.removeEventListener('canplay', canPlayEventHandler2);
}

async function addSkeletonToVideo2() {
    skeletonEnabled2 = !skeletonEnabled2; // 버튼 클릭시 토글
    if (skeletonEnabled2) {
        // 스켈레톤 활성화시 pose 설정
        addSkeletonButton2.textContent = 'Remove Skeleton'; // Add the line to change the button text
        pose2.setOptions({
            modelComplexity: 1,
            smoothLandmarks: true,
            minDetectionConfidence: 0.5,
            minTrackingConfidence: 0.5,
        });

        pose2.onResults(onResultsPose2);

        // 비디오 플레이어가 로드되면 포즈를 감지합니다.
        video2.addEventListener('canplay', canPlayEventHandler2);
    } else {
        addSkeletonButton2.textContent = 'Add Skeleton'; // Add the line to change the button text back
        video2.removeEventListener('canplay', canPlayEventHandler2);

        const ctx = canvas2.getContext('2d');
        ctx.clearRect(0, 0, canvas2.width, canvas2.height);
    }
}

// Modify the onResults function for the second video
function onResultsPose2(results) {
    if (skeletonEnabled2) {
        // 스켈레톤이 활성화되어 있을 때만 그림
        canvasCtx6.save();
        canvasCtx6.clearRect(0, 0, canvas2.width, canvas2.height);
        canvasCtx6.drawImage(results.image, 0, 0, canvas2.width, canvas2.height);
        drawConnectors(canvasCtx6, results.poseLandmarks, POSE_CONNECTIONS, {
            color: (data) => {
                const x0 = canvas2.width * data.from.x;
                const y0 = canvas2.height * data.from.y;
                const x1 = canvas2.width * data.to.x;
                const y1 = canvas2.height * data.to.y;

                const z0 = clamp(data.from.z + 0.5, 0, 1);
                const z1 = clamp(data.to.z + 0.5, 0, 1);

                const gradient = canvasCtx6.createLinearGradient(x0, y0, x1, y1);
                gradient.addColorStop(0, `rgba(0, ${255 * z0}, ${255 * (1 - z0)}, 1)`);
                gradient.addColorStop(1.0, `rgba(0, ${255 * z1}, ${255 * (1 - z1)}, 1)`);
                return gradient;
            },
        });
        drawLandmarks(
            canvasCtx6,
            Object.values(POSE_LANDMARKS_LEFT).map((index) => results.poseLandmarks[index]),
            { color: zColor, fillColor: '#FF0000' }
        );
        drawLandmarks(
            canvasCtx6,
            Object.values(POSE_LANDMARKS_RIGHT).map((index) => results.poseLandmarks[index]),
            { color: zColor, fillColor: '#00FF00' }
        );
        drawLandmarks(
            canvasCtx6,
            Object.values(POSE_LANDMARKS_NEUTRAL).map((index) => results.poseLandmarks[index]),
            { color: zColor, fillColor: '#AAAAAA' }
        );
        canvasCtx6.restore();
    } else {
        addSkeletonButton2.textContent = 'Add Skeleton'; // Add the line to change the button text back
        const ctx = canvas2.getContext('2d');
        ctx.clearRect(0, 0, canvas2.width, canvas2.height);
    }
}


// impactpoint 구현
let closestTime = null; // 임팩트 시점
let calculated = false; // 한번만 계산하기 위해
let firstTimeCalled = null; // 동영상 한바퀴 재생을 위해
let leftHandAboveLeftShoulder = false; // 상태 변수
let minDistance = null;

const leftHandIndex = 15;
const leftShoulderIndex = 11;
const leftKneeIndex = 25;
const leftHipIndex = 23;

const rightHandIndex = 16;
const rightShoulderIndex = 12;
const rightKneeIndex = 26;
const rightHipIndex = 24;


function calculateImpactPoint(results) {
    if (calculated) return; // 이미 계산이 완료되었으면 함수 종료

    // Check if the pose landmarks exist
    if (results.poseLandmarks) {
        const leftHand = results.poseLandmarks[leftHandIndex];
        const leftShoulder = results.poseLandmarks[leftShoulderIndex];
        const leftKnee = results.poseLandmarks[leftKneeIndex];

        if (leftHand && leftShoulder && leftKnee) {
            // 왼손이 왼쪽어깨 위로 올라간 상태를 확인
            if (leftHand.y < leftShoulder.y) {
                leftHandAboveLeftShoulder = true;
                console.log('leftHandAboveLeftShoulder = true')
            }

            if (leftHandAboveLeftShoulder) {
                // 왼손과 왼쪽 무릎 사이의 거리 계산
                const distance = Math.sqrt(Math.pow(leftHand.x - leftKnee.x, 2) + Math.pow(leftHand.y - leftKnee.y, 2));

                if (minDistance === null || distance < minDistance) {
                    minDistance = distance;
                    closestTime = videoPlayer.currentTime;
                    console.log(video.currentTime)
                }
            }
        }
    }
}


video.addEventListener('timeupdate', () => {
    if (video.currentTime >= video.duration - 0.5 && !calculated) {
        console.log(`The left hand met the left knee at time ${closestTime}`);
        calculated = true;
        console.log('calculated');
    }
});

document.getElementById('impactTime').addEventListener('click', function() {
    const videoPlayer = document.getElementById('fileDisplay');
    videoPlayer.currentTime = closestTime;
    console.log(`leftHandAboveLeftShoulder 상태 : ${leftHandAboveLeftShoulder}`);
    console.log(`closestTime 상태 : ${closestTime}`);
    console.log(`calculated 상태 : ${calculated}`)
});

function resetImpactTime() {
    leftHandAboveLeftShoulder = false; // 상태 변수
    closestTime = null; // 임팩트 시점
    calculated = false; // 한번만 계산하기 위해
    minDistance = null;
    videoPlayer.currentTime = 0.0; // 동영상을 처음부터 다시 시작합니다.
    console.log("Impact time has been reset, ready to recalculate.");
    console.log(`leftHandAboveLeftShoulder 상태 : ${leftHandAboveLeftShoulder}`);
    console.log(`closestTime 상태 : ${closestTime}`);
    // videoPlayer.play(); // 필요한 경우 동영상을 자동으로 다시 시작합니다.

}

// 리셋 버튼에 클릭 이벤트 리스너 추가
document.getElementById('impactTimeReset').addEventListener('click', resetImpactTime);