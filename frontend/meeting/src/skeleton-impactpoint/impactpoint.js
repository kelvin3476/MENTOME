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

// 추가 작업
let timeline1 = [];
let timeline2 = [];
let impactTimes1 = [];
let impactTimes2 = [];

function videoPauser1() {
    if (video.currentTime > 0.09) {
        requestAnimationFrame(videoPauser1);
    } else {
        video.playbackRate = 1;
        video.pause();
        waitImpact = true;
    }
}

function videoPauser2() {
    if (video2.currentTime > 0.09) {
        requestAnimationFrame(videoPauser2);
    } else {
        video2.playbackRate = 1;
        video2.pause();
        waitImpact = true;
    }
}

function getPosition1(results) {
    const landmark = [];
    let indices = [0, 12, 13, 14, 15, 16, 23];

    if (results && results.poseLandmarks) {
        indices.forEach((index) => {
            const x = results.poseLandmarks[index].x;
            const y = results.poseLandmarks[index].y;
            landmark.push([x, y]);
        });
    }

    return landmark;
}

function getPosition2(results) {
    const landmark = [];
    let indices = [0, 12, 13, 14, 15, 16, 23];

    if (results && results.poseLandmarks) {
        indices.forEach((index) => {
            const x = results.poseLandmarks[index].x;
            const y = results.poseLandmarks[index].y;
            landmark.push([x, y]);
        });
    }

    return landmark;
}

function getImpact1() {
    let saveFlag1 = true;
    let saveFlag2 = true;
    let saveFlag3 = true;
    for (let i = 5; i < timeline1.length; i++) {
        if (saveFlag1 && timeline1[i].positions[5][1] < timeline1[i].positions[0][1]) {
            impactTimes1.push(timeline1[i].videoTime);
            saveFlag1 = false;
        } else if (!saveFlag1 && saveFlag2 && timeline1[i].positions[4][0] > timeline1[i].positions[6][0]) {
            impactTimes1.push(timeline1[i].videoTime);
            saveFlag2 = false;
        } else if (!saveFlag1 && !saveFlag2 && saveFlag3 && timeline1[i].positions[5][0] < timeline1[i].positions[0][0]) {
            impactTimes1.push(timeline1[i].videoTime);
            saveFlag3 = false;
            break;
        }
    }
}

function getImpact2() {
    let saveFlag1 = true;
    let saveFlag2 = true;
    let saveFlag3 = true;
    for (let i = 5; i < timeline2.length; i++) {
        if (saveFlag1 && timeline2[i].positions[5][1] < timeline2[i].positions[0][1]) {
            impactTimes2.push(timeline2[i].videoTime);
            saveFlag1 = false;
        } else if (!saveFlag1 && saveFlag2 && timeline2[i].positions[4][0] > timeline2[i].positions[6][0]) {
            impactTimes2.push(timeline2[i].videoTime);
            saveFlag2 = false;
        } else if (!saveFlag1 && !saveFlag2 && saveFlag3 && timeline2[i].positions[5][0] < timeline2[i].positions[0][0]) {
            impactTimes2.push(timeline2[i].videoTime);
            saveFlag3 = false;
            break;
        }
    }
}
//[0, 13, 14, 15, 16, 23]

function timelinePusher1() {
    if (video.currentTime != 0) {
        let positionInfo = [];
        positionInfo.videoTime = video.currentTime;
        positionInfo.positions = similpos1;
        timeline1.push(positionInfo);
    }

    if (!video.paused) {
        requestAnimationFrame(timelinePusher1);
    } else {
        console.log('stop');
        getImpact1();
    }   
}

function timelinePusher2() {
    if (video2.currentTime != 0) {
        let positionInfo = [];
        positionInfo.videoTime = video2.currentTime;
        positionInfo.positions = similpos2;
        timeline2.push(positionInfo);
    }

    if (!video2.paused) {
        requestAnimationFrame(timelinePusher2);
    } else {
        console.log('stop');
        getImpact2();
    }   
}

function calImpact1() {
    timeline1 = [];
    impactTimes1 = [];
    waitImpact = false;

    video.pause();
    video.currentTime = 0.1;
    video.playbackRate = 1;
    video.play();
    videoPauser1();

    timelinePusher1();
}

function calImpact2() {
    timeline2 = [];
    impactTimes2 = [];
    waitImpact = false;

    video2.pause();
    video2.currentTime = 0.1;
    video2.playbackRate = 1;
    video2.play();
    videoPauser2();

    timelinePusher2();
}

document.getElementById('impactTime1').addEventListener('click', function() {
    video.pause();
    video2.pause();
    video.currentTime = impactTimes1[0];
    video2.currentTime = impactTimes2[0];
    console.log(impactTimes1[0]);
    console.log(impactTimes2[0]);
});

document.getElementById('impactTime2').addEventListener('click', function() {
    video.pause();
    video2.pause();
    video.currentTime = impactTimes1[1];
    video2.currentTime = impactTimes2[1];
    console.log(impactTimes1[1]);
    console.log(impactTimes2[1]);
});

document.getElementById('impactTime3').addEventListener('click', function() {
    video.pause();
    video2.pause();
    video.currentTime = impactTimes1[2];
    video2.currentTime = impactTimes2[2];
    console.log(impactTimes1[2]);
    console.log(impactTimes2[2]);
});

document.getElementById('impactTimeReset2').addEventListener('click', function() {
    calImpact1();
    calImpact2();
});

document.getElementById('testbutton').addEventListener('click', function() {
    console.log(timeline1);
    console.log(timeline2);
    console.log(impactTimes1);
    console.log(impactTimes2);
});
