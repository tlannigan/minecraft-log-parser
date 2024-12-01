import { Rule } from '@/rules/rule';
import { Severity } from './enums';

export interface Issue {
  severity: Severity;
  title: string;
  description?: string | string[];
  /** Lines where this issue was found. [-1] indicates it applies to the entire file. */
  lineNumbers: number[];
}

export class MinecraftIssue implements Issue {
  severity: Severity;
  title: string;
  description?: string;
  /** Additional lines describing each instance of the issue */
  extraInfo?: string[];
  lineNumbers: number[] = [];

  constructor(rule: Rule) {
    this.severity = rule.severity;
    this.title = rule.title;
    this.description = rule.description;
    if (rule.postProcessor) {
      this.extraInfo = [];
    }
  }

  addLineNumber(lineNumber: number) {
    this.lineNumbers.push(lineNumber);
  }
}
