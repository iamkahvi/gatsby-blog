import { join, parse } from "node:path";
import { readdir } from "node:fs/promises";

const MD_HIGHLIGHTS_PATH = join(Deno.cwd(), "content/highlights/markdown");
const JSON_HIGHLIGHTS_PATH = join(Deno.cwd(), "content/highlights/json");

const mdPaths = (await readdir(MD_HIGHLIGHTS_PATH)).map((path) =>
  join(MD_HIGHLIGHTS_PATH, path)
);
const jsonPaths = (await readdir(JSON_HIGHLIGHTS_PATH)).map((path) =>
  join(JSON_HIGHLIGHTS_PATH, path)
);

// console.log(mdPaths);
// console.log(jsonPaths);

function parseMarkdownToJSON(markdown: string) {
  if (!markdown || typeof markdown !== "string") {
    console.error("Invalid or empty markdown string");
    return [];
  }

  const dateString = markdown.split("---")![1].split("\n")[4].split(":")[1]
    .trim();

  return markdown.split("<hr>").flatMap((section) => {
    const lines = section.trim().split("\n").filter((line) => line);

    // Find the index of the line starting with '>'
    const quoteIndex = lines.findIndex((line) => line.startsWith(">"));
    if (quoteIndex === -1) return [];

    const quoteText = lines[quoteIndex].slice(2).trim(); // Remove leading '>'

    // Assuming the author and book details are in the last line of the section
    const authorBookLine = lines[lines.length - 1].trim();
    const [author, bookTitle, location] = authorBookLine.split(", ");

    console.log("bookTitle: ", bookTitle);

    // Extract location details
    const locationMatch = location.match(/loc\. (\d+)-?(\d+)?/);

    const locationObj = locationMatch
      ? {
        start: parseInt(locationMatch[1]),
        end: locationMatch[2]
          ? parseInt(locationMatch[2])
          : parseInt(locationMatch[1]),
      }
      : { start: null, end: null };

    // Example dateAdded value - in a real scenario, this should be dynamically generated
    const dateAdded = Date.parse(dateString);

    return [{
      book: bookTitle,
      author,
      quote: quoteText,
      location: locationObj,
      dateAdded,
    }];
  });
}

function titleToFilename(title: string) {
  // Replace spaces with underscores
  let filename = title.replace(/\s+/g, "_");

  // Remove or replace characters that are not suitable for filenames
  filename = filename.replace(/[\/\\:*?"<>|]+/g, "");

  // Convert to lower case
  filename = filename.toLowerCase();

  // Add file extension, if desired (e.g., .txt)
  filename += ".json";

  return filename;
}

for (const mdPath of mdPaths) {
  const md = Deno.readTextFileSync(mdPath);
  console.log(mdPath);

  if (mdPath.match(/How-to-Not/) || mdPath.match(/Sapiens/)) continue;

  const jsonOutput = parseMarkdownToJSON(md);
  const title = jsonOutput[0].book;

  Deno.writeTextFileSync(
    `./content/highlights/json/${titleToFilename(title)}`,
    JSON.stringify(jsonOutput),
  );
}
