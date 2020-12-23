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
}

function enrichPerformance(performance) {
  const calculator = new performanceCalculator(performance, playFor(performance));
  const result = Object.assign({}, performance);
  result.play = calculator.play;
  result.amount = amountFor(result);
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

function amountFor(performance) {
  let thisAmount = 0;
  switch (performance.play.type) {
    case "tragedy":
      thisAmount = 40000;
      if (performance.audience > 30) {
        thisAmount += 1000 * (performance.audience - 30);
      }
      break;
    case "comedy":
      if (performance.audience > 20) {
        thisAmount += 10000 + 500 * (performance.audience - 20);
      }
      thisAmount += 300 * performance.audience;
      break;
    default:
      throw new Error(`unknown type: ${playFor(performance).type}`);
  }
  return thisAmount;
}
