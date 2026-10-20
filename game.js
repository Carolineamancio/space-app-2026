const canvas = document.querySelector("#outpost-map");
const context = canvas.getContext("2d");
const ui = {
  sol: document.querySelector("#sol-value"),
  message: document.querySelector("#event-message"),
  generation: document.querySelector("#generation-value"),
  demand: document.querySelector("#demand-value"),
  feedback: document.querySelector("#allocation-feedback"),
  dialog: document.querySelector("#event-dialog"),
  outcome: document.querySelector("#outcome-dialog"),
  map: canvas
};

const systemNames = { life: "Suporte de vida", water: "Reciclo de água", food: "Estufa", shield: "Blindagem", habitat: "Habitat" };
const structureInfo = [
  { key: "habitat", title: "HABITAT PRINCIPAL", description: "Abrigo pressurizado. É aqui que a tripulação dorme e respira.", coords: "MÓDULO 01 · SETOR A", col: 3, row: 2 },
  { key: "solar", title: "CAMPO SOLAR", description: "Painéis fotovoltaicos transformam luz em energia para toda a base.", coords: "MÓDULO 02 · SETOR B", col: 6, row: 1 },
  { key: "greenhouse", title: "ESTUFA HIDROPÔNICA", description: "Plantas produzem alimento e ajudam a renovar o ar do habitat.", coords: "MÓDULO 03 · SETOR C", col: 5, row: 4 },
  { key: "water", title: "RECICLAGEM DE ÁGUA", description: "Cada gota recuperada reduz a carga enviada da Terra.", coords: "MÓDULO 04 · SETOR B", col: 1, row: 3 },
  { key: "antenna", title: "ANTENA DE COMUNICAÇÃO", description: "Mantém contato com o controle de missão a milhões de quilômetros.", coords: "MÓDULO 05 · SETOR A", col: 7, row: 3 }
];
const initialResources = { oxygen: 82, water: 74, food: 68, energy: 76, shield: 64, morale: 78, crew: 4, parts: 3 };
const state = {
  world: "moon",
  sol: 1,
  resources: { ...initialResources },
  allocation: { life: 2, water: 2, food: 2, shield: 1, habitat: 1 },
  generation: 18,
  solarPenalty: 0,
  events: 0,
  history: [],
  selected: "habitat",
  ended: false
};

function clamp(value) { return Math.max(0, Math.min(100, Math.round(value))); }
function demand() { return Object.values(state.allocation).reduce((sum, level) => sum + level, 0) * 3; }
function setMessage(message) { ui.message.textContent = message; }
function drawMap() {
  const rect = canvas.getBoundingClientRect();
  if (!rect.width || !rect.height) return;
  const scale = window.devicePixelRatio || 1;
  canvas.width = Math.round(rect.width * scale);
  canvas.height = Math.round(rect.height * scale);
  context.setTransform(scale, 0, 0, scale, 0, 0);
  const width = rect.width;
  const height = rect.height;
  context.clearRect(0, 0, width, height);
  const mars = state.world === "mars";
  const sky = context.createLinearGradient(0, 0, 0, height);
  sky.addColorStop(0, mars ? "#50342d" : "#273936");
  sky.addColorStop(1, mars ? "#6c4535" : "#45564b");
  context.fillStyle = sky;
  context.fillRect(0, 0, width, height);
  for (let i = 0; i < 58; i += 1) {
    const x = ((i * 127 + 39) % 997) / 997 * width;
    const y = ((i * 71 + 17) % 541) / 541 * height * .58;
    context.fillStyle = i % 7 === 0 ? "#e5dba76b" : "#d3d7cb45";
    context.fillRect(x, y, i % 5 === 0 ? 2 : 1, i % 5 === 0 ? 2 : 1);
  }
  context.fillStyle = mars ? "#af795d" : "#829081";
  context.beginPath();
  context.ellipse(width * .74, height * .17, width * .075, width * .075, 0, 0, Math.PI * 2);
  context.fill();
  context.fillStyle = mars ? "#d8916d55" : "#d9d8bc45";
  context.beginPath();
  context.ellipse(width * .74 - 6, height * .15, width * .074, width * .074, 0, 0, Math.PI * 2);
  context.fill();

  const tileW = Math.min(width / 9.8, height / 5.4);
  const tileH = tileW * .48;
  const originX = width * .49;
  const originY = height * .23;
  const tileColors = mars ? ["#b87655", "#a8674d", "#c27d59", "#995b47"] : ["#8c9981", "#7c8974", "#9aa18b", "#717f70"];
  function point(col, row) { return { x: originX + (col - row) * tileW / 2, y: originY + (col + row) * tileH / 2 }; }
  for (let row = 0; row < 6; row += 1) {
    for (let col = 0; col < 8; col += 1) {
      const p = point(col, row);
      const selected = structureInfo.some(item => item.key === state.selected && item.col === col && item.row === row);
      context.beginPath();
      context.moveTo(p.x, p.y);
      context.lineTo(p.x + tileW / 2, p.y + tileH / 2);
      context.lineTo(p.x, p.y + tileH);
      context.lineTo(p.x - tileW / 2, p.y + tileH / 2);
      context.closePath();
      context.fillStyle = selected ? (mars ? "#d88c66" : "#aab090") : tileColors[(col * 3 + row * 5) % tileColors.length];
      context.fill();
      context.strokeStyle = mars ? "#dc9b7550" : "#c5c9aa3b";
      context.lineWidth = 1;
      context.stroke();
      const seed = (col * 11 + row * 17) % 9;
      if (seed === 1 || seed === 5) {
        context.fillStyle = mars ? "#754b3a" : "#536454";
        context.beginPath();
        context.ellipse(p.x + (seed - 3) * 2, p.y + tileH * .5, tileW * .06, tileH * .1, .3, 0, Math.PI * 2);
        context.fill();
      }
    }
  }

  const dimensions = { habitat: [1.05, 1.15], solar: [1.55, .13], greenhouse: [.9, .74], water: [.75, .67], antenna: [.22, 1.3] };
  function tileCenter(col, row) { const p = point(col, row); return { x: p.x, y: p.y + tileH / 2 }; }
  function buildingBase(info) {
    const { x, y } = tileCenter(info.col, info.row);
    const [sx, sy] = dimensions[info.key];
    const bw = tileW * sx;
    const bh = tileH * sy;
    context.beginPath();
    context.moveTo(x, y - bh * .15);
    context.lineTo(x + bw / 2, y - bh * .15 + bh * .38);
    context.lineTo(x, y + bh * .23);
    context.lineTo(x - bw / 2, y - bh * .15 + bh * .38);
    context.closePath();
    context.fillStyle = "#28312a";
    context.fill();
    context.strokeStyle = "#d4d5ae";
    context.globalAlpha = info.key === state.selected ? 1 : .65;
    context.stroke();
    context.globalAlpha = 1;
    return { x, y: y - bh * .15, bw, bh };
  }
  const ordered = [...structureInfo].sort((a, b) => a.col + a.row - (b.col + b.row));
  for (const info of ordered) {
    const { x, y, bw, bh } = buildingBase(info);
    if (info.key === "habitat") {
      context.fillStyle = "#96a59a";
      context.beginPath();
      context.moveTo(x - bw * .34, y);
      context.lineTo(x - bw * .34, y - bh * .72);
      context.lineTo(x, y - bh);
      context.lineTo(x + bw * .34, y - bh * .72);
      context.lineTo(x + bw * .34, y);
      context.closePath(); context.fill();
      context.fillStyle = "#d1ddbd"; context.fillRect(x - bw * .09, y - bh * .62, bw * .18, bh * .24);
      context.fillStyle = "#687d73"; context.fillRect(x - bw * .25, y - bh * .52, bw * .13, bh * .14);
      context.fillStyle = "#63756e"; context.fillRect(x + bw * .12, y - bh * .52, bw * .13, bh * .14);
      context.fillStyle = "#c8f169"; context.fillRect(x - bw * .45, y + bh * .1, bw * .9, 2);
    } else if (info.key === "solar") {
      for (let index = 0; index < 3; index += 1) {
        const px = x - bw * .46 + index * bw * .3;
        context.fillStyle = "#779da0";
        context.beginPath(); context.moveTo(px, y - bh * .15); context.lineTo(px + bw * .24, y - bh * .37); context.lineTo(px + bw * .24, y - bh * .17); context.lineTo(px, y + bh * .03); context.closePath(); context.fill();
        context.strokeStyle = "#b6d3cb"; context.lineWidth = 1; context.stroke();
      }
    } else if (info.key === "greenhouse") {
      context.fillStyle = "#739b7a";
      context.beginPath(); context.moveTo(x - bw * .4, y); context.lineTo(x - bw * .4, y - bh * .55); context.lineTo(x, y - bh * .8); context.lineTo(x + bw * .4, y - bh * .55); context.lineTo(x + bw * .4, y); context.closePath(); context.fill();
      context.strokeStyle = "#c5ddad"; context.stroke();
      context.strokeStyle = "#d5e5b5"; context.beginPath(); context.moveTo(x, y - bh * .79); context.lineTo(x, y - 1); context.moveTo(x - bw * .35, y - bh * .46); context.lineTo(x + bw * .35, y - bh * .46); context.stroke();
      for (let index = 0; index < 3; index += 1) { context.fillStyle = "#b8d27d"; context.fillRect(x - bw * .25 + index * bw * .22, y - bh * .3, 3, bh * .12); }
    } else if (info.key === "water") {
      context.fillStyle = "#72979a"; context.fillRect(x - bw * .26, y - bh * .75, bw * .52, bh * .72);
      context.fillStyle = "#a2c8c4"; context.fillRect(x - bw * .18, y - bh * .63, bw * .36, bh * .16);
      context.strokeStyle = "#c5ded0"; context.strokeRect(x - bw * .26, y - bh * .75, bw * .52, bh * .72);
    } else {
      context.strokeStyle = "#c9d0b2"; context.lineWidth = 2; context.beginPath(); context.moveTo(x, y); context.lineTo(x, y - bh); context.stroke();
      context.beginPath(); context.ellipse(x, y - bh * .94, bw * .35, bh * .18, -.4, 0, Math.PI * 2); context.stroke();
      context.fillStyle = "#d5e0bb"; context.fillRect(x - 1, y - bh * .9, 2, 3);
    }
    const label = info.key === "habitat" ? "HAB" : info.key === "solar" ? "SOL" : info.key === "greenhouse" ? "BIO" : info.key === "water" ? "H₂O" : "COM";
    context.font = "7px 'DM Mono', monospace";
    context.textAlign = "center";
    context.fillStyle = info.key === state.selected ? "#e2f2b9" : "#e0e2d5";
    context.fillText(label, x, y + bh * .43 + 10);
  }
  context.fillStyle = mars ? "#d59070" : "#c5c9a6";
  for (let index = 0; index < 4; index += 1) {
    const x = width * (.13 + index * .22);
    const y = height * (.8 + (index % 2) * .04);
    context.beginPath(); context.moveTo(x - 8, y + 5); context.lineTo(x - 3, y - 5); context.lineTo(x + 5, y - 7); context.lineTo(x + 10, y + 4); context.fill();
  }
  context.font = "8px 'DM Mono', monospace";
  context.textAlign = "left";
  context.fillStyle = "#eff1de";
  context.fillText("OUTPOST 04", 14, height - 16);
}

function drawMapSoon() { window.requestAnimationFrame(drawMap); }
function resizeMap() { drawMapSoon(); }
function updateUI() {
  ui.sol.textContent = String(state.sol).padStart(2, "0");
  for (const key of ["oxygen", "water", "food", "energy", "shield"]) {
    const value = clamp(state.resources[key]);
    document.querySelector(`#${key}-value`).textContent = `${value}%`;
    document.querySelector(`#${key}-meter`).style.width = `${value}%`;
    document.querySelector(`[data-resource="${key}"]`).classList.toggle("is-low", value < 30);
  }
  document.querySelector("#crew-value").textContent = String(state.resources.crew).padStart(2, "0");
  for (const [key, level] of Object.entries(state.allocation)) {
    document.querySelector(`#level-${key}`).textContent = level;
    document.querySelectorAll(`[data-adjust="${key}"]`).forEach(button => {
      button.disabled = state.ended || (button.dataset.delta === "-1" && level <= 0) || (button.dataset.delta === "1" && level >= 3);
    });
  }
  ui.generation.innerHTML = `${Math.max(0, state.generation - state.solarPenalty)} <small>kWh</small>`;
  ui.demand.innerHTML = `${demand()} <small>kWh</small>`;
  const net = state.generation - state.solarPenalty - demand();
  ui.feedback.className = "allocation-feedback";
  if (net < -6) { ui.feedback.textContent = "Demanda alta. A bateria vai descarregar rapidamente."; ui.feedback.classList.add("is-danger"); }
  else if (net < 0) { ui.feedback.textContent = "A bateria complementará a geração neste sol."; ui.feedback.classList.add("is-warning"); }
  else { ui.feedback.textContent = "Reserva saudável. Você tem energia para investir."; }
  document.querySelector("#location-label").textContent = state.world === "moon" ? "CRATERA SHACKLETON" : "PLANÍCIE DE UTOPIA";
  document.querySelector("#map-weather").textContent = state.world === "moon" ? "CÉU LIMPO · −42 °C" : "VENTOS LEVES · −18 °C";
  const structure = structureInfo.find(item => item.key === state.selected);
  document.querySelector("#inspection-title").textContent = structure.title;
  document.querySelector("#inspection-description").textContent = structure.description;
  document.querySelector("#inspection-coords").textContent = structure.coords;
  drawMapSoon();
}

function changeWorld(world) {
  if (state.world === world) return;
  state.world = world;
  state.generation = world === "moon" ? 18 : 15;
  document.body.dataset.world = world;
  document.querySelectorAll(".destination-button").forEach(button => {
    const active = button.dataset.world === world;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });
  setMessage(world === "moon" ? "Destino atualizado. A luz solar constante favorece a geração, mas as noites lunares exigem planejamento." : "Destino atualizado. A poeira marciana reduz a eficiência dos painéis. Reserve energia para tempestades.");
  updateUI();
}

function showInspection(item) {
  state.selected = item.key;
  updateUI();
}
function mapPoint(event) {
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  const width = rect.width;
  const height = rect.height;
  const tileW = Math.min(width / 9.8, height / 5.4);
  const tileH = tileW * .48;
  const originX = width * .49;
  const originY = height * .23;
  const col = Math.round((x - originX) / tileW + (y - originY - tileH / 2) / tileH);
  const row = Math.round((y - originY - tileH / 2) / tileH - (x - originX) / tileW);
  return structureInfo.find(item => item.col === col && item.row === row);
}

function adjustAllocation(system, delta) {
  const next = state.allocation[system] + delta;
  if (state.ended || next < 0 || next > 3) return;
  state.allocation[system] = next;
  updateUI();
  setMessage(`${systemNames[system]} agora recebe ${next} nível(is) de energia. Cada nível exige 3 kWh por sol.`);
}

const eventDeck = [
  { icon: "☼", kicker: "RADIAÇÃO <span>·</span> ALERTA", title: "Tempestade solar a caminho", copy: "Uma ejeção de partículas se aproxima. A blindagem protege a equipe, mas reforçá-la consome energia reservada para outros sistemas.", choices: [{ label: "Reforçar escudos", cost: "−12 kWh · proteção +16%", action: () => { state.resources.energy -= 12; state.resources.shield += 16; return "Escudos reforçados. A equipe observa a tempestade em segurança."; } }, { label: "Abrigar a equipe e economizar", cost: "−8% moral · sem custo de energia", action: () => { state.resources.morale -= 8; state.resources.shield -= 3; return "A equipe se abrigou. O confinamento prolongado pesa no moral."; } }], requires: "shield" },
  { icon: "⌁", kicker: "SISTEMAS <span>·</span> MANUTENÇÃO", title: "Filtro de água obstruído", copy: "Uma camada de poeira bloqueia o filtro. É possível repará-lo agora ou operar com menor eficiência até o próximo sol.", choices: [{ label: "Usar peças para reparar", cost: "−1 peça · água +14%", action: () => { state.resources.parts -= 1; state.resources.water += 14; return "Filtro limpo. A água recuperada volta aos reservatórios."; }, needsPart: true }, { label: "Reduzir o consumo de água", cost: "−8% moral · água −5%", action: () => { state.resources.morale -= 8; state.resources.water -= 5; return "A equipe economiza água. O racionamento não é sustentável por muito tempo."; } }], requires: "water" },
  { icon: "ϟ", kicker: "ENERGIA <span>·</span> INCIDENTE", title: "Poeira sobre os painéis", copy: "Uma frente de poeira cobre os painéis solares. Os robôs podem limpá-los, mas exigem peças de reposição.", choices: [{ label: "Despachar robô de manutenção", cost: "−1 peça · geração normal", action: () => { state.resources.parts -= 1; state.solarPenalty = 0; return "Painéis limpos. A geração solar foi recuperada."; }, needsPart: true }, { label: "Operar com geração reduzida", cost: "−6 kWh de geração", action: () => { state.solarPenalty = 6; return "Painéis parcialmente cobertos. Reduza a demanda para preservar a bateria."; } }], requires: "energy" },
  { icon: "✳", kicker: "ESTUFA <span>·</span> DESCOBERTA", title: "Colheita antecipada", copy: "A estufa produziu mais rápido do que o previsto. Uma colheita parcial agora alimenta a equipe ou pode virar composto para o próximo ciclo.", choices: [{ label: "Servir alimento fresco", cost: "alimentos +16% · moral +5%", action: () => { state.resources.food += 16; state.resources.morale += 5; return "A colheita foi servida. A equipe ganha ânimo e nutrientes."; } }, { label: "Guardar sementes e composto", cost: "+1 peça · sem aumento de alimentos", action: () => { state.resources.parts += 1; return "O composto fortalece o próximo plantio. Uma peça foi recuperada."; } }], requires: "food" }
];

function showEvent(event) {
  document.querySelector("#event-icon").textContent = event.icon;
  document.querySelector("#event-kicker").innerHTML = event.kicker;
  document.querySelector("#dialog-title").textContent = event.title;
  document.querySelector("#dialog-copy").textContent = event.copy;
  document.querySelector("#event-sol").textContent = String(state.sol).padStart(2, "0");
  const choiceList = document.querySelector("#choice-list");
  choiceList.replaceChildren();
  event.choices.forEach((choice, index) => {
    const button = document.createElement("button");
    button.className = `choice-button${index === 1 ? " secondary" : ""}`;
    button.disabled = Boolean(choice.needsPart && state.resources.parts < 1);
    button.innerHTML = `<span>${choice.label}</span><span>${choice.needsPart && state.resources.parts < 1 ? "SEM PEÇAS" : choice.cost}</span>`;
    button.addEventListener("click", () => {
      const message = choice.action();
      state.resources.energy = clamp(state.resources.energy);
      state.resources.shield = clamp(state.resources.shield);
      state.resources.food = clamp(state.resources.food);
      state.resources.water = clamp(state.resources.water);
      state.resources.morale = clamp(state.resources.morale);
      setMessage(message);
      ui.dialog.close();
      updateUI();
      checkFailure();
    });
    choiceList.append(button);
  });
  ui.dialog.showModal();
}

function checkFailure() {
  if (state.resources.crew <= 0) { endMission(false, "A equipe precisou abandonar o posto. Recursos e proteção não foram suficientes para manter a missão."); return true; }
  if (["oxygen", "water", "food"].some(key => state.resources[key] <= 0)) { endMission(false, "Um recurso essencial se esgotou. No espaço, oxigênio, água e alimento não podem ser substituídos por improviso."); return true; }
  if (state.resources.energy <= 0 && demand() > 0) { endMission(false, "A bateria foi esgotada. Sem energia, os sistemas de suporte de vida deixaram de funcionar."); return true; }
  return false;
}

function endMission(success, copy) {
  state.ended = true;
  document.querySelector("#outcome-stamp").textContent = success ? "MISSÃO CONCLUÍDA" : "MISSÃO INTERROMPIDA";
  document.querySelector("#outcome-stamp").style.color = success ? "var(--lime)" : "var(--red)";
  document.querySelector("#outcome-title").textContent = success ? "12 sóis. Uma base viva." : "A missão chegou ao fim.";
  document.querySelector("#outcome-copy").textContent = copy;
  const survivedSols = success ? state.sol : Math.max(0, state.sol - 1);
  document.querySelector("#outcome-stats").innerHTML = `<div class="outcome-stat"><strong>${survivedSols}</strong><span>SÓIS SOBREVIVIDOS</span></div><div class="outcome-stat"><strong>${state.resources.crew}/4</strong><span>TRIPULANTES</span></div><div class="outcome-stat"><strong>${Math.round((state.resources.oxygen + state.resources.water + state.resources.food + state.resources.shield) / 4)}%</strong><span>ÍNDICE DE RESILIÊNCIA</span></div>`;
  document.querySelector("#advance-button").disabled = true;
  updateUI();
  ui.outcome.showModal();
}

function advanceSol() {
  if (state.ended) return;
  const allocation = state.allocation;
  const netPower = state.generation - state.solarPenalty - demand();
  state.resources.energy = clamp(state.resources.energy + netPower * .8);
  if (state.resources.energy <= 0) {
    state.resources.oxygen -= 12; state.resources.water -= 8; state.resources.food -= 4;
  } else {
    state.resources.oxygen += allocation.life >= 2 ? 2 : allocation.life === 1 ? -5 : -11;
    state.resources.water += allocation.water >= 2 ? 1 : allocation.water === 1 ? -4 : -9;
    state.resources.food += allocation.food >= 2 ? 2 : allocation.food === 1 ? -4 : -8;
  }
  state.resources.shield += allocation.shield >= 2 ? 2 : allocation.shield === 1 ? .2 : -1;
  state.resources.morale += allocation.habitat >= 2 ? 2 : allocation.habitat === 1 ? -1 : -4;
  if (allocation.shield < 2 && state.sol % 4 === 0) { state.resources.shield -= 8; state.resources.morale -= 7; }
  if (state.sol % 5 === 0) state.resources.parts += 1;
  for (const key of ["oxygen", "water", "food", "energy", "shield", "morale"]) state.resources[key] = clamp(state.resources[key]);
  const shortage = ["oxygen", "water", "food"].find(key => state.resources[key] < 30);
  if (shortage) state.resources.morale = clamp(state.resources.morale - 3);
  if (checkFailure()) return;
  if (state.sol >= 12) { endMission(true, "Você manteve sistemas interdependentes em equilíbrio durante 12 sóis. Cada escolha de energia e manutenção ajudou a sustentar a tripulação."); return; }
  state.sol += 1;
  state.solarPenalty = 0;
  if (state.sol === 4 || state.sol === 8 || state.sol === 11) {
    state.events += 1;
    showEvent(eventDeck[(state.events - 1) % eventDeck.length]);
    setMessage("Alerta de missão recebido. Escolha como a equipe vai responder.");
  } else {
    setMessage(`Sol ${String(state.sol).padStart(2, "0")} iniciado. Oxigênio, água e alimento foram consumidos. Ajuste a rede antes de avançar.`);
  }
  updateUI();
}

document.querySelectorAll("[data-world]").forEach(button => button.addEventListener("click", () => changeWorld(button.dataset.world)));
document.querySelectorAll("[data-adjust]").forEach(button => button.addEventListener("click", () => adjustAllocation(button.dataset.adjust, Number(button.dataset.delta))));
document.querySelector("#advance-button").addEventListener("click", advanceSol);
document.querySelector(".close-dialog").addEventListener("click", () => ui.dialog.close());
document.querySelector("#restart-button").addEventListener("click", () => window.location.reload());
canvas.addEventListener("click", event => { const item = mapPoint(event); if (item) showInspection(item); });
window.addEventListener("resize", resizeMap);
updateUI();