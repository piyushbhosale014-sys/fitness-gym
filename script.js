// Smooth scroll with easing
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    const target = document.querySelector(targetId);

    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  });
});
function showLevel(levelId) {
  document.querySelectorAll(".level-box").forEach(box => {
    box.classList.remove("active");
  });

  document.querySelectorAll(".tab").forEach(tab => {
    tab.classList.remove("active");
  });

  document.getElementById(levelId).classList.add("active");
  event.target.classList.add("active");
}
function calculate() {
  const weight = document.getElementById("weight").value;
  const height = document.getElementById("height").value / 100;
  const age = document.getElementById("age").value;
  const gender = document.getElementById("gender").value;
  const activity = document.getElementById("activity").value;

  if (!weight || !height || !age || !gender) {
    document.getElementById("result").innerHTML = "Please fill all fields.";
    return;
  }

  // BMI
  const bmi = (weight / (height * height)).toFixed(1);
  let bmiStatus = "";

  if (bmi < 18.5) bmiStatus = "Underweight";
  else if (bmi < 25) bmiStatus = "Normal";
  else if (bmi < 30) bmiStatus = "Overweight";
  else bmiStatus = "Obese";

  // BMR
  let bmr;
  if (gender === "male") {
    bmr = 10 * weight + 6.25 * (height * 100) - 5 * age + 5;
  } else {
    bmr = 10 * weight + 6.25 * (height * 100) - 5 * age - 161;
  }

  const calories = Math.round(bmr * activity);

  document.getElementById("result").innerHTML = `
    <p><strong>BMI:</strong> ${bmi} (${bmiStatus})</p>
    <p><strong>Maintenance Calories:</strong> ${calories} kcal/day</p>
    <p>➡ For <b>bulking</b>: +300 kcal</p>
    <p>➡ For <b>cutting</b>: −300 kcal</p>
  `;
}
function toggleMenu() {
  document.querySelector(".nav-links").classList.toggle("active");
}
// DARK / LIGHT MODE
function toggleTheme() {
  document.body.classList.toggle("light");

  const isLight = document.body.classList.contains("light");
  localStorage.setItem("theme", isLight ? "light" : "dark");

  document.querySelector(".theme-toggle").textContent = isLight ? "☀️" : "🌙";
}

// LOAD SAVED THEME
window.addEventListener("load", () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") {
    document.body.classList.add("light");
    document.querySelector(".theme-toggle").textContent = "☀️";
  }
});
// STICKY NAVBAR ON SCROLL
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");

  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});
function calculateAndSuggest() {
  const weight = document.getElementById("weight").value;
  const height = document.getElementById("height").value / 100;
  const age = document.getElementById("age").value;
  const gender = document.getElementById("gender").value;
  const activity = document.getElementById("activity").value;

  if (!weight || !height || !age || !gender) {
    alert("Please fill all fields");
    return;
  }

  // BMI
  const bmi = (weight / (height * height)).toFixed(1);

  let goal = "";
  let goalText = "";

  if (bmi < 18.5) {
    goal = "Bulking";
    goalText = "You should focus on muscle gain.";
  } else if (bmi >= 25) {
    goal = "Cutting";
    goalText = "You should focus on fat loss.";
  } else {
    goal = "Maintenance";
    goalText = "Maintain your current fitness.";
  }

  // Remove previous highlights
  document.querySelectorAll(".diet-plan").forEach(card => {
    card.classList.remove("highlight");
  });

  // Highlight matching diet card
  document.querySelectorAll(".diet-plan h3").forEach(title => {
    if (title.innerText.toLowerCase().includes(goal.toLowerCase())) {
      const card = title.parentElement;
      card.classList.add("highlight");

      card.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
    }
  });

  // Show modal result
  document.getElementById("modalResult").innerHTML = `
    <p><strong>BMI:</strong> ${bmi}</p>
    <p><strong>Recommended Goal:</strong> ${goal}</p>
    <p>${goalText}</p>
  `;

  document.getElementById("calcModal").style.display = "flex";
}
let selectedPlan = "";

function openMembershipModal(plan) {
    selectedPlan = plan;
    document.getElementById("membershipModal").style.display = "flex";
}

function closeMembershipModal() {
    document.getElementById("membershipModal").style.display = "none";
}

function proceedToPayment() {
    const name = document.getElementById("memberName").value;
    const age = document.getElementById("memberAge").value;
    const weight = document.getElementById("memberWeight").value;
    const height = document.getElementById("memberHeight").value;
    const goal = document.getElementById("memberGoal").value;

    if (!name || !age || !weight || !height || !goal) {
        alert("Please fill all details!");
        return;
    }

    window.location.href = 
      `payment.html?plan=${selectedPlan}&name=${name}&age=${age}&weight=${weight}&height=${height}&goal=${goal}`;
}