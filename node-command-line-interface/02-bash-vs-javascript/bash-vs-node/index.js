const { existsSync, mkdirSync, rmSync } = require('fs');
const { execSync } = require('child_process');

const rmFolder = (folderName) => {
  rmSync(`./${folderName}`, { recursive: true })
}

const getFileName = (index) => {
  return (index >= 3) ? `js-0${index}` : `mjs-0${index}`;
}

const makeDirAndReturnName = (folderName) => {
  if (existsSync(folderName)) rmFolder(folderName);
  mkdirSync(folderName);
  return folderName;
}

const initializePackage = (folderName) => {
  execSync('npm init -y --scope @pedropadilhaportella --silent', { cwd: `./${folderName}` })
  return folderName;
}

const printNameAndPackageVersion = (folderName) => {
  const { name, version } = require(`./${folderName}/package.json`);
  console.log({ n: name, v: version })
  return folderName;
}

const FOLDER_AMOUNT = 4;
Array.from(Array(FOLDER_AMOUNT).keys())
  .map((index) => makeDirAndReturnName(getFileName(index + 1)))
  .map((folderName) => initializePackage(folderName))
  .map((folderName) => printNameAndPackageVersion(folderName))
  .map((folderName) => rmFolder(folderName))