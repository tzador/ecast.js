import { E, C, A, S, T, render, pretty } from "../src/ecast.js";

function layout(body) {
  E("html", () => {
    E("head", () => {});
    E("body", () => {
      E("nav", () => {
        E("a", { href: "/" }, "Home");
        E("a", { href: "/about" }, "About");
      });
      E("main", () => {
        body();
      });
    });
  });
}

function home_page() {
  layout(() => {
    E("h1", "This is home");
    E(".cls", "This is about");
    E(".cls1.cls2", "This is about");
    E("#id", "hello");
  });
}

function about_page() {
  layout(() => {
    E("h1", "About");
  });
}

function test(f) {
  const tree = render(f);
  console.log("----");
  console.log(JSON.stringify(tree, null, 2));
  const html = pretty(tree);
  console.log(html);
}

test(home_page);
// test(about_page);
