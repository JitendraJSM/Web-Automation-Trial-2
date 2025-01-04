const URLtoFind = "http://example.com/";
const pageArray = [
  { pageURL: "https://example.com/" },
  { pageURL: "chrome://new-tab-page/" },
];

function findPageByURLFromArray(pageArray, URLtoFind) {
  return (
    pageArray.find((obj) => obj.pageURL === URLtoFind) ||
    pageArray.reduce(
      (max, obj) =>
        obj.pageURL.startsWith(URLtoFind) &&
        obj.pageURL.length > (max?.pageURL.length || 0)
          ? obj
          : max,
      false
    )
  );
}

const found = findPageByURLFromArray(pageArray, URLtoFind);
console.log(found); // Outputs: { pageURL: "https://example.com/" }

// output is as below:
// node .\test1.js
// URLtoFind: https://example.com/
// pageArray: https://example.com/,chrome://new-tab-page/
// https://example.com/

// Why is the found value just a string ? I expect it to be the object which contains the URL.
