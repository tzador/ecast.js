let stack;

export function E(selector, ...parts) {
  const { tagname, classes, id } = parse_selector(selector);
  // console.log(selector, { tagname, classes, id });
  const top = {
    tagname,
    children: [],
    classes: new Set(classes),
    attributes: new Map(),
    styles: new Map(),
  };
  stack[stack.length - 1].children.push(top);
  stack.push(top);
  for (const part of parts) {
    if (typeof part == "object") {
    }
    if (typeof part == "function") {
      part();
    }
    if (typeof part == "string") {
      top.children.push(part);
    }
  }
  stack.pop();
}

export function C(name, value) {}

export function A(name, value) {}

export function S(name, value) {}

export function T(value) {}

export function render(f) {
  stack = [
    {
      tagname: "root",
      children: [],
    },
  ];
  f();
  return stack[0];
}

export function pretty(tree) {
  const parts = [];
  function indent(depth) {
    for (let i = 0; i < depth; i++) parts.push("  ");
  }
  function helper(node, depth) {
    if (typeof node == "string") {
      indent(depth);
      parts.push(node + "\n"); // TODO: escape
      return;
    }
    indent(depth);
    console.log(node);
    parts.push("<" + node.tagname + ">\n");
    for (const child of node.children) {
      helper(child, depth + 1);
    }
    indent(depth);
    parts.push("</" + node.tagname + ">\n");
  }
  helper(tree, 0);
  return parts.join("");
}

function parse_selector(selector) {
  const match = selector.match(/^([A-Za-z0-9-]*)([\.A-Za-z0-9-]*)([#A-Za-z0-9-]*)$/);
  if (!match) throw new Error(`invalid selector "${selector}"`);
  const tagname = match[1] || "div";
  const classes = match[2].split(".").slice(1);
  const id = match[3].slice(1) || null;
  return { tagname, classes, id };
}
