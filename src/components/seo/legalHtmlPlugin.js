import { buildSync } from "esbuild";
import { createRequire } from "node:module";
import path from "node:path";

// Render the existing legal React components, so fallback copy cannot drift.
export default function legalHtmlPlugin() {
  return {
    name: "boombuy-legal-html",
    enforce: "post",
    generateBundle(_options, bundle) {
      const index = bundle["index.html"];
      if (!index) throw new Error("Missing built index.html");
      const root = process.cwd();
      const code = buildSync({
        stdin: { contents: `import React from "react";
import {renderToStaticMarkup} from "react-dom/server";
import {StaticRouter} from "react-router-dom/server";
import Privacy from "./src/pages/Privacy.jsx";
import PageNotFound from "./src/lib/PageNotFound.jsx";
import Accessibility from "./src/pages/AccessibilityStatement.jsx";
export function render(route) {
 const Page = route === "/404" ? PageNotFound : route === "/privacy" ? Privacy : Accessibility;
 return renderToStaticMarkup(React.createElement(StaticRouter,{location:route},React.createElement(Page)));
}`, resolveDir: root, loader: "jsx" },
        bundle: true, write: false, platform: "node", format: "cjs",
        packages: "external", alias: { "@": path.join(root, "src") }
      }).outputFiles[0].text;
      const mod = { exports: {} };
      new Function("require", "module", "exports", code)(createRequire(path.join(root,"package.json")), mod, mod.exports);
      const routes = [
        ["/404", "העמוד לא נמצא | boombuy", "העמוד שחיפשתם אינו קיים באתר boombuy."],
        ["/privacy", "מדיניות פרטיות | boombuy", "מידע על איסוף פרטים, השימוש בהם ודרכי הפנייה בנושא פרטיות באתר boombuy."],
        ["/accessibility", "הצהרת נגישות | boombuy", "התאמות הנגישות באתר boombuy ודרכי הפנייה לקבלת סיוע."]
      ];
      for (const [route,title,description] of routes) {
        const canonical = "https://boombuyonepage.com" + route + ".html";
        let html = String(index.source)
          .replace(/<title>[\s\S]*?<\/title>/, "<title>"+title+"</title>")
          .replace(/(<meta (?:name|property)="(?:description|og:description|twitter:description)" content=")[^"]*"/g, '$1'+description+'"')
          .replace(/(<meta (?:name|property)="(?:og:title|twitter:title)" content=")[^"]*"/g, '$1'+title+'"')
          .replace(/(<link rel="canonical" href=")[^"]*"/g, '$1'+canonical+'"')
          .replace(/(<meta property="og:url" content=")[^"]*"/g, '$1'+canonical+'"')
          .replace(/<div id="root">[\s\S]*<\/div>(\s*<script|\s*<\/body>)/, '<div id="root">'+mod.exports.render(route)+'</div>$1');
        if (route === "/404") {
          html = html.replace(/<link\b[^>]*rel="canonical"[^>]*>/g, "")
            .replace(/<meta\b[^>]*name="robots"[^>]*>/g, "")
            .replace(/<meta\b[^>]*property="og:url"[^>]*>/g, "")
            .replace("</head>", '<meta name="robots" content="noindex,follow"/><meta name="prerender-status-code" data-bb-static-404="true" content="404"/></head>');
        }
        if (html.includes('id="faq"') || (html.match(/<h1\b/g)||[]).length !== 1) throw new Error("Invalid legal fallback: "+route);
        this.emitFile({ type:"asset", fileName: route.slice(1)+"/index.html", source:html });
        this.emitFile({ type:"asset", fileName: route.slice(1)+".html", source:html });
      }
    }
  };
}
