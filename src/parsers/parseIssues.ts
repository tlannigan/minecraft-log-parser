import { includesCaseless } from '@/lib/strings';
import { getFileVersion, matchesEquality, matchesRange } from '@/lib/versions';
import { Rule, RuleCategory } from '@/rules/rule';
import { FileInfo } from '@/types/fileInfo';
import { Issue, MinecraftIssue } from '@/types/issue';

export default function parseIssues(
  fileInfo: FileInfo,
  ruleCategories: RuleCategory[],
  skipVersionChecks: boolean = false
): Issue[] {
  const issues: Issue[] = [];

  for (const category of ruleCategories) {
    if (!skipVersionChecks) {
      if (!passesVersionChecks(fileInfo, category)) continue;
    }

    for (const rule of category.rules) {
      if (!skipVersionChecks) {
        if (!passesVersionChecks(fileInfo, rule)) continue;
      }

      const issue = new MinecraftIssue(rule);

      if (rule.searchStrings) {
        for (const [index, line] of fileInfo.lines.entries()) {
          const includesSearchString = rule.searchStrings.some((searchString) =>
            includesCaseless(line, searchString)
          );
          if (!includesSearchString) continue;

          // Add line number for each line the error appears in the file
          issue.addLineNumber(index + 1);

          if (rule.postProcessor) {
            // Add additional info lines if post-processor is present
            const extraInfo = rule.postProcessor(fileInfo.lines.slice(index));
            issue.extraInfo = issue.extraInfo?.concat(extraInfo);
          }

          if (rule.onlyFindFirst) break;
        }
      } else {
        // If a rule only consists of version checks, push -1
        // to signify that it applies to the entire file
        issue.addLineNumber(-1);
      }

      // Only add issue if it was found
      if (issue.lineNumbers.length) issues.push(issue);
    }
  }

  // Sort by first line number found
  return issues.sort((a, b) => a.lineNumbers[0] - b.lineNumbers[0]);
}

/**
 * @returns Whether the file info contains all version check
 * keys and passes their equality parameters
 */
export function passesVersionChecks(
  fileInfo: FileInfo,
  rule: Rule | RuleCategory
): boolean {
  if (!rule.versionChecks) return true;

  let doesApply = true;

  for (const versionCheck of rule.versionChecks) {
    const fileVersion = getFileVersion(fileInfo, versionCheck);
    // FileInfo must contain all version keys in the version check
    if (!fileVersion) {
      doesApply = false;
      break;
    }

    if ('range' in versionCheck) {
      if (!matchesRange(fileVersion, versionCheck)) {
        doesApply = false;
      }
    } else {
      if (!matchesEquality(fileVersion, versionCheck)) {
        doesApply = false;
      }
    }
  }

  return doesApply;
}
