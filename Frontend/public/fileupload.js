// 파일 업로드
const fileUploadForm = document.getElementById("fileUpload");
const selectedFileInput = document.getElementById("selectedFile");

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

socket.on("new_file", (url) => {
    const fileDisplayElement = document.getElementById("fileDisplay");
    fileDisplayElement.src = url;
});