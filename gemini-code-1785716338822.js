document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".nav-item");
  const pageSections = document.querySelectorAll(".page-section");
  const navTriggers = document.querySelectorAll(".nav-trigger");
  const form = document.getElementById("registration-form");
  const responseMsg = document.getElementById("form-response");

  // Function to switch visible section
  function navigateTo(targetId) {
    pageSections.forEach((section) => {
      if (section.id === targetId) {
        section.classList.add("active");
      } else {
        section.classList.remove("active");
      }
    });

    navLinks.forEach((link) => {
      if (link.getAttribute("href") === `#${targetId}`) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // Handle nav item clicks
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href").substring(1);
      navigateTo(targetId);
    });
  });

  // Handle call-to-action buttons (like "Register Here" on Home)
  navTriggers.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = btn.getAttribute("href").substring(1);
      navigateTo(targetId);
    });
  });

  // Formspree AJAX Handler
  if (form) {
    form.addEventListener("submit", async function (e) {
      e.preventDefault(); // Stop default browser redirect

      const data = new FormData(form);

      try {
        const response = await fetch(form.action, {
          method: form.method,
          body: data,
          headers: {
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          // Success response
          responseMsg.innerText = "Thank you for registering! We will be in touch soon.";
          responseMsg.style.display = "block";
          form.reset();
        } else {
          // Formspree returned an error status
          const responseData = await response.json();
          if (Object.hasOwn(responseData, 'errors')) {
            responseMsg.innerText = responseData["errors"].map(error => error["message"]).join(", ");
          } else {
            responseMsg.innerText = "Oops! There was a problem submitting your form.";
          }
          responseMsg.style.display = "block";
        }
      } catch (error) {
        // Network failure or fetch error
        responseMsg.innerText = "Oops! Network error. Please try again later.";
        responseMsg.style.display = "block";
      }

      // Hide the notification message after 6 seconds
      setTimeout(() => {
        responseMsg.style.display = "none";
      }, 6000);
    });
  }
});