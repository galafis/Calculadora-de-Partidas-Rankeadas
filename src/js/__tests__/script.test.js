/**
 * @jest-environment jsdom
 */

const { JSDOM } = require("jsdom");
const RankedMatchCalculator = require("../script.js"); // Import directly

describe("RankedMatchCalculator", () => {
  let calculator;
  let dom;

  beforeEach(() => {
    dom = new JSDOM(`
      <!DOCTYPE html>
      <html lang="pt-BR">
      <body>
        <div class="container">
          <h1>Calculadora de Partidas Rankeadas</h1>
          <form id="formRanked">
            <label for="vitorias">Vitórias:</label>
            <input type="number" id="vitorias" required />

            <label for="derrotas">Derrotas:</label>
            <input type="number" id="derrotas" required />

            <button type="submit">Calcular Nível</button>
          </form>
          <div id="resultado"></div>
        </div>
      </body>
      </html>
    `);
    global.document = dom.window.document;
    global.window = dom.window;

    // Instantiate the calculator with the JSDOM document
    calculator = new RankedMatchCalculator(dom.window.document);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should calculate Iron level for less than 10 victories", () => {
    expect(calculator.calculateRank(5, 2)).toBe("O Herói tem um saldo de 3 vitórias e está no nível Ferro.");
  });

  test("should calculate Bronze level for 10-20 victories", () => {
    expect(calculator.calculateRank(15, 5)).toBe("O Herói tem um saldo de 10 vitórias e está no nível Bronze.");
  });

  test("should calculate Silver level for 21-50 victories", () => {
    expect(calculator.calculateRank(30, 10)).toBe("O Herói tem um saldo de 20 vitórias e está no nível Prata.");
  });

  test("should calculate Gold level for 51-80 victories", () => {
    expect(calculator.calculateRank(60, 20)).toBe("O Herói tem um saldo de 40 vitórias e está no nível Ouro.");
  });

  test("should calculate Diamond level for 81-90 victories", () => {
    expect(calculator.calculateRank(85, 15)).toBe("O Herói tem um saldo de 70 vitórias e está no nível Diamante.");
  });

  test("should calculate Legendary level for 91-100 victories", () => {
    expect(calculator.calculateRank(95, 5)).toBe("O Herói tem um saldo de 90 vitórias e está no nível Lendário.");
  });

  test("should calculate Immortal level for more than 100 victories", () => {
    expect(calculator.calculateRank(110, 10)).toBe("O Herói tem um saldo de 100 vitórias e está no nível Imortal.");
  });

  test("should display error for invalid input (NaN)", () => {
    calculator.victoriesInput.value = "abc";
    calculator.defeatsInput.value = "10";
    calculator.handleSubmit(new Event("submit"));
    expect(calculator.resultDiv.innerText).toBe("Por favor, insira valores numéricos válidos e não negativos para vitórias e derrotas.");
    expect(calculator.resultDiv.className).toBe("message error");
  });

  test("should display error for negative victories", () => {
    calculator.victoriesInput.value = "-5";
    calculator.defeatsInput.value = "10";
    calculator.handleSubmit(new Event("submit"));
    expect(calculator.resultDiv.innerText).toBe("Por favor, insira valores numéricos válidos e não negativos para vitórias e derrotas.");
    expect(calculator.resultDiv.className).toBe("message error");
  });

  test("should display error for negative defeats", () => {
    calculator.victoriesInput.value = "50";
    calculator.defeatsInput.value = "-10";
    calculator.handleSubmit(new Event("submit"));
    expect(calculator.resultDiv.innerText).toBe("Por favor, insira valores numéricos válidos e não negativos para vitórias e derrotas.");
    expect(calculator.resultDiv.className).toBe("message error");
  });

  test("should display success message for valid input", () => {
    calculator.victoriesInput.value = "75";
    calculator.defeatsInput.value = "25";
    calculator.handleSubmit(new Event("submit"));
    expect(calculator.resultDiv.innerText).toBe("O Herói tem um saldo de 50 vitórias e está no nível Ouro.");
    expect(calculator.resultDiv.className).toBe("message success");
  });
});

