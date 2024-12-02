# Minecraft Log Parser

This package is designed to parse various Minecraft files and return relevant information about them, especially for debugging issues.

## Installation
```
npm i minecraft-log-parser
```

## Usage
```ts
let file: File | string[];
const parser = await ParserBuilder.setup(file);
const fileInfo = parser.withAll().parse();
```

See [FileInfo](https://github.com/tlannigan/minecraft-log-parser/blob/main/src/types/fileInfo.ts) for returned object structure.
