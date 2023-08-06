// 파일 업로드
const fileUploadForm = document.getElementById('fileUpload');
const selectedFileInput = document.getElementById('selectedFile');

// 파일2 업로드
const fileUploadForm2 = document.getElementById('fileUpload2');
const selectedFileInput2 = document.getElementById('selectedFile2');

// 파일 업로드
fileUploadForm.addEventListener('change', (event) => {
    event.preventDefault();

    // 만약 스켈레톤이 활성화되어 있다면 제거
    if (skeletonEnabled) {
        addSkeletonToVideo();
    }

    // Get the selected file
    const selectedFile = selectedFileInput.files[0];
    console.log(selectedFile.name);
    if (selectedFile) {
        // Create a FormData object
        let formData = new FormData();
        // Add the file to the form data
        formData.append('file', selectedFile);

        // Send the form data using fetch
        fetch('/api/s3/upload', {
            method: 'POST',
            body: formData,
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('File uploaded successfully. Server Response: ', data);
                socket.emit('file_uploaded', data.url, roomName);
                // Assume there is an img or video element to display the uploaded file
                const fileDisplayElement = document.getElementById('fileDisplay');
                fileDisplayElement.src = data.url;
                // Show the video player
                fileDisplayElement.style.display = 'block';
            })
            .catch((error) => {
                console.error('Error uploading file: ', error);
                fileDisplayElement.style.display = 'none';
            });

        // Clear the input
        selectedFileInput.value = '';
    }
});

fileUploadForm2.addEventListener('change', (event) => {
    event.preventDefault();

    // 만약 스켈레톤이 활성화되어 있다면 제거
    if (skeletonEnabled2) {
        addSkeletonToVideo2();
    }

    // Get the selected file
    const selectedFile = selectedFileInput2.files[0];
    console.log(selectedFile.name);
    if (selectedFile) {
        // Create a FormData object
        let formData = new FormData();
        // Add the file to the form data
        formData.append('file', selectedFile);

        // Send the form data using fetch
        fetch('/api/s3/upload', {
            method: 'POST',
            body: formData,
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('File uploaded successfully. Server Response: ', data);
                socket.emit('file_uploaded2', data.url, roomName);
                // Assume there is an img or video element to display the uploaded file
                const fileDisplayElement2 = document.getElementById('fileDisplay2');
                fileDisplayElement2.src = data.url;
                // Show the video player
                fileDisplayElement2.style.display = 'block';
            })
            .catch((error) => {
                console.error('Error uploading file: ', error);
            });

        // Clear the input
        selectedFileInput2.value = '';
    }
});

socket.on('new_file', (url) => {
    const fileDisplayElement = document.getElementById('fileDisplay');
    fileDisplayElement.src = url;
    // Show the video player
    fileDisplayElement.style.display = 'block';

    // 만약 스켈레톤이 활성화되어 있다면 제거
    if (skeletonEnabled) {
        addSkeletonToVideo();
    }
});

// 파일2 업로드
socket.on('new_file2', (url) => {
    const fileDisplayElement2 = document.getElementById('fileDisplay2');
    fileDisplayElement2.src = url;
    // Show the video player
    fileDisplayElement2.style.display = 'block';

    // 만약 스켈레톤이 활성화되어 있다면 제거
    if (skeletonEnabled2) {
        addSkeletonToVideo2();
    }
});

// 파일 업로드 드랍다운 버튼

function toggleDropdown() {
    const dropdownContent = document.getElementById('dropdownContent');
    dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
}

const uploadedFile = document.getElementById('uploadedFile');
const uploadedFile2 = document.getElementById('uploadedFile2');

// 파일 업로드 toggle 버튼

fileUploadForm.addEventListener('click', () => {
    if (uploadedFile.style.display === 'none') {
        uploadedFile.style.display = 'block';
    } else {
        uploadedFile.style.display = 'none';
    }
});

// 파일 업로드 toggle 버튼2

fileUploadForm2.addEventListener('click', () => {
    if (uploadedFile2.style.display === 'none') {
        uploadedFile2.style.display = 'block';
    } else {
        uploadedFile2.style.display = 'none';
    }
});
