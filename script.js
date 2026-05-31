const form = document.getElementById("gradeForm");
const studentNameInput = document.getElementById("studentName");
const studentMarkInput = document.getElementById("studentMark");
const result = document.getElementById("result");
const studentList = document.getElementById("studentList");
const resetBtn = document.getElementById("resetBtn");
const count = document.getElementById("count");

let submissions = 0;

function setResult(message, type) {
  result.textContent = message;
  result.className = type;
}

function clearErrors() {
  studentNameInput.classList.remove("error");
  studentMarkInput.classList.remove("error");
}

function updateCount() {
  count.textContent = `${submissions} submission${submissions === 1 ? "" : "s"}`;
}

form.addEventListener("submit", function (event) {
  event.preventDefault();
  clearErrors();

  const studentName = studentNameInput.value.trim();
  const markValue = studentMarkInput.value.trim();
  const studentMark = parseInt(markValue, 10);

  if (studentName === "") {
    studentNameInput.classList.add("error");
    setResult("Please enter a student name.", "error");
    studentNameInput.focus();
    return;
  }

  if (
    markValue === "" ||
    Number.isNaN(studentMark) ||
    studentMark < 0 ||
    studentMark > 100
  ) {
    studentMarkInput.classList.add("error");
    setResult("Please enter a valid mark between 0 and 100.", "error");
    studentMarkInput.focus();
    return;
  }

  let status = "";
  let grade = "";

  if (studentMark >= 80) {
    status = "PASS";
    grade = "Distinction";
  } else if (studentMark >= 65) {
    status = "PASS";
    grade = "Merit";
  } else if (studentMark >= 50) {
    status = "PASS";
    grade = "Pass";
  } else {
    status = "FAIL";
    grade = "Fail";
  }

  const message = `${studentName} scored ${studentMark}: ${status} - ${grade}`;
  setResult(message, "success");

  const listItem = document.createElement("li");
  listItem.textContent = `${studentName} | Mark: ${studentMark} | ${status} - ${grade}`;
  studentList.appendChild(listItem);

  submissions += 1;
  updateCount();
  form.reset();
  studentNameInput.focus();
});

resetBtn.addEventListener("click", function () {
  form.reset();
  clearErrors();
  setResult("No result yet.", "");
  studentNameInput.focus();
});

updateCount();
