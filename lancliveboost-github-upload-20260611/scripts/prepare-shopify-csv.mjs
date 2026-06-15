#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const outputHeaders = [
  "Handle",
  "Title",
  "Body (HTML)",
  "Vendor",
  "Product Category",
  "Type",
  "Tags",
  "Published",
  "Option1 Name",
  "Option1 Value",
  "Variant SKU",
  "Variant Inventory Qty",
  "Variant Price",
  "Variant Compare At Price",
  "Variant Requires Shipping",
  "Variant Taxable",
  "Image Src",
  "SEO Title",
  "SEO Description",
  "Status"
];

const categoryRules = [
  {
    type: "Kitchen Appliances",
    code: "KA",
    tag: "kitchen-appliances",
    taxonomy: "Home & Garden > Kitchen & Dining",
    keywords: ["kettle", "blender", "grinder", "juicer", "chopper", "pan", "cooker", "kitchen", "fryer", "mixer", "scale", "coffee"]
  },
  {
    type: "Home Cleaning",
    code: "HC",
    tag: "home-cleaning",
    taxonomy: "Home & Garden > Household Supplies",
    keywords: ["mop", "clean", "cleaning", "brush", "broom", "wiper", "spray", "bathroom"]
  },
  {
    type: "Personal Care",
    code: "PC",
    tag: "personal-care",
    taxonomy: "Health & Beauty > Personal Care",
    keywords: ["hair", "dryer", "trimmer", "grooming", "beauty", "care", "lint", "shaver", "shaving", "razor"]
  },
  {
    type: "Storage & Organization",
    code: "SO",
    tag: "storage",
    taxonomy: "Home & Garden > Household Storage",
    keywords: ["storage", "box", "basket", "organizer", "rack", "container"]
  },
  {
    type: "Daily Use Products",
    code: "DU",
    tag: "daily-use",
    taxonomy: "Home & Garden",
    keywords: ["daily", "utility", "home", "household", "bundle", "pack"]
  }
];

const aliases = {
  title: ["title", "name", "product", "product name", "item", "item name"],
  handle: ["handle", "url handle", "slug"],
  description: ["body (html)", "body", "description", "desc", "details"],
  vendor: ["vendor", "brand"],
  type: ["type", "product type", "category"],
  tags: ["tags", "tag"],
  sku: ["sku", "variant sku", "item code", "code"],
  inventory: ["inventory", "inventory qty", "variant inventory qty", "quantity", "qty", "stock"],
  price: ["new prices", "new price", "price", "variant price", "selling price", "sale price", "pkr price"],
  compareAt: ["compare at price", "variant compare at price", "compare-at price", "original price", "mrp", "old price"],
  image: ["image", "image src", "product image url", "image url", "photo"],
  seoTitle: ["seo title"],
  seoDescription: ["seo description", "meta description"],
  status: ["status"]
};

function normalizeHeader(value) {
  return String(value || "").trim().toLowerCase();
}

function getField(row, field) {
  const keys = aliases[field] || [field];
  for (const key of keys) {
    const match = Object.keys(row).find((header) => normalizeHeader(header) === key);
    if (match && row[match] !== undefined && row[match] !== "") return String(row[match]).trim();
  }
  return "";
}

function slugify(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 90);
}

function parseMoney(value) {
  const cleaned = String(value || "").replace(/[^0-9.]/g, "");
  return cleaned || "0";
}

function parseInventory(value) {
  const cleaned = Number.parseInt(String(value || "").replace(/[^0-9-]/g, ""), 10);
  return Number.isFinite(cleaned) ? String(Math.max(0, cleaned)) : "0";
}

function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function classify(row) {
  const explicitType = getField(row, "type");
  const haystack = `${getField(row, "title")} ${getField(row, "description")} ${explicitType} ${getField(row, "tags")}`.toLowerCase();
  const byType = categoryRules.find((rule) => normalizeHeader(rule.type) === normalizeHeader(explicitType));
  if (byType) return byType;
  return categoryRules.find((rule) => rule.keywords.some((keyword) => haystack.includes(keyword))) || categoryRules[4];
}

function buildDescription(title, description) {
  const intro = description || `${title} for practical daily home use in Pakistan.`;
  return [
    `<p>${escapeHtml(intro)}</p>`,
    "<ul>",
    "<li>Practical use for Pakistani households</li>",
    "<li>Quality checked before dispatch</li>",
    "<li>Cash on Delivery available where supported</li>",
    "<li>Suitable for daily home use</li>",
    "</ul>"
  ].join("");
}

function buildTags(rule, row) {
  const inputTags = getField(row, "tags")
    .split(",")
    .map((tag) => slugify(tag))
    .filter(Boolean);
  return Array.from(new Set([rule.tag, "cod-available", "quality-checked", "pakistan", "daily-home-use", ...inputTags])).join(", ");
}

function makeSku(rule, counters, row) {
  const provided = getField(row, "sku");
  if (provided) return provided;
  counters[rule.code] = (counters[rule.code] || 0) + 1;
  return `PHE-${rule.code}-${String(counters[rule.code]).padStart(3, "0")}`;
}

function convertRow(row, counters) {
  const title = getField(row, "title");
  if (!title) return null;

  const rule = classify(row);
  const handle = getField(row, "handle") || slugify(title);
  const description = getField(row, "description");
  const price = parseMoney(getField(row, "price"));
  const compareAt = parseMoney(getField(row, "compareAt"));
  const seoTitle = getField(row, "seoTitle") || `${title} in Pakistan | Pak Home Essentials`;
  const seoDescription =
    getField(row, "seoDescription") ||
    `${title} for Pakistan homes. Quality checked, practical for daily use, and available with COD support.`;

  return {
    "Handle": handle,
    "Title": title,
    "Body (HTML)": buildDescription(title, description),
    "Vendor": getField(row, "vendor") || "Pak Home Essentials",
    "Product Category": rule.taxonomy,
    "Type": rule.type,
    "Tags": buildTags(rule, row),
    "Published": "TRUE",
    "Option1 Name": "Title",
    "Option1 Value": "Default Title",
    "Variant SKU": makeSku(rule, counters, row),
    "Variant Inventory Qty": parseInventory(getField(row, "inventory")),
    "Variant Price": price,
    "Variant Compare At Price": compareAt && Number(compareAt) > Number(price) ? compareAt : "",
    "Variant Requires Shipping": "TRUE",
    "Variant Taxable": "FALSE",
    "Image Src": getField(row, "image"),
    "SEO Title": seoTitle.slice(0, 70),
    "SEO Description": seoDescription.slice(0, 320),
    "Status": getField(row, "status") || "active"
  };
}

function parseCsv(content) {
  const rows = [];
  let cell = "";
  let row = [];
  let quoted = false;

  for (let index = 0; index < content.length; index += 1) {
    const char = content[index];
    const next = content[index + 1];
    if (char === '"' && quoted && next === '"') {
      cell += '"';
      index += 1;
    } else if (char === '"') {
      quoted = !quoted;
    } else if (char === "," && !quoted) {
      row.push(cell);
      cell = "";
    } else if ((char === "\n" || char === "\r") && !quoted) {
      if (char === "\r" && next === "\n") index += 1;
      row.push(cell);
      rows.push(row);
      row = [];
      cell = "";
    } else {
      cell += char;
    }
  }

  if (cell || row.length) {
    row.push(cell);
    rows.push(row);
  }

  const [headers = [], ...body] = rows.filter((item) => item.some((cellValue) => String(cellValue).trim()));
  return body.map((cells) =>
    Object.fromEntries(headers.map((header, index) => [String(header).trim(), String(cells[index] || "").trim()]))
  );
}

function parseText(content) {
  return content
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [title = "", price = "", inventory = "", image = ""] = line.split(/\t|\|/).map((part) => part.trim());
      return { Title: title, Price: price, Inventory: inventory, Image: image };
    });
}

function parseInput(filePath) {
  const content = fs.readFileSync(filePath, "utf8");
  if (filePath.endsWith(".json")) return JSON.parse(content);
  if (filePath.endsWith(".txt")) return parseText(content);
  return parseCsv(content);
}

function csvEscape(value) {
  const stringValue = String(value ?? "");
  if (/[",\n\r]/.test(stringValue)) return `"${stringValue.replace(/"/g, '""')}"`;
  return stringValue;
}

function toCsv(rows) {
  return [
    outputHeaders.join(","),
    ...rows.map((row) => outputHeaders.map((header) => csvEscape(row[header])).join(","))
  ].join("\n");
}

const inputPath = process.argv[2];
const outputPath = process.argv[3] || "shopify-products.csv";

if (!inputPath) {
  console.error("Usage: node scripts/prepare-shopify-csv.mjs <input.csv|input.json|input.txt> [output.csv]");
  process.exit(1);
}

const inputRows = parseInput(inputPath);
const skuCounters = {};
const outputRows = inputRows.map((row) => convertRow(row, skuCounters)).filter(Boolean);

if (!outputRows.length) {
  console.error("No valid products found. Make sure your file has a Title or product name column.");
  process.exit(1);
}

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, `${toCsv(outputRows)}\n`);
console.log(`Created ${outputPath} with ${outputRows.length} products.`);
