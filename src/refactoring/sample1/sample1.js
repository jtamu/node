import { invoices } from './invoices.js'
import { plays } from './plays.js'

function statement(invoice, plays) {
  const statementData = {};
  statementData.customer = invoice.customer;
  statementData.performances = invoice.performances.map(enrichPerformance);
  return renderPlainText(statementData, invoice, plays);
}

function enrichPerformance(performance) {
  const result = Object.assign({}, performance);
  result.play = playFor(result);
  return result;
}

function renderPlainText(data, invoice, plays) {
  let result = `Statement for ${data.customer}\n`;

  for (let perf of data.performances) {
    const play = playFor(perf);
    result += `  ${playFor(perf).name}: ${usd(amountFor(perf))} (${perf.audience} seats)\n`;
  }

  result += `Amount owed is ${usd(totalAmount(invoice))}\n`;
  result += `You earned ${totalVolumeCredits(invoice)} credits\n`;
  return result;
}

function playFor(performance) {
  return plays[performance.playID];
}

function totalVolumeCredits(invoice) {
  let volumeCredits = 0;
  for (let perf of invoice.performances) {
    volumeCredits += volumeCreditsFor(perf);
  }
  return volumeCredits;
}

function totalAmount(invoice) {
  let totalAmount = 0;
  for (let perf of invoice.performances) {
    totalAmount += amountFor(perf);
  }
  return totalAmount;
}

function volumeCreditsFor(performance) {
  let volumeCredits = 0;
  volumeCredits += Math.max(performance.audience - 30, 0);
  if ("comedy" == playFor(performance).type) volumeCredits += Math.floor(performance.audience / 5);
  return volumeCredits;
}

function usd(number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency", currency: "USD",
    minimumFractionDigits: 2
  }).format(number/100);
}

function amountFor(performance) {
  let thisAmount = 0;
  switch (playFor(performance).type) {
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

invoices.forEach((invoice, i) => {
  console.log(statement(invoice, plays))
});
