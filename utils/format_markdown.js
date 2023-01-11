const fs = require("fs");

const inputFile = process.argv[2];
console.log(inputFile);

const data = fs.readFileSync(inputFile, "utf-8");
const clippings = JSON.parse(data);

const book = clippings[0].book;
const author = clippings[0].author;
const date = new Date(clippings[0].date).toDateString();

const markdownEntries = clippings.map((entry) => {
  return `> ${entry.quote}

${author}, ${book}. ${entry.location.start}-${entry.location.end}
<hr>`;
});

// Muriel Barbery, The Elegance of the Hedgehog. pg. 57, loc. 542-543.
// ---
// layout: highlight
// title: The Elegance of the Hedgehog Highlights
// slug: Elegance of the Hedgehog
// date: 2022-07-14
// ---
// by  Muriel Barbery

const frontMatter = `
---
layout: highlight
title: ${book} Highlights
slug: ${book}
date: ${date}
---
by ${author}
`;
console.log(frontMatter);
console.log(markdownEntries.join("\n\n"));
