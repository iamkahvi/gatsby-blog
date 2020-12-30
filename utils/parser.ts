import { text } from "./data.js";
const contentful = require("contentful-management");

interface BookListItem {
  title: string;
  author: string;
  date: string;
  description: string;
}

type BookList = BookListItem[];

export function parser(text: string): BookList {
  let bList: BookList = [];

  const lines = text.split("\n").filter(Boolean);

  const titleLineRegex = /\*\ (.*)\ by\ (.*)/m;
  const dateReg = /(\d{2})\/(\d{2})\/(\d{2,4})/m;
  const descRegex = /^\ {3}(.*)$/m;

  for (let i = 0; i < lines.length; ) {
    const matches = lines[i].match(titleLineRegex);
    if (matches !== null && matches.length === 3) {
      const [_, title, authorDate] = matches;
      let book: BookListItem = {
        title,
        author: "",
        date: "",
        description: "",
      };

      const dateMatches = authorDate.match(dateReg);
      if (dateMatches !== null && dateMatches.length === 4) {
        const [_, day, month, year] = dateMatches;
        book.author = authorDate
          .split("-")
          .slice(0, -1)
          .join("-")
          .trim();
        book.date = `${year.length === 2 ? "20" + year : year}-${month}-${day}`;
      } else {
        book.author = authorDate.trim();
      }

      const start = ++i;

      // Get to end of description
      while (!titleLineRegex.test(lines[i]) && i < lines.length) {
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

export async function addEntries(bl: BookList) {
  const contentDeliveryAPI = "tMNTyF_06H4c98VNebh_yox4fCSwsM7nZ7NumKA0b_4";
  const client = contentful.createClient({
    accessToken: "CFPAT-_T81OchPsVv4bm2wCsVScOzsIAfPEgYQ1dntNcIT5uI",
  });

  // Create entry
  const space = await client.getSpace("rbthbhshshw9");
  const env = await space.getEnvironment("master");
  const entry = await env.createEntry("bookListItem", {
    fields: {
      bookTitle: {
        "en-US": "Entry title 3",
      },
      bookAuthor: {
        "en-US": "Someone",
      },
      dateFinished: {
        "en-US": "2020-12-11",
      },
      bookDescription: {
        "en-US": {
          nodeType: "document",
          data: {},
          content: [
            {
              nodeType: "paragraph",
              content: [
                {
                  nodeType: "text",
                  marks: [],
                  value: "I am an odd paragraph.",
                  data: {},
                },
              ],
              data: {},
            },
          ],
        },
      },
    },
  });

  console.log(entry);
}

const bl = parser(text);
console.log(JSON.stringify(bl));
