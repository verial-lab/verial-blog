module.exports = {
  ci: {
    collect: {
      url: [
        '/',
        '/essays',
        '/essays/containment-systems-design',
        '/glossary',
      ],
      numberOfRuns: 1,
      settings: {
        preset: 'desktop',
        // Use the Vercel preview URL or local server
        ...(process.env.LHCI_BASE_URL && { hostname: process.env.LHCI_BASE_URL }),
      },
    },
    assert: {
      assertions: {
        'categories:performance': ['warn', { minScore: 0.8 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'categories:best-practices': ['warn', { minScore: 0.9 }],
        'categories:seo': ['warn', { minScore: 0.9 }],
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
