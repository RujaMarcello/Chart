const apiNameURL = "https://retoolapi.dev/0EPTHO/top50stocks";
const apiDataURL = "https://api.polygon.io/v2/aggs/ticker/"; // + name stok;
const apiDataURLContinue =
  "/range/1/day/2020-06-01/2020-06-17?apiKey=T2pXNPJMjqLKbxhisfqu3PNUmumklP7v";
const searchBar = document.getElementById("search");
var nameStock;
var dataStock;
var listOfStocks = [];
var xLabels = [];
var yLabels = [];
getNameStock();
async function getNameStock() {
  const response = await fetch(apiNameURL);
  nameStock = await response.json();
}
function checkIfSymbolIncludeLetters(stockSymbol, textSearched) {
  if (stockSymbol.includes(textSearched)) {
    listOfStocks.push(stockSymbol);
  }
}
function clearLastList() {
  var myList = document.getElementById("stockList");
  myList.innerHTML = "";
}
function showElements() {
  listOfStocks = [];
  clearLastList();
  let textSearched = searchBar.value;
  for (let cnt = 0; cnt < nameStock.length; ++cnt) {
    checkIfSymbolIncludeLetters(nameStock[cnt].Symbol, textSearched);
  }
  displayList();
}
function displayList() {
  if (searchBar.value != "") {
    for (let cnt = 0; cnt < listOfStocks.length; ++cnt) {
      let line = document.createElement("li");
      line.textContent = listOfStocks[cnt];
      line.onclick = function () {
        graphData(listOfStocks[cnt]);
      };
      document.getElementById("stockList").append(line);
    }
  }
}
function graphData(Stock) {
  fetch(apiDataURL + Stock + apiDataURLContinue)
    .then((res) => res.json())
    .then((dataStock) => {
      for (let cnt = 0; cnt < 12; ++cnt) {
        xLabels.push(new Date(dataStock.results[cnt].t));
        yLabels.push(dataStock.results[cnt].h);
      }
    });
  let graphReference = document.getElementById("StockGraph");
  let chart = new Chart(graphReference, {
    type: "line",
    data: {
      labels: xLabels,
      datasets: [
        {
          data: yLabels,
        },
      ],
    },
  });
}
