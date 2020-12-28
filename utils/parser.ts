import { text } from "./data.js";

interface BookListItem {
  title: string;
  description: string;
}

type BookList = BookListItem[];

export function parser(text: string): BookList {
  let bList: BookList = [];

  const lines = text.split("\n").filter(Boolean);
  // console.log(lines);

  const titleRegex = /^\ \*\ (.*)$/m;
  const descRegex = /^\ {3}(.*)$/m;

  let i = 0;
  while (i < lines.length) {
    const m = lines[i].match(titleRegex);
    if (m !== null) {
      let book: BookListItem = {
        title: m[1],
        description: "",
      };

      const start = ++i;

      // Get to end of description
      while (!titleRegex.test(lines[i]) && i < lines.length) {
        const m = lines[i].match(descRegex);
        if (m !== null) {
          lines[i] = m[1];
        }
        i++;
      }

      book.description = lines.slice(start, i).join(" ");
      bList.push(book);
    } else {
      i++;
    }
  }
  return bList;
}

parser(text);
console.log(JSON.stringify(parser(text)));
