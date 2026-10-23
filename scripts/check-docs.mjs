import fs from 'fs';
import path from 'path';

const DOCS_DIR = path.join(process.cwd(), 'src', 'content', 'docs');
const NAV_DATA_PATH = path.join(process.cwd(), 'src', 'lib', 'nav-data.ts');

console.log('🔍 Starting Scripture Documentation Quality Check...\n');

let totalErrors = 0;
let totalWarnings = 0;

// 1. Check nav-data.ts hrefs
if (!fs.existsSync(NAV_DATA_PATH)) {
  console.error('❌ nav-data.ts not found!');
  process.exit(1);
}

const navContent = fs.readFileSync(NAV_DATA_PATH, 'utf-8');
const hrefMatches = [...navContent.matchAll(/href:\s*['"](\/docs\/[^'"#]+)['"]/g)];
const allHrefs = [...new Set(hrefMatches.map((m) => m[1]))];

console.log(`📌 Found ${allHrefs.length} distinct documentation routes in nav-data.ts`);

const missingFiles = [];
const smallFiles = [];

for (const href of allHrefs) {
  const relativePath = href.replace(/^\/docs\//, '');
  const directPath = path.join(DOCS_DIR, `${relativePath}.mdx`);
  const indexPath = path.join(DOCS_DIR, relativePath, 'index.mdx');

  const fileExists = fs.existsSync(directPath) || fs.existsSync(indexPath);
  if (!fileExists) {
    missingFiles.push(href);
    totalErrors++;
  } else {
    const targetFile = fs.existsSync(directPath) ? directPath : indexPath;
    const stat = fs.statSync(targetFile);
    if (stat.size < 4000) {
      smallFiles.push({ href, size: stat.size });
      totalWarnings++;
    }
  }
}

if (missingFiles.length > 0) {
  console.log(`\n❌ Missing .mdx files for ${missingFiles.length} routes:`);
  missingFiles.forEach((f) => console.log(`   - ${f}`));
} else {
  console.log('✅ All routes in nav-data.ts have corresponding .mdx files!');
}

if (smallFiles.length > 0) {
  console.log(`\n⚠️  Found ${smallFiles.length} files below recommended depth (< 4,000 bytes):`);
  smallFiles.forEach((f) => console.log(`   - ${f.href} (${f.size} bytes)`));
} else {
  console.log('✅ All documentation files meet the depth requirement!');
}

// 2. Scan all .mdx files for common issues (unclosed code fences, mojibake, missing headings)
function scanMdxFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      scanMdxFiles(fullPath);
    } else if (entry.isFile() && entry.name.endsWith('.mdx')) {
      const content = fs.readFileSync(fullPath, 'utf-8');
      
      // Check code fences
      const fenceCount = (content.match(/^```/gm) || []).length;
      if (fenceCount % 2 !== 0) {
        console.log(`❌ Unclosed code fence in ${fullPath}`);
        totalErrors++;
      }

      // Check common mojibake replacement characters
      if (content.includes('\uFFFD')) {
        console.log(`❌ Mojibake character detected in ${fullPath}`);
        totalErrors++;
      }
    }
  }
}

scanMdxFiles(DOCS_DIR);

console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
console.log(`Summary: ${totalErrors} Errors, ${totalWarnings} Warnings`);
console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`);

if (totalErrors > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
