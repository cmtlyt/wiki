import * as path from 'node:path';
import process from 'node:process';
import readingTime from 'rspress-plugin-reading-time';
import { defineConfig } from 'rspress/config';

const BaseValueMap: Record<string, string> = {
  github: '/wiki/',
  netlify: '',
};

export default defineConfig({
  root: path.join(__dirname, 'docs'),
  title: 'Wiki',
  // 根据不同平台设置 base
  base: BaseValueMap[process.env.DEPLOY_PLATFORM || 'github'],
  description: '小知识库',
  icon: '/rspress-icon.png',
  logo: {
    light: '/rspress-light-logo.png',
    dark: '/rspress-dark-logo.png',
  },
  markdown: {
    showLineNumbers: true,
  },
  themeConfig: {
    lastUpdated: true,
    socialLinks: [
      {
        icon: 'github',
        mode: 'link',
        content: 'https://github.com/cmtlyt/wiki',
      },
    ],
    outlineTitle: '目录',
    prevPageText: '上一页',
    nextPageText: '下一页',
    hideNavbar: 'auto',
    editLink: { text: '编辑本页', docRepoBaseUrl: 'https://github.com/cmtlyt/wiki' },
    enableAppearanceAnimation: true,
    enableContentAnimation: true,
    enableScrollToTop: true,
    lastUpdatedText: '最后更新于',
    outline: true,
    searchNoResultsText: '无结果',
    searchPlaceholderText: '搜索',
    searchSuggestedQueryText: '建议查询',
    sourceCodeText: '查看源码',
  },
  mediumZoom: true,
  plugins: [
    readingTime({ defaultLocale: 'zh-CN' }),
  ],
});
