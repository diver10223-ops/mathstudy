#!/usr/bin/env python3
"""Dependency-free structural checks for the generated static site."""

import unittest
from html.parser import HTMLParser
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
SITE = ROOT / "site"


class DocumentParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.hrefs = []
        self.ids = set()
        self.language = None
        self.title_depth = 0
        self.title = ""
        self.questions = []

    def handle_starttag(self, tag, attrs):
        values = dict(attrs)
        if tag == "html":
            self.language = values.get("lang")
        if tag == "a" and "href" in values:
            self.hrefs.append(values["href"])
        if "id" in values:
            self.ids.add(values["id"])
        if tag == "title":
            self.title_depth += 1
        if tag == "article" and "question" in values.get("class", "").split():
            self.questions.append(values)

    def handle_endtag(self, tag):
        if tag == "title":
            self.title_depth -= 1

    def handle_data(self, data):
        if self.title_depth:
            self.title += data


def parse_document(path):
    parser = DocumentParser()
    parser.feed(path.read_text(encoding="utf-8"))
    return parser


class SiteTests(unittest.TestCase):
    def test_every_html_document_has_language_and_title(self):
        for path in SITE.rglob("*.html"):
            with self.subTest(path=path.relative_to(ROOT)):
                document = parse_document(path)
                self.assertEqual(document.language, "zh-CN")
                self.assertTrue(document.title.strip())

    def test_local_links_resolve(self):
        for path in SITE.rglob("*.html"):
            document = parse_document(path)
            for href in document.hrefs:
                if href.startswith(("http://", "https://", "mailto:", "#")):
                    continue
                relative_path, _, fragment = href.partition("#")
                target = (path.parent / relative_path).resolve()
                with self.subTest(source=path.relative_to(ROOT), href=href):
                    self.assertTrue(target.exists(), f"Missing link target: {target}")
                    if fragment and target.suffix == ".html":
                        self.assertIn(fragment, parse_document(target).ids)

    def test_static_question_metadata(self):
        document = parse_document(SITE / "question-bank/index.html")
        self.assertGreater(len(document.questions), 0)
        for question in document.questions:
            with self.subTest(question=question):
                self.assertIn(question.get("data-topic"), {"derivative", "geometry"})
                self.assertIn(question.get("data-level"), {"L1", "L2", "L3", "L4"})
                self.assertGreaterEqual(int(question["data-year"]), 2022)
                self.assertLessEqual(int(question["data-year"]), 2026)

    def test_site_has_no_runtime_data_or_markdown_files(self):
        forbidden = {".json", ".md"}
        unexpected = [path for path in SITE.rglob("*") if path.suffix in forbidden]
        self.assertEqual(unexpected, [])

    def test_github_pages_workflow_publishes_site_directory(self):
        workflow = (ROOT / ".github/workflows/pages.yml").read_text(encoding="utf-8")
        self.assertIn("uses: actions/deploy-pages@v4", workflow)
        self.assertIn("path: site", workflow)


if __name__ == "__main__":
    unittest.main()
