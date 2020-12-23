import { plays } from './plays.js'

export default function createStatementData(invoice) {
  const statementData = {};
  statementData.customer = invoice.customer;
  statementData.performances = invoice.performances.map(enrichPerformance);
  statementData.totalAmount = totalAmount(statementData);
  statementData.totalVolumeCredits = totalVolumeCredits(statementData);
  return statementData;
}

class performanceCalculator {
  constructor(performance, play) {
    this.performance = performance;
    this.play = play;
  }

  get amount() {
    let thisAmount = 0;
    switch (this.play.type) {
      case "tragedy":
        thisAmount = 40000;
        if (this.performance.audience > 30) {
          thisAmount += 1000 * (this.performance.audience - 30);
        }
        break;
      case "comedy":
        if (this.performance.audience > 20) {
          thisAmount += 10000 + 500 * (this.performance.audience - 20);
        }
        thisAmount += 300 * this.performance.audience;
        break;
      default:
        throw new Error(`unknown type: ${this.play.type}`);
    }
    return thisAmount;
  }
}

function enrichPerformance(performance) {
  const calculator = new performanceCalculator(performance, playFor(performance));
  const result = Object.assign({}, performance);
  result.play = calculator.play;
  result.amount = calculator.amount;
  result.volumeCredits = volumeCreditsFor(result);
  return result;
}

function playFor(performance) {
  return plays[performance.playID];
}

function totalVolumeCredits(data) {
  return data.performances
    .reduce((total, p) => total + p.volumeCredits, 0);
}

function totalAmount(data) {
  return data.performances
    .reduce((total, p) => total + p.amount, 0);
}

function volumeCreditsFor(performance) {
  let volumeCredits = 0;
  volumeCredits += Math.max(performance.audience - 30, 0);
  if ("comedy" == performance.play.type) volumeCredits += Math.floor(performance.audience / 5);
  return volumeCredits;
}
