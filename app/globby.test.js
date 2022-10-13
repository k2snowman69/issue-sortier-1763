import { globbySync } from "globby";
import path from "node:path";
import process from "node:process";

const count_allFiles = 4;
const count_jsonFiles = 0;
const count_cssFiles = 1;

function runGlobby(...args) {
  return globbySync(...args, {
    cwd: path.join(process.cwd(), "app"),
  });
}

describe("positive", () => {
  it("pulls all files", () => {
    const files = runGlobby(`**`);
    expect(files).toHaveLength(count_allFiles);
  });

  it("pulls json files", () => {
    const files = runGlobby(`**/*.json`);
    expect(files).toHaveLength(count_jsonFiles);
  });

  it("pulls css files", () => {
    const files = runGlobby(`**/*.css`);
    expect(files).toHaveLength(count_cssFiles);
  });

  it("pulls json and css files", () => {
    const files = runGlobby(`**/*.{json,css}`);
    expect(files).toHaveLength(count_jsonFiles + count_cssFiles);
  });

  it("pulls json and css files", () => {
    const files = runGlobby(`**/*.(json|css)`);
    expect(files).toHaveLength(count_jsonFiles + count_cssFiles);
  });
});

describe("Negation first", () => {
  it("pulls non-json files", () => {
    const files = runGlobby(`!**/*.json`);
    expect(files).toHaveLength(count_allFiles - count_jsonFiles);
  });

  it("pulls non-css files", () => {
    const files = runGlobby(`!**/*.css`);
    expect(files).toHaveLength(count_allFiles - count_cssFiles);
  });

  it("pulls non-css or non-js files - separate", () => {
    const files = runGlobby([`!**/*.json`, `!**/*.css`]);
    expect(files).toHaveLength(
      count_allFiles - count_cssFiles - count_jsonFiles
    );
  });

  it("pulls non-css or non-js files - parenthesis", () => {
    const files = runGlobby(`!**/(*.json|*.css)`);
    expect(files).toHaveLength(
      count_allFiles - count_cssFiles - count_jsonFiles
    );
  });

  it("pulls non-css or non-js files - curly", () => {
    const files = runGlobby(`!**/*.{json,css}`);
    expect(files).toHaveLength(
      count_allFiles - count_cssFiles - count_jsonFiles
    );
  });
});

describe("Negation last", () => {
  it("pulls non-json files", () => {
    const files = runGlobby(`**/!*.json`);
    expect(files).toHaveLength(count_allFiles - count_jsonFiles);
  });

  it("pulls non-css files", () => {
    const files = runGlobby(`**/!*.css`);
    expect(files).toHaveLength(count_allFiles - count_cssFiles);
  });

  it("pulls non-css or non-js files - separate", () => {
    const files = runGlobby([`**/!*.json`, `**/!*.css`]);
    expect(files).toHaveLength(
      count_allFiles - count_cssFiles - count_jsonFiles
    );
  });

  it("pulls non-css or non-js files - parenthesis", () => {
    const files = runGlobby(`**/!(*.json|*.css)`);
    expect(files).toHaveLength(
      count_allFiles - count_cssFiles - count_jsonFiles
    );
  });

  it("pulls non-css or non-js files - curly", () => {
    const files = runGlobby(`**/!*.{json,css}`);
    expect(files).toHaveLength(
      count_allFiles - count_cssFiles - count_jsonFiles
    );
  });
});
