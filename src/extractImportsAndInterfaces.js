const fs = require('fs');
const path = require('path');
const ts = require('typescript');

const outputFilePath = path.join(process.cwd(), 'result.txt');
if (fs.existsSync(outputFilePath)) {
  fs.rmSync(outputFilePath);
}
function walkDir(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      walkDir(filePath, fileList);
    } else if (['.ts', '.tsx'].includes(path.extname(filePath))) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

function extractImportsAndInterfaces(sourceFile) {
  const imports = [];
  const interfaces = [];

  function visit(node) {
    if (ts.isImportDeclaration(node)) {
      imports.push(node.getText());
    } else if (ts.isInterfaceDeclaration(node)) {
      interfaces.push(node.getText());
    }

    ts.forEachChild(node, visit);
  }

  visit(sourceFile);

  return { imports, interfaces };
}

function processFiles() {
  const sourceFiles = walkDir(process.cwd());
  let result = '';

  sourceFiles.forEach((file) => {
    const content = fs.readFileSync(file, 'utf8');
    const sourceFile = ts.createSourceFile(file, content, ts.ScriptTarget.ESNext, true);

    const { imports, interfaces } = extractImportsAndInterfaces(sourceFile);

    if (interfaces.length > 0) {
      result += `\n// ${file}\n\n`;
      result += imports.join('\n') + '\n';
      result += interfaces.join('\n') + '\n';
    }
  });

  fs.writeFileSync(outputFilePath, result);
}

processFiles();
