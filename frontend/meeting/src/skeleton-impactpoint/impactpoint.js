// impactpoint 구현

let closestTime = null; // 임팩트 시점
let calculated = false; // 한번만 계산하기 위해
let leftHandAboveLeftShoulder = false; // 상태 변수
let minDistance = null;

let closestTime2 = null; // 임팩트 시점
let calculated2 = false; // 한번만 계산하기 위해
let leftHandAboveLeftShoulder2 = false; // 상태 변수
let minDistance2 = null;

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





function calculateImpactPoint2(results) {
    if (calculated2) return; // 이미 계산이 완료되었으면 함수 종료

    // Check if the pose landmarks exist
    if (results.poseLandmarks) {
        const leftHand = results.poseLandmarks[leftHandIndex];
        const leftShoulder = results.poseLandmarks[leftShoulderIndex];
        const leftKnee = results.poseLandmarks[leftKneeIndex];

        if (leftHand && leftShoulder && leftKnee) {
            // 왼손이 왼쪽어깨 위로 올라간 상태를 확인
            if (leftHand.y < leftShoulder.y) {
                leftHandAboveLeftShoulder2 = true;
                console.log('leftHandAboveLeftShoulder2 = true')
            }

            if (leftHandAboveLeftShoulder2) {
                // 왼손과 왼쪽 무릎 사이의 거리 계산
                const distance = Math.sqrt(Math.pow(leftHand.x - leftKnee.x, 2) + Math.pow(leftHand.y - leftKnee.y, 2));

                if (minDistance2 === null || distance < minDistance2) {
                    minDistance2 = distance;
                    closestTime2 = video2.currentTime;
                    console.log(video2.currentTime)
                }
            }
        }
    }
}

video2.addEventListener('timeupdate', () => {
    if (video2.currentTime >= video2.duration - 0.5 && !calculated2) {
        console.log(`The left hand met the left knee at time ${closestTime2}`);
        calculated2 = true;
        console.log('calculated2');
    }
});



// 공용
document.getElementById('impactTime').addEventListener('click', function() {
    video.currentTime = closestTime;
    video2.currentTime = closestTime2;
    video.pause();
    video2.pause();
    console.log(`leftHandAboveLeftShoulder 상태 : ${leftHandAboveLeftShoulder}`);
    console.log(`closestTime 상태 : ${closestTime}`);
    console.log(`calculated 상태 : ${calculated}`)
});

function resetImpactTime() {
    leftHandAboveLeftShoulder = false; // 상태 변수
    closestTime = null; // 임팩트 시점
    calculated = false; // 한번만 계산하기 위해
    minDistance = null;
    video.currentTime = 0; // 동영상을 처음부터 다시 시작합니다.
    video.play();

    leftHandAboveLeftShoulder2 = false; // 상태 변수
    closestTime2 = null; // 임팩트 시점
    calculated2 = false; // 한번만 계산하기 위해
    minDistance2 = null;
    video2.currentTime = 0; // 동영상을 처음부터 다시 시작합니다.
    video2.play();

    console.log("Impact time has been reset, ready to recalculate.");
    console.log(`leftHandAboveLeftShoulder 상태 : ${leftHandAboveLeftShoulder}`);
    console.log(`closestTime 상태 : ${closestTime}`);
}

// 리셋 버튼에 클릭 이벤트 리스너 추가
document.getElementById('impactTimeReset').addEventListener('click', resetImpactTime);