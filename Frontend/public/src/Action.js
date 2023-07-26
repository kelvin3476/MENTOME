// // 모달과 모달 관련 버튼/폼 참조
// const modal = document.getElementById('modal');
// const enterRoomBtn = document.getElementById('openModalBtn'); // "Enter room" 버튼의 ID를 'openModalBtn'로 가정했습니다.
// const modalForm = modal.querySelector('form'); // 모달 내부의 form을 찾습니다.

// // 1-1. Enter room 버튼 클릭 시 모달 숨기기
// enterRoomBtn.addEventListener('click', () => {
//     modal.style.visibility = 'hidden';
// });

// // 1-2. 폼 제출 시 모달 숨기기
// modalForm.addEventListener('submit', (event) => {
//     event.preventDefault(); // 폼의 기본 제출 행위를 막습니다.
//     modal.style.visibility = 'hidden';
//     // 필요한 경우, 여기서 폼 데이터를 처리하거나 AJAX 요청 등을 수행할 수 있습니다.
// });

// // 모달 바깥 영역 클릭 시 모달 숨기기
// window.addEventListener('click', (event) => {
//     if (event.target === modal) {
//         modal.style.visibility = 'hidden';
//     }
// });

// // 모달 닫기 버튼 클릭 시 모달 숨기기
// const closeModalBtn = document.getElementById('closeModalBtn');
// closeModalBtn.addEventListener('click', () => {
//     modal.style.visibility = 'hidden';
// });
