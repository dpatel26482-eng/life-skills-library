#!/usr/bin/env python3
"""Inline styles.css and script.js into a single self-contained page.

Writes two builds from the same source:
  dist/late-library.html   a normal standalone page (open it with file://, email it, host it anywhere)
  dist/artifact.html       the same page as an Artifact body fragment (no doctype/html/head/body wrapper)
"""
import base64, os, re

here = os.path.dirname(os.path.abspath(__file__))
read = lambda n: open(os.path.join(here, n), encoding='utf-8').read()

html = read('index.html')
css = read('styles.css')
js = read('books-data.js') + '\n' + read('script.js')

# the scene plates live in media/ — inline them so the standalone build travels alone
for name in ('media/hall-hero.jpg', 'media/bookshelf-hero.jpg'):
    with open(os.path.join(here, name), 'rb') as fh:
        data = base64.b64encode(fh.read()).decode('ascii')
    css = css.replace("url('%s')" % name, "url('data:image/jpeg;base64,%s')" % data)

html = html.replace('<link rel="stylesheet" href="styles.css?v=3">', '<style>\n' + css + '\n</style>')
html = html.replace('<script src="books-data.js?v=4"></script>\n<script src="script.js?v=4"></script>', '<script>\n' + js + '\n</script>')

os.makedirs(os.path.join(here, 'dist'), exist_ok=True)
open(os.path.join(here, 'dist/late-library.html'), 'w', encoding='utf-8').write(html)

# Artifact build: strip the document wrapper, keep <title>, <style>, fonts link and the body.
head = re.search(r'<head>(.*?)</head>', html, re.S).group(1)
body = re.search(r'<body>(.*?)</body>', html, re.S).group(1)
keep = '\n'.join(
    line for line in head.splitlines()
    if '<title>' in line or 'fonts.googleapis' in line or 'fonts.gstatic' in line
)
style = re.search(r'<style>.*?</style>', head, re.S).group(0)
open(os.path.join(here, 'dist/artifact.html'), 'w', encoding='utf-8').write(
    keep + '\n' + style + '\n' + body
)

for name in ('dist/late-library.html', 'dist/artifact.html'):
    print(name, round(os.path.getsize(os.path.join(here, name)) / 1024, 1), 'KB')
