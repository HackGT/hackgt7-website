import './components/est-footer.js';
import './components/est-register-btn.js';

const signupModal = document.querySelector("#signup-modal");
const signupBtn = document.querySelector("est-register-btn");
const closeModal = document.querySelector("#close-modal");

console.log(signupBtn, signupModal, closeModal);

signupBtn.addEventListener("click", () => {
    signupModal.style.display = "block";
});

closeModal.addEventListener("click", () => {
    signupModal.style.display = "none";
});
