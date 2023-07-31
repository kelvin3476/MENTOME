//=======================
// async function updatePoseOnSeek(video, pose, skeletonEnabled, skeletonCoordinatesExtractor) {
//     if (video.paused && skeletonEnabled) {
//         try {
//             const results = await pose.send({ image: video });
//             const newSkeletonCoordinates = skeletonCoordinatesExtractor(results);
//             return newSkeletonCoordinates;
//         } catch (error) {
//             console.error('Error in pose.send:', error);
//         }
//     }
//     return null;
// }
//===================================
function extractSkeletonCoordinates(results) {
    const skeletonCoordinates = [];
    const indices = [0, 7, 8, 11, 12, 13, 14, 15, 16, 23, 24, 25, 26, 27, 28];

    if (results && results.poseLandmarks) {
        indices.forEach((index) => {
            const x = results.poseLandmarks[index].x;
            const y = results.poseLandmarks[index].y;
            const confidence = results.poseLandmarks[index].visibility;
            skeletonCoordinates.push({x, y,confidence});
        });
    }

    return skeletonCoordinates;
}

// 기준점이 될 좌표
function extractSkeletonCoordinates2(results) {
    const skeletonCoordinates2 = [];
    const indices = [0, 7, 8, 11, 12, 13, 14, 15, 16, 23, 24, 25, 26, 27, 28];

    if (results && results.poseLandmarks) {
        indices.forEach((index) => {
            const x = results.poseLandmarks[index].x;
            const y = results.poseLandmarks[index].y;
            const confidence = results.poseLandmarks[index].visibility;
            skeletonCoordinates2.push({x, y,confidence});
        });
    }

    return skeletonCoordinates2;
}

// 함수: weightedDistanceMatching
function weightedDistanceMatching(vectorPose1XY, vectorPose2XY, vectorConfidences) {
    const summation1 = 1 / vectorConfidences[vectorConfidences.length - 1];
    var summation2 = 0;

    for (var i = 0; i < vectorPose1XY.length; i++) {
        var confIndex = Math.floor(i / 2);
        summation2 += vectorConfidences[confIndex] * Math.abs(vectorPose1XY[i] - vectorPose2XY[i]);
    }
    return summation1 * summation2;
}

// 함수: convertPoseToVector
function convertPoseToVector(pose) {
    var vectorPoseXY = [];
    var vectorPoseConfidences = [];
    var translateX = Number.POSITIVE_INFINITY;
    var translateY = Number.POSITIVE_INFINITY;
    var scaler = Number.NEGATIVE_INFINITY;

    pose.forEach(function (point) {
        var x = point.x;
        var y = point.y;
        vectorPoseXY.push(x, y);
        translateX = Math.min(translateX, x);
        translateY = Math.min(translateY, y);
        scaler = Math.max(scaler, Math.max(x, y));
        vectorPoseConfidences.push(point.confidence);
    });

    return [
        vectorPoseXY,
        vectorPoseConfidences,
        [translateX / scaler, translateY / scaler, scaler]
    ];
}

// 함수: scaleAndTranslate
function scaleAndTranslate(vectorPoseXY, transformValues) {
    var transX = transformValues[0], transY = transformValues[1], scaler = transformValues[2];
    return vectorPoseXY.map(function (position, index) {
        return (index % 2 === 0 ?
            position / scaler - transX :
            position / scaler - transY);
    });
}

// 함수: L2Normalization
function L2Normalization(vectorPoseXY) {
    var absVectorPoseXY = 0;
    vectorPoseXY.forEach(function (position) {
        absVectorPoseXY += Math.pow(position, 2);
    });
    absVectorPoseXY = Math.sqrt(absVectorPoseXY);
    return vectorPoseXY.map(function (position) {
        return position / absVectorPoseXY;
    });
}

// 함수: vectorizeAndNormalize
function vectorizeAndNormalize(pose) {
    var _a = convertPoseToVector(pose);
    var vectorPoseXY = _a[0];
    var vectorPoseTransform = _a[2];
    var vectorPoseConfidences = _a[1];

    vectorPoseXY = scaleAndTranslate(vectorPoseXY, vectorPoseTransform);
    vectorPoseXY = L2Normalization(vectorPoseXY);

    return [vectorPoseXY, vectorPoseConfidences];
}

// 함수: poseSimilarity
function poseSimilarity(pose1, pose2) {
    var _a = vectorizeAndNormalize(pose1);
    var vectorPose1XY = _a[0];
    var vectorPose1Scores = _a[1];

    var vectorPose2XY = vectorizeAndNormalize(pose2)[0];
    return weightedDistanceMatching(vectorPose1XY, vectorPose2XY, vectorPose1Scores);
}

// video1SkeletonCoordinates와 video2SkeletonCoordinates를 여기에 전달하고 결과를 얻습니다.
// const similarity = poseSimilarity(video1SkeletonCoordinates, video2SkeletonCoordinates);
// console.log("Pose Similarity:", similarity);
// if (video1SkeletonCoordinates.length > 0 && video2SkeletonCoordinates.length > 0) {
//     console.log("여기까지 실행");
//     const similarity = poseSimilarity(video1SkeletonCoordinates, video2SkeletonCoordinates);
//     console.log("Pose Similarity:", similarity);
// } else {
//     console.log("실행 x");
//     console.log("Error: Skeleton data is missing for one or both videos. Cannot calculate similarity.");
// }
function calculateSimilarity() {
    // console.log("Video 1 Skeleton Coordinates:", video1SkeletonCoordinates);
    // console.log("Video 2 Skeleton Coordinates:", video2SkeletonCoordinates);

    if (video1SkeletonCoordinates.length > 0 && video2SkeletonCoordinates.length > 0) {
        

        const similarity = poseSimilarity(video1SkeletonCoordinates, video2SkeletonCoordinates);
        // console.log("Pose Similarity:", similarity);
        // var maxPossibleDist = 2;
        // var similarityPercentage = poseSimilarityPercentage(video1SkeletonCoordinates, video2SkeletonCoordinates, maxPossibleDist);
        var minPossibleDist = 0;
        var maxPossibleDist = 2;
        
        var similarityNormalized = (similarity - minPossibleDist) / (maxPossibleDist - minPossibleDist); // 유사도 정규화
        
        var similarityPercentage = (1- similarityNormalized) * 100; // 백분율로 변환
        console.log("Pose Similarity Percentage:", similarityPercentage.toFixed(1) + "%");
    } else {
        console.log("스켈레톤 이미지가 없습니다");
    }
}

function poseSimilarityPercentage(pose1, pose2, maxPossibleDist) {
    var similarity = poseSimilarity(pose1, pose2);

    // 최대 가능한 유사도 값으로 나누어 백분율을 얻습니다.
    var similarityPercentage = 1 - (similarity / maxPossibleDist);

    return similarityPercentage;
}



const measureSimilarityButton = document.getElementById('measureSimilarity');
measureSimilarityButton.addEventListener('click', calculateSimilarity);