import { describe, expect, test } from 'vitest';
import type { RepomixConfigMerged } from '../../../src/config/configSchema.js';
import { parseFile } from '../../../src/core/treeSitter/parseFile.js';

describe('parseFile for C#', () => {
  test('should parse C# correctly', async () => {
    const fileContent = `
      // Program class containing the entry point
      /// <summary>
      /// The main program class
      /// </summary>
      class Program {
        // The main entry point
        /// <summary>
        /// Writes a greeting to the console
        /// </summary>
        static void Main() {
          Console.WriteLine("Hello, world!");
        }
      }
    `;
    const filePath = 'dummy.cs';
    const config = {};
    const result = await parseFile(fileContent, filePath, config as RepomixConfigMerged);
    expect(typeof result).toBe('string');

    const expectContents = [
      '// Program class containing the entry point',
      '/// <summary>',
      'class Program {',
      '// The main program class',
      '// The main entry point',
      '/// Writes a greeting to the console',
      'static void Main() {',
    ];

    for (const expectContent of expectContents) {
      expect(result).toContain(expectContent);
    }
  });
});
