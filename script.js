document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("passwordForm");
  const resultDiv = document.getElementById("result");
  const passwordDisplay = document.getElementById("passwordDisplay");
  const errorDiv = document.getElementById("error");
  const copyBtn = document.getElementById("copyBtn");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const length = parseInt(document.getElementById("length").value);
    const useUppercase = document.getElementById("uppercase").checked;
    const useLowercase = document.getElementById("lowercase").checked;
    const useNumbers = document.getElementById("numbers").checked;
    const useSpecial = document.getElementById("special").checked;

    let charset = "";
    if (useUppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (useLowercase) charset += "abcdefghijklmnopqrstuvwxyz";
    if (useNumbers) charset += "0123456789";
    if (useSpecial) charset += "!@#$%^&*()_+-=[]{}|;:',.<>?/";

    if (charset === "") {
      resultDiv.style.display = "none";
      errorDiv.textContent = "Please select at least one character type.";
      return;
    }

    let password = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }

    passwordDisplay.textContent = password;
    errorDiv.textContent = "";
    resultDiv.style.display = "block";
  });

  copyBtn.addEventListener("click", function () {
    const text = passwordDisplay.textContent;
    navigator.clipboard.writeText(text).then(() => {
      copyBtn.textContent = "Copied!";
      setTimeout(() => (copyBtn.textContent = "Copy"), 1500);
    });
  });
});
