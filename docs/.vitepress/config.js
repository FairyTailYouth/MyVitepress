/*
 * @Autor: zt
 * @Description: 
 * @Date: 2022-09-27 11:09:34
 */
export default {
  title: "kittyui", //站点标题
  description: "一个vue3组件库", //mate标签description，多用于搜索引擎抓取摘要
  themeConfig: {
    siteTitle: "Kitty",
    logo: "/logo.png",
    socialLinks: [
      { icon: "github", link: "https://github.com/FairyTailYouth" },
      { icon: "twitter", link: "..." },
      // You can also add custom icons by passing SVG as string:
      {
        icon: {
          svg: '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Dribbble</title><path d="M12...6.38z"/></svg>',
        },
        link: "...",
      },
    ],
    nav: [
      { text: "博客", link: "/articles/组件库环境搭建" },
      { text: "GuideTest", link: "/guide/test" },
      { text: "gitee", link: "https://github.com/FairyTailYouth" },
      {
        text: "Drop Menu",
        items: [
          {
            items: [
              { text: "Item A1", link: "/item-A1" },
              { text: "Item A2", link: "/item-A2" },
            ],
          },
          {
            items: [
              { text: "Item B1", link: "/item-B1" },
              { text: "Item B2", link: "/item-B2" },
            ],
          },
        ],
      },
    ],
    sidebar: {
      "/articles/": [
        {
          text: "HTML",
          collapsible: true,
          collapsed: true,
          items: [
            {
              text: "pina和vuex",
              link: "/articles/pina和vuex",
            },
          ],
        },
        {
          text: "CSS",
          collapsible: true,
          collapsed: true,
          items: [
            {
              text: "pina和vuex",
              link: "/articles/pina和vuex",
            },
          ],
        },
        {
          text: "JavaScrpit",
          collapsible: true,
          collapsed: true,
          items: [
            {
              text: "学习连接",
              link: "/articles/javascript/index",
            },
            {
              text: "Obeject",
              link: "/articles/javascript/Object对象",
            },
            {
              text: "promise",
              link: "/articles/javascript/promise解读",
            },
          ],
        },
        {
          text: "pinia",
          collapsible: true,
          collapsed: true,
          items: [
            {
              text: "pina和vuex",
              link: "/articles/pina和vuex",
            },
          ],
        },
        {
          text: "Vue2",
          collapsible: true,
          collapsed: true,
          items: [
            {
              text: "pina和vuex",
              link: "/articles/pina和vuex",
            },
          ],
        },
        {
          text: "Vue3",
          collapsible: true,
          collapsed: true,
          items: [
            {
              text: "pina和vuex",
              link: "/articles/pina和vuex",
            },
          ],
        },
        {
          text: "TypeScript",
          collapsible: true,
          collapsed: true,
          items: [
            {
              text: "pina和vuex",
              link: "/articles/pina和vuex",
            },
          ],
        },
        {
          text: "Linux",
          collapsible: true,
          collapsed: true,
          items: [
            {
              text: "pina和vuex",
              link: "/articles/pina和vuex",
            },
          ],
        },
        {
          text: "组件库源码实现",
          collapsible: true,
          items: [
            {
              text: "组件库环境搭建",
              link: "/articles/组件库环境搭建",
            },
            { text: "gulp的使用", link: "/articles/gulp的使用" },
          ],
        },
        {
          text: "vue教程",
          collapsible: true,
          collapsed: true,
          items: [
            {
              text: "pina和vuex",
              link: "/articles/pina和vuex",
            },
          ],
        },
        {
          text: "webgl教程",
          collapsible: true,
          collapsed: true,
          items: [
            {
              text: "初识webgl",
              link: "/articles/webGl基础",
            },
          ],
        },
        {
          text: "uniapp",
          collapsible: true,
          collapsed: true,
          items: [
            {
              text: "安装配置",
              link: "/articles/uniapp/安装和使用",
            },
          ],
        },

      ],
    },
  },
};
