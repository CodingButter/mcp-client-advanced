import type { DocsThemeConfig } from 'nextra-theme-docs';
import React from 'react';

const config: DocsThemeConfig = {
  logo: <span>🚀 Advanced MCP Client</span>,
  project: {
    link: 'https://github.com/user/advanced-mcp-client',
  },
  chat: {
    link: 'https://discord.gg/mcp-client',
  },
  docsRepositoryBase: 'https://github.com/user/advanced-mcp-client/tree/main/apps/docs',
  footer: {
    content: (
      <span>
        MIT {new Date().getFullYear()} - ©{' '}
        <a
          href="https://github.com/user/advanced-mcp-client"
          target="_blank"
          rel="noreferrer"
        >
          Advanced MCP Client
        </a>{' '}
        - Revolutionary parallel execution for MCP tools.
      </span>
    ),
  },
  useNextSeoProps() {
    return {
      titleTemplate: '%s – Advanced MCP Client'
    }
  },
  head: (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta property="og:title" content="Advanced MCP Client" />
      <meta property="og:description" content="Revolutionary Model Context Protocol client with intelligent orchestration and massively parallel execution" />
    </>
  )
};

export default config;
