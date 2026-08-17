# 题目数据结构规范（导数/立体几何）

每道题建议使用以下字段：

- `id`：唯一编号（建议：`{topic}-{region}-{year}-{exam_type}-{index}`）
- `topic`：`derivative` 或 `solid_geometry`
- `region`：`beijing` / `shanghai` / `jiangsu` / `zhejiang` / `guangdong`
- `year`：2022–2026
- `exam_type`：`gaokao` / `yimo` / `ermo` / `sanmo` / `simo` / `moni`
- `source`：来源（完整名称）
- `question_no`：题号
- `question_type`：选择题/填空题/解答题
- `difficulty`：易/中/难（可选）
- `knowledge_points`：知识点标签（数组）
- `stem`：题干
- `answer`：答案
- `analysis`：解析（可选）

---

## Markdown 模板

```markdown
### 题目：{{id}}
- 地区：{{region}}
- 年份：{{year}}
- 考试：{{exam_type}}
- 专题：{{topic}}
- 来源：{{source}}
- 题号：{{question_no}}
- 题型：{{question_type}}
- 难度：{{difficulty}}
- 知识点：{{knowledge_points}}

**题干**

{{stem}}

**答案**

{{answer}}

**解析**

{{analysis}}
```

## HTML 模板

```html
<article class="question" id="{{id}}">
  <h3>题目：{{id}}</h3>
  <ul>
    <li>地区：{{region}}</li>
    <li>年份：{{year}}</li>
    <li>考试：{{exam_type}}</li>
    <li>专题：{{topic}}</li>
    <li>来源：{{source}}</li>
    <li>题号：{{question_no}}</li>
    <li>题型：{{question_type}}</li>
    <li>难度：{{difficulty}}</li>
    <li>知识点：{{knowledge_points}}</li>
  </ul>
  <section><h4>题干</h4><p>{{stem}}</p></section>
  <section><h4>答案</h4><p>{{answer}}</p></section>
  <section><h4>解析</h4><p>{{analysis}}</p></section>
</article>
```
