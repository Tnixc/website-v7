export default function linkToComponent() {
  return (tree) => {
    if (
      !tree.children.some(
        (x) => x?.value?.includes("import Link from '@/components/common/Link.astro'") && x?.value?.type === 'mdxjsEsm',
      )
    ) {
      tree.children.unshift({
        type: 'mdxjsEsm',
        value: "import Link from '@/components/common/Link.astro';",
        data: {
          estree: {
            type: 'Program',
            body: [
              {
                type: 'ImportDeclaration',
                specifiers: [
                  {
                    type: 'ImportDefaultSpecifier',
                    local: {
                      type: 'Identifier',
                      name: 'Link',
                    },
                  },
                ],
                source: {
                  type: 'Literal',
                  value: '@/components/common/Link.astro',
                  raw: "'@/components/common/Link.astro'",
                },
              },
            ],
            sourceType: 'module',
          },
        },
      });
    }
    tree.children.forEach((child) => {
      recursiveWalk(child);
    });
    return tree;
  };
}

function recursiveWalk(element) {
  if (element.type === 'element' && element.tagName === 'a') {
    const href = element.properties.href;
    const isExternal = !href.startsWith('/');

    element.type = 'mdxJsxFlowElement';
    element.name = 'Link';
    element.data = {
      _mdxExplicitJsx: true,
    };

    element.properties.type = 'mdxJsxAttribute';
    element.attributes = [
      {
        type: 'mdxJsxAttribute',
        name: 'href',
        value: href,
      },
    ];
    if (isExternal) {
      element.attributes.push({
        type: 'mdxJsxAttribute',
        name: 'external',
        value: null,
      });
    }
    element.properties = undefined;
    return null;
  } else if (element.children) {
    element.children.forEach((child) => {
      recursiveWalk(child);
    });
  }
}
