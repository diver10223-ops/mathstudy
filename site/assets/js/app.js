function selectedValue(id) {
  return document.querySelector(`#${id}`)?.value ?? "all";
}

function filterQuestions() {
  const topic = selectedValue("topic-filter");
  const level = selectedValue("level-filter");
  const year = selectedValue("year-filter");
  const keyword = selectedValue("keyword-filter").trim().toLowerCase();
  const questions = [...document.querySelectorAll(".question")];

  let visibleCount = 0;
  questions.forEach((question) => {
    const isVisible =
      (topic === "all" || question.dataset.topic === topic) &&
      (level === "all" || question.dataset.level === level) &&
      (year === "all" || question.dataset.year === year) &&
      (!keyword || question.textContent.toLowerCase().includes(keyword));
    question.hidden = !isVisible;
    if (isVisible) visibleCount += 1;
  });

  const count = document.querySelector("#question-count");
  if (count) count.textContent = `找到 ${visibleCount} 道题`;

  const emptyState = document.querySelector("#empty-result");
  if (emptyState) emptyState.hidden = visibleCount !== 0;
}

function initializeQuestionBank() {
  if (!document.querySelector("#question-list")) return;
  document.querySelectorAll(".question-filter").forEach((control) => {
    control.addEventListener("input", filterQuestions);
  });
  filterQuestions();
}

function readProgress() {
  return new Set(JSON.parse(localStorage.getItem("mathstudy-progress") ?? "[]"));
}

function updateProgressSummary(checkboxes) {
  const completed = checkboxes.filter((checkbox) => checkbox.checked).length;
  const percent = Math.round((completed / checkboxes.length) * 100);
  document.querySelector("#completed-count").textContent = completed;
  document.querySelector("#progress-percent").textContent = `${percent}%`;
  document.querySelector("#progress-bar").style.width = `${percent}%`;
}

function initializeProgress() {
  const checkboxes = [...document.querySelectorAll("[data-progress]")];
  if (!checkboxes.length) return;

  const saved = readProgress();
  checkboxes.forEach((checkbox) => {
    checkbox.checked = saved.has(checkbox.dataset.progress);
    checkbox.addEventListener("change", () => {
      const completed = checkboxes
        .filter((item) => item.checked)
        .map((item) => item.dataset.progress);
      localStorage.setItem("mathstudy-progress", JSON.stringify(completed));
      updateProgressSummary(checkboxes);
    });
  });

  document.querySelector("#reset-progress").addEventListener("click", () => {
    checkboxes.forEach((checkbox) => { checkbox.checked = false; });
    localStorage.removeItem("mathstudy-progress");
    updateProgressSummary(checkboxes);
  });
  updateProgressSummary(checkboxes);
}

document.addEventListener("DOMContentLoaded", () => {
  initializeQuestionBank();
  initializeProgress();
});
