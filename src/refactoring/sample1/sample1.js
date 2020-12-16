import { invoices } from './invoices.js'
import { plays } from './plays.js'

function statement(invoice, plays) {
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `Statement for ${invoice.customer}\n`;

  for (let perf of invoice.performances) {
    const play = playFor(perf);

    volumeCredits += volumeCreditsFor(perf);
    result += `  ${playFor(perf).name}: ${format(amountFor(perf)/100)} (${perf.audience} seats)\n`;
    totalAmount += amountFor(perf);
  }
  result += `Amount owed is ${format(totalAmount/100)}\n`;
  result += `You earned ${volumeCredits} credits\n`;
  return result;
}

function playFor(performance) {
  return plays[performance.playID];
}

function volumeCreditsFor(performance) {
  let volumeCredits = 0;
  volumeCredits += Math.max(performance.audience - 30, 0);
  if ("comedy" == playFor(performance).type) volumeCredits += Math.floor(performance.audience / 5);
  return volumeCredits;
}

function format(number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency", currency: "USD",
    minimumFractionDigits: 2
  }).format(number);
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
