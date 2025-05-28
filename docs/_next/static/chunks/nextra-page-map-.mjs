import meta from "../../../src/pages/_meta.tsx";
import governor_meta from "../../../src/pages/governor/_meta.tsx";
export const pageMap = [{
  data: meta
}, {
  name: "api-reference",
  route: "/api-reference",
  frontMatter: {
    "sidebarTitle": "API Reference"
  }
}, {
  name: "architecture",
  route: "/architecture",
  frontMatter: {
    "sidebarTitle": "Architecture"
  }
}, {
  name: "contributing",
  route: "/contributing",
  frontMatter: {
    "sidebarTitle": "Contributing"
  }
}, {
  name: "examples",
  route: "/examples",
  frontMatter: {
    "sidebarTitle": "Examples"
  }
}, {
  name: "features",
  route: "/features",
  frontMatter: {
    "sidebarTitle": "Features"
  }
}, {
  name: "getting-started",
  route: "/getting-started",
  frontMatter: {
    "sidebarTitle": "Getting Started"
  }
}, {
  name: "governor",
  route: "/governor",
  children: [{
    data: governor_meta
  }, {
    name: "adaptation",
    route: "/governor/adaptation",
    frontMatter: {
      "sidebarTitle": "Adaptation"
    }
  }, {
    name: "api",
    route: "/governor/api",
    frontMatter: {
      "sidebarTitle": "API"
    }
  }, {
    name: "context",
    route: "/governor/context",
    frontMatter: {
      "sidebarTitle": "Context"
    }
  }, {
    name: "core",
    route: "/governor/core",
    frontMatter: {
      "sidebarTitle": "Core"
    }
  }, {
    name: "error",
    route: "/governor/error",
    frontMatter: {
      "sidebarTitle": "Error"
    }
  }, {
    name: "tasks",
    route: "/governor/tasks",
    frontMatter: {
      "sidebarTitle": "Tasks"
    }
  }]
}, {
  name: "governor",
  route: "/governor",
  frontMatter: {
    "sidebarTitle": "Governor"
  }
}, {
  name: "index",
  route: "/",
  frontMatter: {
    "sidebarTitle": "Index"
  }
}];