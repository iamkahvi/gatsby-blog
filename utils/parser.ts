const contentful = require("contentful-management");
const fs = require("fs");
require("dotenv").config();

interface BookListItem {
  title: string;
  author: string;
  date: string;
  description: string;
}

type BookList = BookListItem[];

interface PostItem {
  frontmatter: {
    title: string;
    date: string;
  };
  rawMarkdownBody: string;
}

type PostList = PostItem[];

export async function addPostEntries(pl: PostList) {
  console.log("Opening Connection...");
  const client = contentful.createClient({
    accessToken: process.env.CONT_MANAGEMENT_TOKEN,
  });

  // Create entry
  const space = await client.getSpace("rbthbhshshw9");
  const env = await space.getEnvironment("master");

  console.log("Starting Uploads");
  for (const post of pl) {
    let bPost = {
      fields: {
        postTitle: {
          "en-US": post.frontmatter.title,
        },
        dateWritten: {
          "en-US": post.frontmatter.date,
        },
        postBody: {
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
                    value: post.rawMarkdownBody,
                    data: {},
                  },
                ],
                data: {},
              },
            ],
          },
        },
      },
    };
    await env.createEntry("blogPost", bPost);
    console.log(`Uploaded ${post.frontmatter.title}`);
  }
  console.log("Finished Uploads");
}

export function parser(text: string): BookList {
  console.log(`Parsing Text: ${text.slice(0, 50)}...`);
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
  console.log("Opening Connection...");
  const client = contentful.createClient({
    accessToken: process.env.CONT_MANAGEMENT_TOKEN,
  });

  // Create entry
  const space = await client.getSpace("rbthbhshshw9");
  const env = await space.getEnvironment("master");

  console.log("Starting Uploads");
  for (const book of bl) {
    let blItem = {
      fields: {
        bookTitle: {
          "en-US": book.title,
        },
        bookAuthor: {
          "en-US": book.author,
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
                    value: book.description,
                    data: {},
                  },
                ],
                data: {},
              },
            ],
          },
        },
      },
    };

    if (book.date) {
      // @ts-ignore
      blItem.fields["dateFinished"] = { "en-US": book.date };
    }

    await env.createEntry("bookListItem", blItem);
    console.log(`Uploaded ${book.title}`);
  }

  console.log("Finished Uploads");
}

function readData(path: string): string {
  const data = fs.readFileSync(path, "utf8");
  return data;
}

const text = readData("in_posts.json");
const pl = JSON.parse(text)["nodes"];
// console.log(pl);
// addPostEntries(pl);
