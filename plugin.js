// Baut D1 · Dark · Dashboard als native Penpot-Formen (Board, Rechtecke, Texte).
// Koordinaten und Farben stammen aus dem Figma-Frame 280:669 (760 × 1640).

const T = {
  bg: "#0a0f1d", card: "#0f1729", card2: "#121b2e", border: "#2a3756", border2: "#233150",
  text: "#e8ecf5", muted: "#8b95ab", accent: "#8fb4ff", primary: "#3b7bf6",
  search: "#1d2944", tabBg: "#121a2c", tabStroke: "#26324d",
};

function fill(shape, color) {
  shape.fills = [{ fillColor: color, fillOpacity: 1 }];
}

function rect(parent, x, y, w, h, color, radius = 0, stroke = null) {
  const r = penpot.createRectangle();
  r.resize(w, h);
  r.x = x;
  r.y = y;
  fill(r, color);
  if (radius) {
    try { r.borderRadius = radius; } catch (e) { /* ältere Penpot-Version */ }
  }
  if (stroke) {
    r.strokes = [{ strokeColor: stroke, strokeWidth: 1.5, strokeAlignment: "inner" }];
  }
  parent.appendChild(r);
  return r;
}

function text(parent, x, y, str, size, color, weight = 400) {
  const t = penpot.createText(str);
  t.x = x;
  t.y = y;
  t.fontSize = String(size);
  t.fontWeight = String(weight);
  t.fontFamily = "Inter";
  fill(t, color);
  parent.appendChild(t);
  return t;
}

// ---- Board ----
const board = penpot.createBoard();
board.name = "D1 · Dark · Dashboard";
board.resize(760, 1640);
board.x = 0;
board.y = 0;
fill(board, T.bg);

// Statusleiste + Kopf
text(board, 58, 32, "9:41", 30, T.text, 500);
text(board, 38, 96, "Di., 1. April", 22, T.muted, 500);
text(board, 38, 125, "Max Krüger · PI Mitte", 26, T.text, 600);
rect(board, 562, 90, 72, 72, T.card2, 36, T.border2);
rect(board, 608, 86, 30, 30, "#ff5c5c", 15);
text(board, 616, 90, "3", 18, "#ffffff", 700);
rect(board, 650, 90, 72, 72, "#cfe0ff", 36);
text(board, 668, 111, "MK", 24, "#0b1a3a", 600);

// Suche
rect(board, 38, 178, 684, 87, T.card, 43.5, T.border);
text(board, 115, 208, "Vorgang, Asservat, Barcode, Person …", 24, T.muted);
rect(board, 648, 191, 60, 60, T.search, 30);

// Kennzahlen (2 × 2)
const kpis = [
  [38, 287, "18", "Vorgänge", "12 in Bearbeitung"],
  [387, 287, "342", "Gegenstände", "62 nicht zugeordnet"],
  [38, 462, "7", "Offene Aufgaben", "3 fällig"],
  [387, 462, "4", "Lagerorte", "1 in Prüfung"],
];
for (const [x, y, num, label, sub] of kpis) {
  rect(board, x, y, 335, 161, T.card, 24, T.border);
  text(board, x + 89, y + 30, num, 52, T.text, 300);
  text(board, x + 89, y + 94, label, 22, T.text, 600);
  text(board, x + 89, y + 120, sub, 20, T.muted);
}

// Meine Aufgaben
text(board, 38, 645, "Meine Aufgaben", 32, T.text, 600);
text(board, 648, 650, "Alle", 24, T.accent, 600);
rect(board, 38, 706, 684, 528, T.card2, 28, T.border2);
const tasks = [
  ["Fällig", "3", "#ff7a7a"],
  ["In Bearbeitung", "2", "#ffb35c"],
  ["Rückmeldungen", "1", "#8fb4ff"],
  ["Abholung", "4", "#b9a4ff"],
  ["Verwertung", "3", "#3ddc97"],
  ["Herausgabe an Beteiligte", "1", "#8b95ab"],
  ["Neue Notizen", "0", "#8b95ab"],
];
tasks.forEach(([label, count, color], i) => {
  const y = 712 + i * 73.5;
  if (i > 0) rect(board, 64, y, 632, 1.5, T.border2);
  rect(board, 64, y + 12, 48, 48, color + "24", 17);
  text(board, 130, y + 24, label, 26, i < 6 ? T.text : T.muted, 500);
  text(board, 620, y + 24, count, 24, color, 600);
});

// Tab-Leiste (schwebend)
rect(board, 24, 1472, 712, 124, T.tabBg, 62, T.tabStroke);
text(board, 80, 1557, "Start", 20, T.accent, 600);
text(board, 215, 1562, "Aufgaben", 20, T.muted, 500);
text(board, 480, 1562, "Erfassen", 20, T.muted, 500);
text(board, 630, 1562, "Lager", 20, T.muted, 500);
rect(board, 336, 1420, 88, 88, T.primary, 44);

penpot.closePlugin && penpot.closePlugin();
