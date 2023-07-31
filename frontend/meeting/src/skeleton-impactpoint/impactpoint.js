// impactpoint 구현
let closestTime = null; // 임팩트 시점
let calculated = false; // 한번만 계산하기 위해
let leftHandAboveLeftShoulder = false; // 상태 변수
let minDistance = null;

const leftHandIndex = 15;
const leftShoulderIndex = 11;
const leftKneeIndex = 25;


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
}

// 리셋 버튼에 클릭 이벤트 리스너 추가
document.getElementById('impactTimeReset').addEventListener('click', resetImpactTime);