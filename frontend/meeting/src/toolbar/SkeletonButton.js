const skeletonDropdownButton = document.getElementById('skeleton-dropdown-button');
const skeletonDropdownContent = document.getElementById('skeleton-dropdown-content');

skeletonDropdownButton.addEventListener('click', function () {
    if (skeletonDropdownContent.style.display === 'block') {
        skeletonDropdownContent.style.display = 'none';
    } else {
        skeletonDropdownContent.style.display = 'block';
    }
});

const impactDropdownButton = document.getElementById('impact-dropdown-button');
const impactDropdownContent = document.getElementById('impact-dropdown-content');

impactDropdownButton.addEventListener('click', function () {
    if (impactDropdownContent.style.display === 'block') {
        impactDropdownContent.style.display = 'none';
    } else {
        impactDropdownContent.style.display = 'block';
    }
});

const uploadDropdownButton = document.getElementById('upload-dropdown-button');
const uploadDropdownContent = document.getElementById('upload-dropdown-content');

uploadDropdownButton.addEventListener('click', function () {
    if (uploadDropdownContent.style.display === 'block') {
        uploadDropdownContent.style.display = 'none';
    } else {
        uploadDropdownContent.style.display = 'block';
    }
});
