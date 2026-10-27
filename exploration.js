const canvas = document.querySelector("#outpost-map");
const ctx = canvas.getContext("2d");
const text = {
  pt: {
    commandCenter: "CENTRO DE OPERAÇÕES", expedition: "EXPEDIÇÃO 01", eyebrow: "EXPEDIÇÃO DE CAMPO <span>·</span> EQUIPE 04", headline: "Um mundo novo.<br><span>Uma chance de mantê-lo vivo.</span>", moon: "LUA", mars: "MARTE", crewStatus: "STATUS DA<br>TRIPULAÇÃO", inField: "EM<br>CAMPO", oxygen: "OXIGÊNIO", water: "ÁGUA", food: "ALIMENTOS", energy: "ENERGIA", shield: "BLINDAGEM", surface: "SUPERFÍCIE", outpost: "Posto avançado", operational: "OPERACIONAL", sol: "SOL", structures: "MÓDULOS", supplies: "SUPRIMENTOS", you: "VOCÊ", fieldLog: "DIÁRIO DE CAMPO", fieldTeam: "EQUIPE DE CAMPO", chooseCrew: "Escolha quem vai explorar", backpack: "MOCHILA", collectibleItems: "ITENS COLETÁVEIS", scrap: "Sucata", ice: "Gelo", seeds: "Sementes", nearby: "PERTO DE VOCÊ", moveHint: "mover", actionHint: "interagir", endSol: "ENCERRAR SOL", fieldLab: "LABORATÓRIO DE EXPLORAÇÃO", footerLine: "CAMINHE · DESCUBRA · CONSTRUA", moonName: "CRATERA SHACKLETON", marsName: "PLANÍCIE DE UTOPIA", moonWeather: "CÉU LIMPO · −42 °C", marsWeather: "VENTOS LEVES · −18 °C", habitat: "HABITAT PRINCIPAL", habitatDesc: "Abrigo pressurizado. A tripulação descansa e se prepara para explorar.", solar: "CAMPO SOLAR", solarDesc: "Painéis que mantêm os sistemas do posto carregados.", greenhouse: "ESTUFA HIDROPÔNICA", greenhouseDesc: "Cultivo experimental de alimentos e sementes.", recycler: "RECICLAGEM DE ÁGUA", recyclerDesc: "Sistema que recupera água para a equipe.", antenna: "ANTENA DE COMUNICAÇÃO", antennaDesc: "Conecta a equipe ao controle da missão.", scrapNode: "CAIXA DE SUCATA", scrapDesc: "Peças recuperáveis para reparar e aprimorar módulos.", iceNode: "DEPÓSITO DE GELO", iceDesc: "Gelo útil para reabastecer o sistema de água.", seedNode: "PACOTE DE SEMENTES", seedDesc: "Sementes para a estufa e para a próxima colheita.", selectSpot: "Escolha um ponto no mapa", exploreHint: "Caminhe até um suprimento ou módulo para interagir.", collect: "COLETAR", upgrade: "APRIMORAR MÓDULO", visit: "VISITAR MÓDULO", moveCloser: "MOVER ATÉ O ALVO", collected: "Coletado", upgraded: "Módulo aprimorado", maxUpgrade: "Este módulo já está no nível máximo.", missing: "Faltam itens para esta melhoria.", needsNear: "Chegue mais perto para interagir.", empty: "Este ponto já foi explorado. Procure outros suprimentos.", welcome: "A equipe chegou. Explore o terreno, recolha suprimentos e ajude a base a crescer.", moved: "A equipe está a caminho.", moonChanged: "Destino alterado. A luz lunar favorece a exploração e a recarga solar.", marsChanged: "Destino alterado. Em Marte, fique de olho nos depósitos de gelo.", solStarted: "Novo sol! Os suprimentos da região foram renovados.", successTitle: "12 sóis de descobertas.", successCopy: "Sua equipe explorou a região, reuniu recursos e transformou o posto avançado em um lar.", failTitle: "A expedição foi interrompida.", failCopy: "Um recurso essencial acabou. A equipe precisou voltar ao abrigo.", complete: "EXPEDIÇÃO CONCLUÍDA", failed: "EXPEDIÇÃO INTERROMPIDA", report: "RELATÓRIO DA EXPEDIÇÃO", survived: "SÓIS EXPLORADOS", crew: "TRIPULANTES", resilience: "ESTADO DA BASE", restart: "NOVA EXPEDIÇÃO", repair: "Reparo eficiente", botanist: "Colheita extra", geologist: "Sucata extra", medic: "Cuidado da equipe", skill: "HABILIDADE", level: "NÍVEL", cost: "CUSTO", noTarget: "Nada selecionado", targetEmpty: "Este suprimento já foi recolhido.", scrapFound: "Encontrou sucata", iceFound: "Coletou gelo", seedsFound: "Coletou sementes", skillBonus: "Bônus de habilidade", interaction: "Interação", keyboard: "Use WASD ou as setas para caminhar. Selecione um ponto no mapa e pressione E para interagir.", habitatUpgrade: "Melhora a proteção do habitat.", solarUpgrade: "Aumenta a energia recuperada a cada sol.", greenhouseUpgrade: "Aumenta a produção de alimentos.", recyclerUpgrade: "Recupera água a cada sol.", antennaUpgrade: "Amplia o alcance da equipe: ganha um item extra ao explorar.", costLine: "Próxima melhoria", fieldMessage: "A equipe encontrou algo interessante.", mobileMove: "TOQUE NAS SETAS PARA CAMINHAR"
  },
  en: {
    commandCenter: "MISSION CONTROL", expedition: "EXPEDITION 01", eyebrow: "FIELD EXPEDITION <span>·</span> CREW 04", headline: "A new world.<br><span>One chance to keep it alive.</span>", moon: "MOON", mars: "MARS", crewStatus: "CREW<br>STATUS", inField: "IN THE<br>FIELD", oxygen: "OXYGEN", water: "WATER", food: "FOOD", energy: "ENERGY", shield: "SHIELDING", surface: "SURFACE", outpost: "Outpost", operational: "OPERATIONAL", sol: "SOL", structures: "MODULES", supplies: "SUPPLIES", you: "YOU", fieldLog: "FIELD JOURNAL", fieldTeam: "FIELD CREW", chooseCrew: "Choose your explorer", backpack: "BACKPACK", collectibleItems: "COLLECTED ITEMS", scrap: "Scrap", ice: "Ice", seeds: "Seeds", nearby: "NEARBY", moveHint: "move", actionHint: "interact", endSol: "END SOL", fieldLab: "EXPLORATION LAB", footerLine: "EXPLORE · DISCOVER · BUILD", moonName: "SHACKLETON CRATER", marsName: "UTOPIA PLANITIA", moonWeather: "CLEAR SKY · −42 °C", marsWeather: "LIGHT WINDS · −18 °C", habitat: "MAIN HABITAT", habitatDesc: "Pressurized shelter where the crew rests and prepares to explore.", solar: "SOLAR ARRAY", solarDesc: "Panels that keep the outpost systems charged.", greenhouse: "HYDROPONIC GREENHOUSE", greenhouseDesc: "Experimental food crops and seed production.", recycler: "WATER RECYCLER", recyclerDesc: "System that recovers water for the crew.", antenna: "COMMUNICATIONS ARRAY", antennaDesc: "Connects the crew to mission control.", scrapNode: "SCRAP CRATE", scrapDesc: "Salvage parts for repairing and upgrading modules.", iceNode: "ICE DEPOSIT", iceDesc: "Useful ice to replenish the water system.", seedNode: "SEED PACKET", seedDesc: "Seeds for the greenhouse and the next harvest.", selectSpot: "Choose a spot on the map", exploreHint: "Walk to a supply or module to interact.", collect: "COLLECT", upgrade: "UPGRADE MODULE", visit: "VISIT MODULE", moveCloser: "MOVE TO TARGET", collected: "Collected", upgraded: "Module upgraded", maxUpgrade: "This module is already at maximum level.", missing: "You need more items for this upgrade.", needsNear: "Move closer to interact.", empty: "This spot has been explored. Look for more supplies.", welcome: "The crew has arrived. Explore the terrain, gather supplies, and help the outpost grow.", moved: "Your crew is on the move.", moonChanged: "Destination changed. Moonlight helps exploration and solar charging.", marsChanged: "Destination changed. Keep an eye out for ice deposits on Mars.", solStarted: "New sol! Supplies around the outpost have been replenished.", successTitle: "12 sols of discovery.", successCopy: "Your crew explored the region, gathered resources, and turned the outpost into a home.", failTitle: "The expedition has ended.", failCopy: "An essential resource ran out. The crew had to return to shelter.", complete: "EXPEDITION COMPLETE", failed: "EXPEDITION ENDED", report: "EXPEDITION REPORT", survived: "SOLS EXPLORED", crew: "CREW MEMBERS", resilience: "OUTPOST STATUS", restart: "NEW EXPEDITION", repair: "Efficient repairs", botanist: "Bonus harvest", geologist: "Bonus salvage", medic: "Crew care", skill: "SKILL", level: "LEVEL", cost: "COST", noTarget: "Nothing selected", targetEmpty: "This supply has already been collected.", scrapFound: "Scrap collected", iceFound: "Ice collected", seedsFound: "Seeds collected", skillBonus: "Skill bonus", interaction: "Interaction", keyboard: "Use WASD or the arrow keys to walk. Select a spot on the map and press E to interact.", habitatUpgrade: "Improves habitat protection.", solarUpgrade: "Increases power restored each sol.", greenhouseUpgrade: "Increases food production.", recyclerUpgrade: "Restores water each sol.", antennaUpgrade: "Extends crew reach: find one extra item while exploring.", costLine: "Next upgrade", fieldMessage: "The crew found something interesting.", mobileMove: "TAP THE ARROWS TO WALK"
  }
};

const extraText = {
  pt: { baseTitle: "POSTO AVANÇADO", baseDesc: "Sua equipe está explorando uma nova região.", outpostCoords: "POSTO AVANÇADO 04 · SETOR A", module: "MÓDULO", sector: "SETOR", destinationLabel: "Escolher destino", crewLabel: "Escolher tripulante", inventoryLabel: "Inventário", movementLabel: "Movimentação", statusLabel: "Indicadores da missão", controlsLabel: "Controles da exploração", upLabel: "Mover para cima", downLabel: "Mover para baixo", leftLabel: "Mover para esquerda", rightLabel: "Mover para direita", bonusMessage: "Bônus de habilidade", upgradeMessage: "aprimorado", welcome: "A equipe chegou. Explore o terreno, recolha suprimentos e ajude a base a crescer.", moved: "A equipe está a caminho.", moonChanged: "Destino alterado. A luz lunar favorece a exploração e a recarga solar.", marsChanged: "Destino alterado. Em Marte, fique de olho nos depósitos de gelo.", solStarted: "Novo sol! Os suprimentos da região foram renovados.", empty: "Este ponto já foi explorado. Procure outros suprimentos.", missing: "Faltam itens para esta melhoria." },
  en: { baseTitle: "OUTPOST", baseDesc: "Your crew is exploring a new region.", outpostCoords: "OUTPOST 04 · SECTOR A", module: "MODULE", sector: "SECTOR", destinationLabel: "Choose destination", crewLabel: "Choose crew member", inventoryLabel: "Inventory", movementLabel: "Movement", statusLabel: "Mission indicators", controlsLabel: "Exploration controls", upLabel: "Move up", downLabel: "Move down", leftLabel: "Move left", rightLabel: "Move right", bonusMessage: "Skill bonus", upgradeMessage: "upgraded", welcome: "The crew has arrived. Explore the terrain, gather supplies, and help the outpost grow.", moved: "Your crew is on the move.", moonChanged: "Destination changed. Moonlight helps exploration and solar charging.", marsChanged: "Destination changed. Keep an eye out for ice deposits on Mars.", solStarted: "New sol! Supplies around the outpost have been replenished.", empty: "This spot has been explored. Look for more supplies.", missing: "You need more items for this upgrade." }
};
const introText = {
  pt: { challengeLabel: "NASA SPACE APPS CHALLENGE · 2026", introKicker: "UMA EXPEDIÇÃO DE CAMPO EM OUTRO MUNDO", introTitle: "A próxima fronteira<br><span>precisa de você.</span>", introCopy: "Lidere uma equipe de especialistas em uma expedição lunar ou marciana. Explore o mapa, encontre suprimentos e ajude a construir um lar longe da Terra.", launch: "COMEÇAR EXPEDIÇÃO", challengeLink: "CONHEÇA O DESAFIO", projectNote: "Projeto educacional independente, desenvolvido para o desafio NASA Space Apps 2026.", imageCredit: "IMAGEM: APOLLO 11 · NASA" },
  en: { challengeLabel: "NASA SPACE APPS CHALLENGE · 2026", introKicker: "A FIELD EXPEDITION ON ANOTHER WORLD", introTitle: "The next frontier<br><span>needs you.</span>", introCopy: "Lead a team of specialists on a lunar or Martian expedition. Explore the map, find supplies, and help build a home far from Earth.", launch: "START EXPEDITION", challengeLink: "EXPLORE THE CHALLENGE", projectNote: "Independent educational project developed for the NASA Space Apps 2026 challenge.", imageCredit: "IMAGE: APOLLO 11 · NASA" }
};

const crew = [
  { name: { pt: "Mara Vega", en: "Mara Vega" }, role: { pt: "Geóloga", en: "Geologist" }, skill: "geologist", color: "#d8a16b", mark: "◆" },
  { name: { pt: "Noah Okafor", en: "Noah Okafor" }, role: { pt: "Botânico", en: "Botanist" }, skill: "botanist", color: "#93b875", mark: "✳" },
  { name: { pt: "Inez Park", en: "Inez Park" }, role: { pt: "Engenheira", en: "Engineer" }, skill: "repair", color: "#85b9bf", mark: "⌁" },
  { name: { pt: "Ravi Costa", en: "Ravi Costa" }, role: { pt: "Médico", en: "Medic" }, skill: "medic", color: "#d78b79", mark: "+" }
];
const buildings = [
  { id: "habitat", col: 4, row: 3, key: "habitat", desc: "habitatDesc", upgrade: "habitatUpgrade", icon: "⌂" },
  { id: "solar", col: 7, row: 2, key: "solar", desc: "solarDesc", upgrade: "solarUpgrade", icon: "ϟ" },
  { id: "greenhouse", col: 6, row: 6, key: "greenhouse", desc: "greenhouseDesc", upgrade: "greenhouseUpgrade", icon: "✳" },
  { id: "recycler", col: 2, row: 4, key: "recycler", desc: "recyclerDesc", upgrade: "recyclerUpgrade", icon: "H₂O" },
  { id: "antenna", col: 8, row: 4, key: "antenna", desc: "antennaDesc", upgrade: "antennaUpgrade", icon: "⌁" }
];
const nodeTypes = {
  scrap: { icon: "⬡", name: "scrapNode", desc: "scrapDesc", inventory: "scrap" },
  ice: { icon: "◆", name: "iceNode", desc: "iceDesc", inventory: "ice" },
  seeds: { icon: "✳", name: "seedNode", desc: "seedDesc", inventory: "seeds" }
};
const initialNodes = [
  { id: 1, type: "scrap", col: 0, row: 0 }, { id: 2, type: "ice", col: 9, row: 7 },
  { id: 3, type: "seeds", col: 3, row: 7 }, { id: 4, type: "scrap", col: 1, row: 1 },
  { id: 5, type: "ice", col: 4, row: 6 }, { id: 6, type: "seeds", col: 8, row: 1 },
  { id: 7, type: "scrap", col: 9, row: 3 }, { id: 8, type: "ice", col: 0, row: 6 }
];
const costs = { habitat: { scrap: 2, ice: 1 }, solar: { scrap: 2 }, greenhouse: { scrap: 2, seeds: 1 }, recycler: { scrap: 1, ice: 2 }, antenna: { scrap: 2, seeds: 1 } };
const state = {
  language: localStorage.getItem("fronteira-language") === "en" ? "en" : "pt",
  world: "moon", sol: 1, selectedCrew: 0, player: { col: 2, row: 6 },
  target: null, destination: null, animation: null, moveTimer: null,
  resources: { oxygen: 82, water: 74, food: 68, energy: 76, shield: 64 },
  inventory: { scrap: 1, ice: 0, seeds: 0 }, upgrades: { habitat: 0, solar: 0, greenhouse: 0, recycler: 0, antenna: 0 },
  nodes: structuredClone(initialNodes), ended: false,
  lastMessage: { pt: extraText.pt.welcome, en: extraText.en.welcome }
};

const t = key => text[state.language][key] || extraText[state.language][key] || introText[state.language][key] || key;
const tFor = (key, language) => text[language][key] || extraText[language][key] || introText[language][key] || key;
const clamp = number => Math.max(0, Math.min(100, Math.round(number)));
const rect = () => canvas.getBoundingClientRect();
function setMessage(message, englishMessage = message) {
  state.lastMessage = { pt: message, en: englishMessage };
  document.querySelector("#event-message").textContent = state.lastMessage[state.language];
}
function applyLanguage() {
  const language = state.language;
  document.documentElement.lang = language === "pt" ? "pt-BR" : "en";
  document.title = language === "pt" ? "Fronteira | Exploração espacial" : "Frontier | Space exploration";
  document.querySelectorAll("[data-i18n]").forEach(element => { element.innerHTML = t(element.dataset.i18n); });
  document.querySelectorAll("[data-language]").forEach(button => {
    const active = button.dataset.language === language;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });
  document.querySelector(".mission-switcher").setAttribute("aria-label", t("destinationLabel"));
  document.querySelector(".status-strip").setAttribute("aria-label", t("statusLabel"));
  document.querySelector(".explorer-panel").setAttribute("aria-label", t("controlsLabel"));
  document.querySelector("#crew-picker").setAttribute("aria-label", t("crewLabel"));
  document.querySelector(".inventory-list").setAttribute("aria-label", t("inventoryLabel"));
  document.querySelector(".dpad").setAttribute("aria-label", t("movementLabel"));
  document.querySelectorAll("[data-move]").forEach(button => button.setAttribute("aria-label", t(`${button.dataset.move}Label`)));
  document.querySelector("#event-message").textContent = state.lastMessage[language];
  document.querySelector("#map-weather").textContent = t(state.world === "moon" ? "moonWeather" : "marsWeather");
  document.querySelector("#location-label").textContent = t(state.world === "moon" ? "moonName" : "marsName");
  document.querySelector("#outpost-map").setAttribute("aria-label", t("keyboard"));
  updateCrew();
  updateTarget();
  updateUI();
}
function changeLanguage(language) {
  state.language = language;
  localStorage.setItem("fronteira-language", language);
  applyLanguage();
}
function tileSize() {
  const box = rect();
  const width = Math.min(box.width / 9.2, box.height / 5.3);
  const height = width * .48;
  return { width, height, originX: box.width / 2 - width / 2, originY: box.height / 2 - height * 4 };
}
function tilePoint(col, row) {
  const tile = tileSize();
  return { x: tile.originX + (col - row) * tile.width / 2, y: tile.originY + (col + row) * tile.height / 2 + tile.height / 2 };
}
function drawMap() {
  const box = rect();
  if (!box.width || !box.height) return;
  const scale = window.devicePixelRatio || 1;
  if (canvas.width !== Math.round(box.width * scale) || canvas.height !== Math.round(box.height * scale)) {
    canvas.width = Math.round(box.width * scale); canvas.height = Math.round(box.height * scale);
  }
  ctx.setTransform(scale, 0, 0, scale, 0, 0);
  const width = box.width, height = box.height, tile = tileSize(), mars = state.world === "mars";
  const sky = ctx.createLinearGradient(0, 0, 0, height);
  sky.addColorStop(0, mars ? "#50342d" : "#273936"); sky.addColorStop(1, mars ? "#6c4535" : "#45564b");
  ctx.fillStyle = sky; ctx.fillRect(0, 0, width, height);
  for (let i = 0; i < 50; i += 1) {
    ctx.fillStyle = i % 7 === 0 ? "#e5dba76b" : "#d3d7cb45";
    ctx.fillRect(((i * 127 + 39) % 997) / 997 * width, ((i * 71 + 17) % 541) / 541 * height * .58, i % 5 === 0 ? 2 : 1, i % 5 === 0 ? 2 : 1);
  }
  ctx.fillStyle = mars ? "#af795d" : "#829081"; ctx.beginPath(); ctx.ellipse(width * .74, height * .17, width * .075, width * .075, 0, 0, Math.PI * 2); ctx.fill();
  const palette = mars ? ["#b87655", "#a8674d", "#c27d59", "#995b47"] : ["#8c9981", "#7c8974", "#9aa18b", "#717f70"];
  for (let row = 0; row < 8; row += 1) for (let col = 0; col < 10; col += 1) {
    const p = tilePoint(col, row);
    ctx.beginPath(); ctx.moveTo(p.x, p.y - tile.height / 2); ctx.lineTo(p.x + tile.width / 2, p.y); ctx.lineTo(p.x, p.y + tile.height / 2); ctx.lineTo(p.x - tile.width / 2, p.y); ctx.closePath();
    ctx.fillStyle = palette[(col * 3 + row * 5) % palette.length]; ctx.fill(); ctx.strokeStyle = mars ? "#dc9b7550" : "#c5c9aa3b"; ctx.stroke();
    if ((col * 11 + row * 17) % 9 === 1) { ctx.fillStyle = mars ? "#754b3a" : "#536454"; ctx.beginPath(); ctx.ellipse(p.x + 5, p.y, tile.width * .06, tile.height * .1, .3, 0, Math.PI * 2); ctx.fill(); }
  }
  drawBuildings(tile);
  drawNodes(tile);
  drawCrew(tile);
  ctx.font = "8px 'DM Mono', monospace"; ctx.fillStyle = "#eff1de"; ctx.textAlign = "left"; ctx.fillText("OUTPOST 04", 14, height - 16);
}
function drawBuildings(tile) {
  for (const building of [...buildings].sort((a, b) => a.col + a.row - b.col - b.row)) {
    const { x, y } = tilePoint(building.col, building.row);
    const selected = state.target?.id === building.id;
    ctx.fillStyle = selected ? "#c8f169" : "#d4d5ae"; ctx.globalAlpha = .85; ctx.beginPath(); ctx.ellipse(x, y, tile.width * .3, tile.height * .35, 0, 0, Math.PI * 2); ctx.fill(); ctx.globalAlpha = 1;
    if (building.id === "habitat") {
      ctx.fillStyle = "#96a59a"; ctx.beginPath(); ctx.moveTo(x - tile.width * .34, y); ctx.lineTo(x - tile.width * .34, y - tile.height * 1.15); ctx.lineTo(x, y - tile.height * 1.55); ctx.lineTo(x + tile.width * .34, y - tile.height * 1.15); ctx.lineTo(x + tile.width * .34, y); ctx.closePath(); ctx.fill();
      ctx.fillStyle = "#d1ddbd"; ctx.fillRect(x - tile.width * .08, y - tile.height * .92, tile.width * .16, tile.height * .23);
    } else if (building.id === "solar") {
      for (let i = 0; i < 3; i += 1) { const px = x - tile.width * .42 + i * tile.width * .3; ctx.fillStyle = "#779da0"; ctx.beginPath(); ctx.moveTo(px, y); ctx.lineTo(px + tile.width * .23, y - tile.height * .35); ctx.lineTo(px + tile.width * .23, y - tile.height * .12); ctx.lineTo(px, y + tile.height * .2); ctx.closePath(); ctx.fill(); }
    } else if (building.id === "greenhouse") {
      ctx.fillStyle = "#739b7a"; ctx.beginPath(); ctx.moveTo(x - tile.width * .4, y); ctx.lineTo(x - tile.width * .4, y - tile.height * .55); ctx.lineTo(x, y - tile.height * .85); ctx.lineTo(x + tile.width * .4, y - tile.height * .55); ctx.lineTo(x + tile.width * .4, y); ctx.closePath(); ctx.fill(); ctx.strokeStyle = "#c5ddad"; ctx.stroke();
    } else if (building.id === "recycler") {
      ctx.fillStyle = "#72979a"; ctx.fillRect(x - tile.width * .2, y - tile.height * .75, tile.width * .4, tile.height * .7); ctx.strokeStyle = "#c5ded0"; ctx.strokeRect(x - tile.width * .2, y - tile.height * .75, tile.width * .4, tile.height * .7);
    } else {
      ctx.strokeStyle = "#c9d0b2"; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y - tile.height); ctx.stroke(); ctx.beginPath(); ctx.ellipse(x, y - tile.height * .94, tile.width * .13, tile.height * .18, -.4, 0, Math.PI * 2); ctx.stroke();
    }
    if (state.upgrades[building.id] > 0) { ctx.fillStyle = "#c8f169"; ctx.font = "8px 'DM Mono', monospace"; ctx.textAlign = "center"; ctx.fillText(`+${state.upgrades[building.id]}`, x + tile.width * .3, y - tile.height * .8); }
  }
}
function drawNodes(tile) {
  for (const node of state.nodes) {
    const { x, y } = tilePoint(node.col, node.row), item = nodeTypes[node.type];
    ctx.fillStyle = node.type === "ice" ? "#90c8d1" : node.type === "seeds" ? "#c8f169" : "#f0a36b";
    ctx.beginPath(); ctx.moveTo(x, y - tile.height * .45); ctx.lineTo(x + tile.width * .16, y); ctx.lineTo(x, y + tile.height * .35); ctx.lineTo(x - tile.width * .16, y); ctx.closePath(); ctx.fill();
    ctx.fillStyle = "#152019"; ctx.font = "9px 'DM Mono', monospace"; ctx.textAlign = "center"; ctx.fillText(item.icon, x, y + 3);
  }
}
function drawCrew(tile) {
  let col = state.player.col, row = state.player.row;
  if (state.animation) {
    const progress = Math.min(1, (performance.now() - state.animation.start) / state.animation.duration);
    col = state.animation.from.col + (state.animation.to.col - state.animation.from.col) * progress;
    row = state.animation.from.row + (state.animation.to.row - state.animation.from.row) * progress;
  }
  const { x, y } = tilePoint(col, row), explorer = crew[state.selectedCrew];
  const bob = state.animation ? Math.sin(performance.now() / 50) * 2 : 0;
  ctx.fillStyle = "#0c120d88"; ctx.beginPath(); ctx.ellipse(x, y + 2, tile.width * .16, tile.height * .15, 0, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = explorer.color; ctx.fillRect(x - 5, y - 15 + bob, 10, 14);
  ctx.fillStyle = "#e0e5d7"; ctx.beginPath(); ctx.arc(x, y - 19 + bob, 6, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = "#74928e"; ctx.fillRect(x - 4, y - 20 + bob, 8, 4);
  ctx.fillStyle = "#e9f1dc"; ctx.font = "7px 'DM Mono', monospace"; ctx.textAlign = "center"; ctx.fillText(explorer.name[state.language].split(" ")[0].toUpperCase(), x, y - 28 + bob);
}
function drawSoon() { requestAnimationFrame(drawMap); }
function animateTo(col, row) {
  const nextCol = Math.max(0, Math.min(9, col)), nextRow = Math.max(0, Math.min(7, row));
  if (state.moveTimer) clearInterval(state.moveTimer);
  state.moveTimer = null;
  state.animation = null;
  state.destination = null;
  state.player = { col: nextCol, row: nextRow };
  drawMap();
  updateTarget();
}
function moveBy(direction) {
  if (state.ended) return;
  const moves = { up: [0, -1], down: [0, 1], left: [-1, 0], right: [1, 0] };
  state.animation = null;
  const [dc, dr] = moves[direction];
  const col = Math.max(0, Math.min(9, state.player.col + dc));
  const row = Math.max(0, Math.min(7, state.player.row + dr));
  if (state.moveTimer) clearInterval(state.moveTimer);
  state.moveTimer = null; state.destination = null;
  state.player = { col, row };
  drawMap(); updateTarget();
}
function cellAt(event) {
  const bounds = rect(), tile = tileSize(), x = event.clientX - bounds.left, y = event.clientY - bounds.top;
  const col = Math.round((x - tile.originX) / tile.width + (y - tile.originY - tile.height / 2) / tile.height);
  const row = Math.round((y - tile.originY - tile.height / 2) / tile.height - (x - tile.originX) / tile.width);
  return { col: Math.max(0, Math.min(9, col)), row: Math.max(0, Math.min(7, row)), x, y, tile };
}
function neighborSpot(object) {
  const candidates = [[object.col - 1, object.row], [object.col, object.row - 1], [object.col + 1, object.row], [object.col, object.row + 1]].filter(([col, row]) => col >= 0 && col <= 9 && row >= 0 && row <= 7);
  return candidates[0] || { col: object.col, row: object.row };
}
function chooseTarget(target) {
  state.target = target;
  const distance = Math.abs(state.player.col - target.col) + Math.abs(state.player.row - target.row);
  if (distance > 1) { const spot = neighborSpot(target); animateTo(spot[0] ?? spot.col, spot[1] ?? spot.row); }
  updateTarget(); drawSoon();
}
function onMapClick(event) {
  const point = cellAt(event), worldPoint = tilePoint(point.col, point.row), tolerance = point.tile.width * .48;
  const building = buildings.find(item => { const p = tilePoint(item.col, item.row); return Math.hypot(p.x - point.x, p.y - point.y) < tolerance; });
  const node = state.nodes.find(item => { const p = tilePoint(item.col, item.row); return Math.hypot(p.x - point.x, p.y - point.y) < tolerance; });
  const target = node ? { kind: "node", ...node } : building ? { kind: "building", ...building } : null;
  if (target) { chooseTarget(target); return; }
  state.target = null; updateTarget(); animateTo(point.col, point.row); setMessage(tFor("moved", "pt"), tFor("moved", "en"));
}
function isNear(target) { return Math.abs(state.player.col - target.col) + Math.abs(state.player.row - target.row) <= 1; }
function updateCrew() {
  const explorer = crew[state.selectedCrew];
  document.querySelector("#active-portrait").textContent = explorer.name[state.language].slice(0, 1);
  document.querySelector("#active-portrait").style.background = explorer.color;
  document.querySelector("#active-crew-name").textContent = explorer.name[state.language];
  document.querySelector("#active-crew-skill").textContent = `${explorer.role[state.language]} · ${t(explorer.skill)}`;
  document.querySelector("#active-crew-mark").textContent = explorer.mark;
  const picker = document.querySelector("#crew-picker");
  picker.replaceChildren();
  crew.forEach((member, index) => {
    const button = document.createElement("button"); button.type = "button"; button.className = `crew-chip${index === state.selectedCrew ? " is-active" : ""}`; button.setAttribute("aria-pressed", String(index === state.selectedCrew)); button.title = `${member.name[state.language]} · ${t(member.skill)}`;
    button.innerHTML = `<span class="crew-chip-face" style="--crew-color:${member.color}">${member.name[state.language].slice(0, 1)}</span><span>${member.name[state.language].split(" ")[0]}</span>`;
    button.addEventListener("click", () => { state.selectedCrew = index; updateCrew(); drawSoon(); }); picker.append(button);
  });
}
function itemCost(building) {
  const level = state.upgrades[building.id], base = costs[building.id] || {};
  const factor = level + 1, result = {};
  for (const [item, amount] of Object.entries(base)) {
    let count = amount * factor;
    if (item === "scrap" && crew[state.selectedCrew].skill === "repair") count = Math.max(0, count - 1);
    result[item] = count;
  }
  return result;
}
function canAfford(cost) { return Object.entries(cost).every(([item, amount]) => state.inventory[item] >= amount); }
function updateTarget() {
  const title = document.querySelector("#target-title"), description = document.querySelector("#target-description"), button = document.querySelector("#interact-button"), label = document.querySelector("#interact-label");
  if (!state.target) {
    title.textContent = t("selectSpot"); description.textContent = t("exploreHint"); label.textContent = t("interaction").toUpperCase(); button.disabled = true;
    document.querySelector("#inspection-title").textContent = t("baseTitle");
    document.querySelector("#inspection-description").textContent = t("baseDesc");
    document.querySelector("#inspection-coords").textContent = t("outpostCoords");
    drawSoon(); return;
  }
  const target = state.target, near = isNear(target); let action = t("moveCloser"), enabled = false;
  if (target.kind === "node") {
    title.textContent = t(nodeTypes[target.type].name); description.textContent = near ? t(nodeTypes[target.type].desc) : t("needsNear");
    action = t("collect"); enabled = near && state.nodes.some(node => node.id === target.id);
    if (!enabled && near) description.textContent = t("targetEmpty");
    document.querySelector("#inspection-title").textContent = t(nodeTypes[target.type].name);
    document.querySelector("#inspection-description").textContent = t(nodeTypes[target.type].desc);
    document.querySelector("#inspection-coords").textContent = `${t("supplies")} · ${String(target.id).padStart(2, "0")}`;
  } else {
    const level = state.upgrades[target.id], cost = itemCost(target), maxed = level >= 2;
    title.textContent = t(target.key);
    description.textContent = maxed ? `${t("level")} ${level} · ${t("maxUpgrade")}` : `${t(target.desc)} ${t(target.upgrade)} · ${t("level")} ${level} → ${level + 1} · ${t("costLine")}: ${formatCost(cost)}`;
    action = maxed ? t("visit") : t("upgrade"); enabled = near && (maxed || canAfford(cost));
    if (!near) description.textContent = t("needsNear"); else if (!maxed && !canAfford(cost)) description.textContent += ` · ${t("missing")}`;
    document.querySelector("#inspection-title").textContent = t(target.key);
    document.querySelector("#inspection-description").textContent = t(target.desc);
    document.querySelector("#inspection-coords").textContent = `${t("module")} ${String(buildings.findIndex(item => item.id === target.id) + 1).padStart(2, "0")} · ${t("sector")} A`;
  }
  label.textContent = action; button.disabled = !enabled || state.ended; drawSoon();
}
function formatCost(cost) { return Object.entries(cost).filter(([, amount]) => amount > 0).map(([item, amount]) => `${amount} ${t(item)}`).join(" + ") || "0"; }
function interact() {
  if (!state.target || !isNear(state.target)) { if (state.target) { const spot = neighborSpot(state.target); animateTo(spot[0] ?? spot.col, spot[1] ?? spot.row); } return; }
  const target = state.target;
  if (target.kind === "node") collectNode(target); else upgradeBuilding(target);
}
function collectNode(target) {
  const index = state.nodes.findIndex(node => node.id === target.id);
  if (index < 0) { setMessage(tFor("empty", "pt"), tFor("empty", "en")); updateTarget(); return; }
  const node = state.nodes[index]; state.nodes.splice(index, 1);
  state.inventory[node.type] += 1;
  let message = `${t(nodeTypes[node.type].name)} ${t("collected").toLowerCase()}.`;
  let englishMessage = `${tFor(nodeTypes[node.type].name, "en")} collected.`;
  if (crew[state.selectedCrew].skill === "geologist" && node.type === "scrap") { state.inventory.scrap += 1; message += ` ${t("skillBonus")}: +1 ${t("scrap")}.`; englishMessage += ` Skill bonus: +1 ${tFor("scrap", "en")}.`; }
  if (crew[state.selectedCrew].skill === "botanist" && node.type === "seeds") { state.inventory.seeds += 1; state.resources.food = clamp(state.resources.food + 4); message += ` ${t("skillBonus")}: +1 ${t("seeds")}.`; englishMessage += ` Skill bonus: +1 ${tFor("seeds", "en")}.`; }
  if (crew[state.selectedCrew].skill === "medic" && node.type === "ice") { state.resources.oxygen = clamp(state.resources.oxygen + 5); message += ` ${t("skillBonus")}: +5 O₂.`; englishMessage += " Skill bonus: +5 O₂."; }
  if (state.upgrades.antenna > 0 && Math.random() < .5) { state.inventory[node.type] += 1; message += " +1"; }
  state.target = null; setMessage(message, englishMessage); updateUI();
}
function upgradeBuilding(building) {
  const level = state.upgrades[building.id];
  if (level >= 2) { setMessage(tFor("maxUpgrade", "pt"), tFor("maxUpgrade", "en")); return; }
  const cost = itemCost(building);
  if (!canAfford(cost)) { setMessage(tFor("missing", "pt"), tFor("missing", "en")); updateTarget(); return; }
  for (const [item, amount] of Object.entries(cost)) state.inventory[item] -= amount;
  state.upgrades[building.id] += 1;
  if (building.id === "habitat") state.resources.shield = clamp(state.resources.shield + 12);
  if (building.id === "solar") state.resources.energy = clamp(state.resources.energy + 15);
  if (building.id === "greenhouse") state.resources.food = clamp(state.resources.food + 12);
  if (building.id === "recycler") state.resources.water = clamp(state.resources.water + 12);
  state.target = null; setMessage(`${t(building.key)} · ${t("upgraded")}!`, `${tFor(building.key, "en")} upgraded!`); updateUI();
}
function updateUI() {
  document.querySelector("#sol-value").textContent = String(state.sol).padStart(2, "0");
  for (const key of ["oxygen", "water", "food", "energy", "shield"]) {
    const value = clamp(state.resources[key]); document.querySelector(`#${key}-value`).textContent = `${value}%`; document.querySelector(`#${key}-meter`).style.width = `${value}%`; document.querySelector(`[data-resource="${key}"]`).classList.toggle("is-low", value < 25);
  }
  for (const item of ["scrap", "ice", "seeds"]) document.querySelector(`#${item === "seeds" ? "seed" : item}-count`).textContent = state.inventory[item];
  document.querySelector("#location-label").textContent = t(state.world === "moon" ? "moonName" : "marsName");
  document.querySelector("#map-weather").textContent = t(state.world === "moon" ? "moonWeather" : "marsWeather");
  updateTarget(); drawSoon();
}
function changeWorld(world) {
  state.world = world; document.body.dataset.world = world;
  document.querySelectorAll("[data-world]").forEach(button => { const active = button.dataset.world === world; button.classList.toggle("is-active", active); button.setAttribute("aria-pressed", String(active)); });
  applyLanguage();
  const messageKey = world === "moon" ? "moonChanged" : "marsChanged";
  setMessage(tFor(messageKey, "pt"), tFor(messageKey, "en"));
}
function finishSol() {
  if (state.ended) return;
  state.sol += 1;
  state.resources.oxygen = clamp(state.resources.oxygen - 2);
  state.resources.water = clamp(state.resources.water - 2 + state.upgrades.recycler * 2);
  state.resources.food = clamp(state.resources.food - 2 + state.upgrades.greenhouse * 2);
  state.resources.energy = clamp(state.resources.energy - 1 + state.upgrades.solar * 2);
  state.resources.shield = clamp(state.resources.shield - (state.world === "mars" ? 1 : 0));
  state.nodes = structuredClone(initialNodes);
  if ([state.resources.oxygen, state.resources.water, state.resources.food].some(value => value <= 0)) { showOutcome(false); return; }
  if (state.sol >= 12) { showOutcome(true); return; }
  setMessage(tFor("solStarted", "pt"), tFor("solStarted", "en")); updateUI();
}
function showOutcome(success) {
  state.ended = true;
  document.querySelector("#outcome-stamp").textContent = t(success ? "complete" : "failed");
  document.querySelector("#outcome-title").textContent = t(success ? "successTitle" : "failTitle");
  document.querySelector("#outcome-copy").textContent = t(success ? "successCopy" : "failCopy");
  document.querySelector("#outcome-dialog .eyebrow").textContent = t("report");
  document.querySelector("#outcome-stats").innerHTML = `<div class="outcome-stat"><strong>${Math.max(0, state.sol - (success ? 0 : 1))}</strong><span>${t("survived")}</span></div><div class="outcome-stat"><strong>4/4</strong><span>${t("crew")}</span></div><div class="outcome-stat"><strong>${Math.round((state.resources.oxygen + state.resources.water + state.resources.food + state.resources.shield) / 4)}%</strong><span>${t("resilience")}</span></div>`;
  document.querySelector("#restart-button span:first-child").textContent = t("restart");
  document.querySelector("#outcome-dialog").showModal();
}

document.querySelectorAll("[data-language]").forEach(button => button.addEventListener("click", () => changeLanguage(button.dataset.language)));
document.querySelectorAll("[data-world]").forEach(button => button.addEventListener("click", () => changeWorld(button.dataset.world)));
document.querySelector("#launch-button").addEventListener("click", () => {
  document.querySelector("#intro-screen").hidden = true;
  document.querySelector("#game-app").hidden = false;
  updateUI();
  drawMap();
  canvas.focus({ preventScroll: true });
});
document.querySelector("#interact-button").addEventListener("click", interact);
document.querySelector("#advance-button").addEventListener("click", finishSol);
document.querySelector("#restart-button").addEventListener("click", () => window.location.reload());
canvas.addEventListener("click", onMapClick);
window.addEventListener("resize", drawSoon);
document.addEventListener("keydown", event => {
  if (event.target instanceof HTMLButtonElement) return;
  const key = event.key.toLowerCase(), directions = { arrowup: "up", w: "up", arrowdown: "down", s: "down", arrowleft: "left", a: "left", arrowright: "right", d: "right" };
  if (directions[key]) { event.preventDefault(); moveBy(directions[key]); }
  if (key === "e" || key === "enter") interact();
});
document.querySelectorAll("[data-move]").forEach(button => button.addEventListener("click", () => moveBy(button.dataset.move)));
document.querySelector("#restart-button").addEventListener("click", () => window.location.reload());
applyLanguage();
setMessage(tFor("welcome", "pt"), tFor("welcome", "en"));