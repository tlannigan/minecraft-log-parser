import { Parser, ParserFactory } from '@/parsers/parserFactory';
import convertFileToLines from '@/lib/convertFileToLines';
import { ParsingConfig } from '@/types/parsingConfig';

interface Builder {
  withAttributes(): this;
  withSystem(): this;
  withIssues(): this;
  withAll(): this;
}

export default class ParserBuilder implements Builder {
  private parser: Parser;

  private constructor(lines: string[], file?: File) {
    this.parser = ParserFactory.create(lines, file);
  }

  static async setup(
    file: File | string[],
    config?: ParsingConfig
  ): Promise<ParserBuilder> {
    if (file instanceof File) {
      const lines = await convertFileToLines(file, config);
      return new ParserBuilder(lines, file);
    } else {
      // File lines were provided directly
      return new ParserBuilder(file);
    }
  }

  withAttributes(): this {
    this.parser.parseModloader();
    return this;
  }

  withSystem(): this {
    this.parser.parseSystem();
    return this;
  }

  withIssues(): this {
    this.parser.parseIssues();
    return this;
  }

  withAll(): this {
    this.parser.parseModloader();
    this.parser.parseSystem();
    this.parser.parseIssues();
    return this;
  }

  parse() {
    return this.parser.parse();
  }
}
