/**
 * Strip @layer wrappers from Tailwind-generated CSS.
 * Keeps the content inside layers but removes the layer declarations,
 * so all styles become unlayered and follow normal CSS specificity rules.
 */
import { readFileSync, writeFileSync } from 'fs';

const file = process.argv[2];
if (!file) {
  console.error('Usage: node strip-layers.mjs <file>');
  process.exit(1);
}

let css = readFileSync(file, 'utf8');

// Remove @layer declarations by finding matching braces
function stripLayers(input) {
  let result = '';
  let i = 0;

  while (i < input.length) {
    // Check for @layer keyword
    if (input.startsWith('@layer ', i) || input.startsWith('@layer\t', i)) {
      // Find the opening brace
      const braceStart = input.indexOf('{', i);
      if (braceStart === -1) break;

      // Find the matching closing brace
      let depth = 1;
      let j = braceStart + 1;
      while (j < input.length && depth > 0) {
        if (input[j] === '{') depth++;
        else if (input[j] === '}') depth--;
        j++;
      }

      // Extract content inside the layer (without the outer braces)
      result += input.slice(braceStart + 1, j - 1);
      i = j;
    } else {
      result += input[i];
      i++;
    }
  }

  return result;
}

css = stripLayers(css);
writeFileSync(file, css);
