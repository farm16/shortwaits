document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("reset-password-form");
  const successMessage = document.getElementById("success-message");
  const errorMessage = document.getElementById("error-message");

  // Toggle password visibility
  document.querySelectorAll(".toggle-password").forEach(toggle => {
    toggle.addEventListener("click", () => {
      const targetInput = document.getElementById(toggle.dataset.target);
      if (targetInput.type === "password") {
        targetInput.type = "text";
        toggle.innerHTML = '<i class="fas fa-eye-slash"></i>';
      } else {
        targetInput.type = "password";
        toggle.innerHTML = '<i class="fas fa-eye"></i>';
      }
    });
  });

  // Form submission logic
  form.addEventListener("submit", async event => {
    event.preventDefault();
    const formData = new FormData(form);
    const token = formData.get("token");
    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");

    if (password !== confirmPassword) {
      errorMessage.classList.remove("hidden");
      errorMessage.querySelector(".error").textContent = "Passwords do not match.";
      return;
    }

    try {
      const response = await fetch("/v1/auth/admin/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        successMessage.classList.remove("hidden");
        form.classList.add("hidden");
      } else {
        errorMessage.classList.remove("hidden");
        errorMessage.querySelector(".error").textContent = data.message || "An error occurred.";
      }
    } catch (error) {
      errorMessage.classList.remove("hidden");
      errorMessage.querySelector(".error").textContent = "An error occurred. Please try again.";
    }
  });
});
