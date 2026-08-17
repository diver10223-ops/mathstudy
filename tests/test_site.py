#!/usr/bin/env python3
"""Dependency-free structural checks for the generated static site."""

import json
import re
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

    def test_question_data_schema_and_unique_ids(self):
        questions = json.loads((SITE / "data/questions.json").read_text(encoding="utf-8"))
        required = {
            "id", "title", "topic", "knowledgePoints", "difficulty", "year",
            "region", "type", "statement", "hint", "solution", "source",
        }
        ids = []
        for question in questions:
            self.assertEqual(required, set(question))
            self.assertIn(question["topic"], {"derivative", "geometry"})
            self.assertIn(question["difficulty"], {"L1", "L2", "L3", "L4"})
            self.assertGreaterEqual(question["year"], 2022)
            self.assertLessEqual(question["year"], 2026)
            self.assertEqual(
                {"kind", "label", "status"}, set(question["source"]),
            )
            ids.append(question["id"])
        self.assertEqual(len(ids), len(set(ids)), "Question IDs must be unique")

    def test_math_delimiters_are_balanced_in_markdown(self):
        for path in (ROOT / "content").rglob("*.md"):
            text = path.read_text(encoding="utf-8")
            without_blocks = re.sub(r"\$\$.*?\$\$", "", text, flags=re.DOTALL)
            with self.subTest(path=path.relative_to(ROOT)):
                self.assertEqual(text.count("$$") % 2, 0)
                self.assertEqual(without_blocks.count("$") % 2, 0)


if __name__ == "__main__":
    unittest.main()
