import { globbySync } from "globby";

const count_allFiles = 4;
const count_jsonFiles = 0;
const count_cssFiles = 1;

describe.each`
  root
  ${"app"}
  ${"./app"}
`('prefix being "$root"', ({ root }) => {
  describe("positive", () => {
    it("pulls all files", () => {
      const files = globbySync(`${root}/**`);
      expect(files).toHaveLength(count_allFiles);
    });

    it("pulls json files", () => {
      const files = globbySync(`${root}/**/*.json`);
      expect(files).toHaveLength(count_jsonFiles);
    });

    it("pulls css files", () => {
      const files = globbySync(`${root}/**/*.css`);
      expect(files).toHaveLength(count_cssFiles);
    });

    it("pulls json and css files", () => {
      const files = globbySync(`${root}/**/*.{json,css}`);
      expect(files).toHaveLength(count_jsonFiles + count_cssFiles);
    });

    it("pulls json and css files", () => {
      const files = globbySync(`${root}/**/*.(json|css)`);
      expect(files).toHaveLength(count_jsonFiles + count_cssFiles);
    });
  });

  describe("Negation first", () => {
    it("pulls non-json files", () => {
      const files = globbySync(`!${root}/**/*.json`);
      expect(files).toHaveLength(count_allFiles - count_jsonFiles);
    });

    it("pulls non-css files", () => {
      const files = globbySync(`!${root}/**/*.css`);
      expect(files).toHaveLength(count_allFiles - count_cssFiles);
    });

    it("pulls non-css or non-js files - separate", () => {
      const files = globbySync([`!${root}/**/*.json`, `!${root}/**/*.css`]);
      expect(files).toHaveLength(
        count_allFiles - count_cssFiles - count_jsonFiles
      );
    });

    it("pulls non-css or non-js files - parenthesis", () => {
      const files = globbySync(`!${root}/**/(*.json|*.css)`);
      expect(files).toHaveLength(
        count_allFiles - count_cssFiles - count_jsonFiles
      );
    });

    it("pulls non-css or non-js files - curly", () => {
      const files = globbySync(`!${root}/**/*.{json,css}`);
      expect(files).toHaveLength(
        count_allFiles - count_cssFiles - count_jsonFiles
      );
    });
  });

  describe("Negation last", () => {
    it("pulls non-json files", () => {
      const files = globbySync(`${root}/**/!*.json`);
      expect(files).toHaveLength(count_allFiles - count_jsonFiles);
    });

    it("pulls non-css files", () => {
      const files = globbySync(`${root}/**/!*.css`);
      expect(files).toHaveLength(count_allFiles - count_cssFiles);
    });

    it("pulls non-css or non-js files - separate", () => {
      const files = globbySync([`${root}/**/!*.json`, `${root}/**/!*.css`]);
      expect(files).toHaveLength(
        count_allFiles - count_cssFiles - count_jsonFiles
      );
    });

    it("pulls non-css or non-js files - parenthesis", () => {
      const files = globbySync(`${root}/**/!(*.json|*.css)`);
      expect(files).toHaveLength(
        count_allFiles - count_cssFiles - count_jsonFiles
      );
    });

    it("pulls non-css or non-js files - curly", () => {
      const files = globbySync(`${root}/**/!*.{json,css}`);
      expect(files).toHaveLength(
        count_allFiles - count_cssFiles - count_jsonFiles
      );
    });
  });
});
