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

  // Simple form submit handler
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    
    // Display confirmation message
    responseMsg.style.display = "block";
    form.reset();

    // Hide message after 5 seconds
    setTimeout(() => {
      responseMsg.style.display = "none";
    }, 5000);
  });
});