# Fontes e modelo / Sources and model

## Referências oficiais / Official references

Estas páginas servem de contexto científico para o projeto. Os valores do jogo não foram extraídos nem calibrados a partir delas.

These pages provide scientific context for the project. Game values were not extracted from or calibrated against them.

- [NASA Space Apps 2026: Build a Junior Astronaut Mission Trainer](https://www.spaceappschallenge.org/2026/challenges/build-a-junior-astronaut-mission-trainer/): público, cenário e objetivo do desafio.
- [NASA: Environmental Control and Life Support System (ECLSS)](https://www.nasa.gov/reference/environmental-control-and-life-support-system-eclss/): sistemas de suporte de vida e recuperação de recursos.
- [NASA: Space Radiation](https://www.nasa.gov/humans-in-space/radiation/): contexto dos riscos de radiação para exploração humana.
- [NASA: Vegetable Production System (Veggie)](https://www.nasa.gov/missions/station/iss-research/vegetable-production-system-veggie/): pesquisa de cultivo de plantas no ambiente espacial.

## Simplificações do jogo / Game simplifications

O simulador usa percentuais fictícios para tornar as escolhas visíveis e compreensíveis. Eles não representam consumos, limites médicos ou recomendações operacionais reais. O jogo não substitui planejamento de missão, análise de engenharia ou orientação da NASA.

The simulator uses fictional percentages to make trade-offs visible and understandable. They do not represent real consumption rates, medical limits, or operational recommendations. This game is not a substitute for mission planning, engineering analysis, or NASA guidance.

| Sistema / System | Regra lúdica / Game rule | Limite / Caveat |
| --- | --- | --- |
| Reservas / Reserves | Oxigênio, água, alimentos, energia e blindagem começam em 40%. / Oxygen, water, food, power, and shielding start at 40%. | Percentuais abstratos, sem unidades físicas. / Abstract percentages with no physical units. |
| Oxigênio / Oxygen | −3 pontos percentuais por sol; habitat aprimorado compensa 1 ponto. / −3 percentage points per sol; an upgraded habitat offsets 1 point. | Não modela pressão, mistura de gases ou metabolismo individual. / Does not model pressure, gas composition, or individual metabolism. |
| Água / Water | −3 por sol; cada nível do reciclador recupera 2. / −3 per sol; each recycler level restores 2. | Não modela vazão, qualidade, perdas ou armazenamento real. / Does not model flow, quality, losses, or real storage. |
| Alimentos / Food | −3 por sol; cada nível da estufa recupera 2. / −3 per sol; each greenhouse level restores 2. | Não modela calorias, nutrientes, espécies ou ciclos de cultivo. / Does not model calories, nutrients, species, or crop cycles. |
| Energia / Power | −2 por sol; painéis aprimorados recuperam 2 por nível. Passos EVA custam 1; clique para mover custa 0,4 por célula, arredondado para cima. / −2 per sol; upgraded solar panels restore 2 per level. EVA steps cost 1; click-to-move costs 0.4 per cell, rounded up. | Sem unidades de kWh, órbitas, eclipses, poeira ou dimensionamento real. / No kWh units, orbital conditions, eclipses, dust, or real sizing. |
| Radiação / Radiation | A blindagem perde pontos em ciclos simplificados; aprimorar o habitat reduz a perda. / Shielding drops on simplified cycles; habitat upgrades reduce the loss. | Não calcula dose, partículas, localização ou eficácia de materiais. / Does not calculate dose, particles, location, or material effectiveness. |
| Tarefas / Tasks | Coletas diárias alternam entre sucata, gelo e sementes; completar duas tarefas avança o sol. / Daily collections rotate among scrap, ice, and seeds; completing two tasks advances the sol. | Objetivo pedagógico do jogo, não protocolo de EVA. / A game-learning objective, not an EVA protocol. |

As regras estão implementadas em [`exploration.js`](exploration.js). Acessado em 17 nov. 2026. / Rules are implemented in [`exploration.js`](exploration.js). Accessed 17 Nov 2026.