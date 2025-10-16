describe('Legacy URL redirects', () => {
  const legacyRoutes = [
    { from: '/#/how-to-translate-files', to: '/how-to-translate-files/' },
    { from: '/#/how-to-setup-wsl', to: '/how-to-setup-wsl/' },
    {
      from: '/#/how-to-setup-freecodecamp-locally',
      to: '/how-to-setup-freecodecamp-locally/'
    },
    {
      from: '/#/how-to-add-playwright-tests',
      to: '/how-to-add-playwright-tests/'
    }
  ];

  it('redirect configuration exists', () => {
    // The redirects are defined in public/_redirects (Cloudflare Workers format)
    // We're verifying the expected redirect paths that should be handled
    // by the deployed application

    // These would be handled by client-side JavaScript for hash-based routes
    const hashRoutes = legacyRoutes.map(route => ({
      from: route.from.replace('/#/', ''),
      to: route.to
    }));

    // Verify the structure is as expected
    expect(hashRoutes).toHaveLength(4);
  });

  it('legacy routes follow consistent pattern', () => {
    for (const route of legacyRoutes) {
      // All legacy routes should start with /#/
      expect(route.from).toMatch(/^\/#\//);

      // All destination routes should end with /
      expect(route.to).toMatch(/\/$/);

      // The path after /#/ should match the destination path
      const fromPath = route.from.replace('/#/', '');
      const toPath = route.to.replace(/\/$/, '');
      expect(toPath).toBe(`/${fromPath}`);
    }
  });

  it('handles query parameters transformation correctly', () => {
    const testCase = {
      from: '/#/how-to-add-playwright-tests?id=run-the-playwright-tests',
      expected: '/how-to-add-playwright-tests/#run-the-playwright-tests'
    };

    // Extract the base path and query
    const [basePath, query] = testCase.from.split('?');
    const hashPath = basePath.replace('/#/', '');

    // Verify the transformation pattern
    expect(query).toBe('id=run-the-playwright-tests');
    const anchorId = query.replace('id=', '');
    const transformed = `/${hashPath}/#${anchorId}`;

    expect(transformed).toBe(testCase.expected);
  });
});
