class RankedMatchCalculator {
  constructor(doc = document) {
    this.form = doc.getElementById("formRanked");
    this.victoriesInput = doc.getElementById("vitorias");
    this.defeatsInput = doc.getElementById("derrotas");
    this.resultDiv = doc.getElementById("resultado");
    if (this.form) {
      this.addEventListeners();
    }
  }

  addEventListeners() {
    this.form.addEventListener("submit", this.handleSubmit.bind(this));
  }

  handleSubmit(event) {
    event.preventDefault();
    const victories = parseInt(this.victoriesInput.value);
    const defeats = parseInt(this.defeatsInput.value);

    if (isNaN(victories) || isNaN(defeats) || victories < 0 || defeats < 0) {
      this.displayResult("Por favor, insira valores numéricos válidos e não negativos para vitórias e derrotas.", "error");
      return;
    }

    const result = this.calculateRank(victories, defeats);
    this.displayResult(result, "success");
  }

  calculateRank(victories, defeats) {
    const balance = victories - defeats;
    let level = "";

    if (victories < 10) {
      level = "Ferro";
    } else if (victories >= 10 && victories <= 20) {
      level = "Bronze";
    } else if (victories >= 21 && victories <= 50) {
      level = "Prata";
    } else if (victories >= 51 && victories <= 80) {
      level = "Ouro";
    } else if (victories >= 81 && victories <= 90) {
      level = "Diamante";
    } else if (victories >= 91 && victories <= 100) {
      level = "Lendário";
    } else if (victories >= 101) {
      level = "Imortal";
    }

    return `O Herói tem um saldo de ${balance} vitórias e está no nível ${level}.`;
  }

  displayResult(message, type) {
    this.resultDiv.innerText = message;
    this.resultDiv.className = `message ${type}`;
  }
}

// Export for Node.js (Jest) environment
if (typeof module !== 'undefined' && module.exports) {
  module.exports = RankedMatchCalculator;
} else {
  // For browser environment
  document.addEventListener("DOMContentLoaded", () => {
    new RankedMatchCalculator();
  });
}

