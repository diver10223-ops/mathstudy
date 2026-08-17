const QUESTION_LABELS = {
  derivative: "导数",
  geometry: "立体几何",
  original: "原创样题",
};

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function questionCard(question) {
  const tags = [
    `<span class="tag blue">${QUESTION_LABELS[question.topic]}</span>`,
    `<span class="tag">${question.difficulty}</span>`,
    `<span class="tag">${question.year}</span>`,
    `<span class="tag">${escapeHtml(question.region)}</span>`,
  ].join("");

  return `
    <article class="question">
      <div class="meta">${tags}</div>
      <h3>${escapeHtml(question.title)}</h3>
      <div>${question.statement}</div>
      <details>
        <summary>查看提示</summary>
        <div>${question.hint}</div>
      </details>
      <details>
        <summary>查看答案与解析</summary>
        <div>${question.solution}</div>
      </details>
      <p class="source">${escapeHtml(question.source.label)} · ${escapeHtml(question.source.status)}</p>
    </article>`;
}

function selectedValue(id) {
  return document.querySelector(`#${id}`)?.value ?? "all";
}

function filterQuestions(questions) {
  const topic = selectedValue("topic-filter");
  const level = selectedValue("level-filter");
  const year = selectedValue("year-filter");

  return questions.filter(
    (question) =>
      (topic === "all" || question.topic === topic) &&
      (level === "all" || question.difficulty === level) &&
      (year === "all" || String(question.year) === year),
  );
}

function renderQuestions(questions) {
  const list = document.querySelector("#question-list");
  const count = document.querySelector("#question-count");
  if (!list || !count) return;

  const filtered = filterQuestions(questions);
  count.textContent = `找到 ${filtered.length} 道题`;
  list.innerHTML = filtered.length
    ? filtered.map(questionCard).join("")
    : '<div class="empty-state">当前筛选条件下暂无题目，请调整筛选条件。</div>';

  if (window.MathJax?.typesetPromise) {
    window.MathJax.typesetPromise([list]);
  }
}

async function initializeQuestionBank() {
  const list = document.querySelector("#question-list");
  if (!list) return;

  try {
    const response = await fetch("../data/questions.json");
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const questions = await response.json();

    document.querySelectorAll(".question-filter").forEach((control) => {
      control.addEventListener("change", () => renderQuestions(questions));
    });
    renderQuestions(questions);
  } catch (error) {
    list.innerHTML = `
      <div class="empty-state error">
        题库数据加载失败。请使用 README 中的本地服务器命令访问本站，而不是直接打开 HTML 文件。
      </div>`;
    console.error("Unable to load question bank", error);
  }
}

document.addEventListener("DOMContentLoaded", initializeQuestionBank);
