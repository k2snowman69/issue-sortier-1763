import { globbySync } from "globby";

const count_allFiles = 3699;
const count_jsonFiles = 377;
const count_cssFiles = 4;

describe("positive", () => {
  it("pulls all files", () => {
    const files = globbySync("**");
    expect(files).toHaveLength(count_allFiles);
  });

  it("pulls json files", () => {
    const files = globbySync("**/*.json");
    expect(files).toHaveLength(count_jsonFiles);
  });

  it("pulls css files", () => {
    const files = globbySync("**/*.css");
    expect(files).toHaveLength(count_cssFiles);
  });

  it("pulls json and css files", () => {
    const files = globbySync("**/*.{json,css}");
    expect(files).toHaveLength(count_jsonFiles + count_cssFiles);
  });

  it("pulls json and css files", () => {
    const files = globbySync("**/*.(json|css)");
    expect(files).toHaveLength(count_jsonFiles + count_cssFiles);
  });
});

describe("Negation", () => {
  it("pulls non-json files", () => {
    const files = globbySync("!**/*.json");
    expect(files).toHaveLength(count_allFiles - count_jsonFiles);
  });

  it("pulls non-css files", () => {
    const files = globbySync("!**/*.css");
    expect(files).toHaveLength(count_allFiles - count_cssFiles);
  });

  it("pulls non-css or non-js files", () => {
    const files = globbySync(["!**/*.json", "!**/*.css"]);
    expect(files).toHaveLength(
      count_allFiles - count_cssFiles - count_jsonFiles
    );
  });
});
