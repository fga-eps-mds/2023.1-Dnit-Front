import "@testing-library/jest-dom";

const config = {
  reporters: [
    "default",
    ["jest-junit", { outputDirectory: "reports", outputName: "report.xml" }],
  ],
};

module.exports = config;
