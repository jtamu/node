import { invoices } from './invoices.js'
import { plays } from './plays.js'
import createStatementData from './createStatementData.js'

function statement(invoice) {
  return renderPlainText(createStatementData(invoice));
}

function renderPlainText(data) {
  let result = `Statement for ${data.customer}\n`;

  for (let perf of data.performances) {
    result += `  ${perf.play.name}: ${usd(perf.amount)} (${perf.audience} seats)\n`;
  }

  result += `Amount owed is ${usd(data.totalAmount)}\n`;
  result += `You earned ${data.totalVolumeCredits} credits\n`;
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

function usd(number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency", currency: "USD",
    minimumFractionDigits: 2
  }).format(number/100);
}

invoices.forEach((invoice, i) => {
  console.log(statement(invoice, plays))
});
