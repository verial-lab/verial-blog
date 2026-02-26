import { convertMdxToEmail } from '../src/convert-mdx';
import { renderEmail } from '../src/render';

const BUTTONDOWN_API = 'https://api.buttondown.com/v1';

async function main() {
  const filePath = process.argv[2];
  if (!filePath) {
    console.error('Usage: create-draft <path-to-mdx-file>');
    process.exit(1);
  }

  const apiKey = process.env.BUTTONDOWN_API_KEY;
  if (!apiKey) {
    console.error('Error: BUTTONDOWN_API_KEY environment variable is required');
    process.exit(1);
  }

  console.log(`Converting: ${filePath}`);
  const content = await convertMdxToEmail(filePath);
  console.log(`Title: ${content.meta.title}`);
  console.log(`Type: ${content.meta.type}`);
  console.log(`Tags: ${content.tags.join(', ')}`);
  console.log(`Canonical URL: ${content.canonicalUrl}`);

  console.log('\nRendering email template...');
  const html = await renderEmail(content);

  console.log('Creating Buttondown draft...');
  const response = await fetch(`${BUTTONDOWN_API}/emails`, {
    method: 'POST',
    headers: {
      Authorization: `Token ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      subject: content.meta.title,
      body: html,
      status: 'draft',
      tags: content.tags,
      metadata: {
        canonical_url: content.canonicalUrl,
        content_type: content.meta.type,
        slug: content.meta.slug,
      },
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    console.error(`Buttondown API error (${response.status}): ${error}`);
    process.exit(1);
  }

  const result = await response.json();
  console.log('\n✅ Draft created successfully!');
  console.log(`📧 Review at: https://buttondown.com/emails/${result.id}`);
  console.log(`\nDraft ID: ${result.id}`);
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
