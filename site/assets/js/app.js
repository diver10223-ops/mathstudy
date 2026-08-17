function selectedValue(id) {
  return document.querySelector(`#${id}`)?.value ?? "all";
}

function filterQuestions() {
  const topic = selectedValue("topic-filter");
  const level = selectedValue("level-filter");
  const year = selectedValue("year-filter");
  const questions = [...document.querySelectorAll(".question")];

  let visibleCount = 0;
  questions.forEach((question) => {
    const isVisible =
      (topic === "all" || question.dataset.topic === topic) &&
      (level === "all" || question.dataset.level === level) &&
      (year === "all" || question.dataset.year === year);
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
    control.addEventListener("change", filterQuestions);
  });
  filterQuestions();
}

document.addEventListener("DOMContentLoaded", initializeQuestionBank);
