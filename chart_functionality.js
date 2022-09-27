/*
Chat-functionality.js file contains all the essential functions used 
for creating charts using chart js library
*/

// Map to map all the ISO codes to the respective currency name
const languages = new Map([
  ["INR", "Indian rupee   (INR)                     "],
  ["DZD", "Algerian dinar   (DZD)                     "],
  ["AUD", "Australian dollar   (AUD)                     "],
  ["BHD", "Bahrain dinar   (BHD)                     "],
  ["VEF", "Bolivar Fuerte   (VEF)                     "],
  ["BWP", "Botswana pula   (BWP)                     "],
  ["BRL", "Brazilian real   (BRL)                     "],
  ["BND", "Brunei dollar   (BND)                     "],
  ["CAD", "Canadian dollar   (CAD)                     "],
  ["CLP", "Chilean peso   (CLP)                     "],
  ["CNY", "Chinese yuan   (CNY)                     "],
  ["COP", "Colombian peso   (COP)                     "],
  ["CZK", "Czech koruna   (CZK)                     "],
  ["DKK", "Danish krone   (DKK)                     "],
  ["EUR", "Euro   (EUR)                     "],
  ["HUF", "Hungarian forint   (HUF)                     "],
  ["ISK", "Icelandic krona   (ISK)                     "],
  ["IDR", "Indonesian rupiah   (IDR)                     "],
  ["IRR", "Iranian rial   (IRR)                     "],
  ["ILS", "Israeli New Shekel   (ILS)                     "],
  ["JPY", "Japanese yen   (JPY)                     "],
  ["KZT", "Kazakhstani tenge   (KZT)                     "],
  ["KRW", "Korean won   (KRW)                     "],
  ["KWD", "Kuwaiti dinar   (KWD)                     "],
  ["LYD", "Libyan dinar   (LYD)                     "],
  ["MYR", "Malaysian ringgit   (MYR)                     "],
  ["MUR", "Mauritian rupee   (MUR)                     "],
  ["MXN", "Mexican peso   (MXN)                     "],
  ["NPR", "Nepalese rupee   (NPR)                     "],
  ["NZD", "New Zealand dollar   (NZD)                     "],
  ["NOK", "Norwegian krone   (NOK)                     "],
  ["OMR", "Omani rial   (OMR)                     "],
  ["PKR", "Pakistani rupee   (PKR)                     "],
  ["PEN", "Peruvian sol   (PEN)                     "],
  ["PHP", "Philippine peso   (PHP)                     "],
  ["PLN", "Polish zloty   (PLN)                     "],
  ["QAR", "Qatari riyal   (QAR)                     "],
  ["RUB", "Russian ruble   (RUB)                     "],
  ["SAR", "Saudi Arabian riyal   (SAR)                     "],
  ["SGD", "Singapore dollar   (SGD)                     "],
  ["ZAR", "South African rand   (ZAR)                     "],
  ["LKR", "Sri Lankan rupee   (LKR)                     "],
  ["SEK", "Swedish krona   (SEK)                     "],
  ["CHF", "Swiss franc   (CHF)                     "],
  ["THB", "Thai baht   (THB)                     "],
  ["TTD", "Trinidadian dollar   (TTD)                     "],
  ["TND", "Tunisian dinar   (TND)                     "],
  ["AED", "U.A.E. dirham   (AED)                     "],
  ["GBP", "U.K. pound   (GBP)                     "],
  ["USD", "U.S. dollar   (USD)                     "],
  ["UYU", "Uruguayan peso   (UYU)                     "],
]);

var labels = [];
var datapoints;
var myChart;
var bgc = [];
var pointradius = [];

/*
  SelectCountry function will recognize the countries selected and accordingly 
  read the data from the csv file, It will plot the graph for the giving countries currencies
*/

function SelectCountry() {
  const Country1 = document.getElementById("country1").value;
  const Country2 = document.getElementById("country2").value;

  document.getElementById("crates").innerHTML = Country1 + "/" + Country2;

  let chartStatus = Chart.getChart("myChart");
  if (chartStatus != undefined) {
    chartStatus.destroy();
  }
  console.log(Country1);
  console.log(Country2);
  const chartData = "./Final_Data.csv";
  dates = [];
  usd = [];
  inr = [];

  // Reading csv file using d3 library
  d3.csv(chartData).then(function (datapoints) {
    for (i = 0; i < datapoints.length; i++) {
      dates.push(datapoints[i]["Date"]);
      usd.push(datapoints[i][languages.get(Country1)]);
      inr.push(
        datapoints[i][languages.get(Country2)] /
          datapoints[i][languages.get(Country1)]
      );
    }

    labels = dates;
    bgc = [];
    pointradius = [];
    temp = findMinMax(inr, dates);
    bgc = temp[0];
    pointradius = temp[1];

    // To specify the data to be displayed in chart
    const data = {
      labels: dates,
      datasets: [
        {
          label: "Currency Comparision",
          data: inr,
          borderColor: "#007bff",
          borderWidth: 1,
          pointRadius: pointradius,
          pointBackgroundColor: bgc,
          fill: false,
          tension: 0.1,
        },
      ],
    };

    // Specify the type of chart and scales
    const config = {
      type: "line",
      data,
      options: {
        scales: {
          y: {
            beginAtZero: false,
          },
        },
      },
    };

    // Create the chart
    myChart = new Chart(document.getElementById("myChart"), config);
  });
}

/*
  Function to find the minimum and maximum currency rate 
  for the given specified period of time
*/
function findMinMax(inr, dates) {
  bgc = [];
  pointradius = [];
  const maxi = Math.max(...inr);
  const mini = Math.min(...inr);

  for (i = 0; i < inr.length; i++) {
    if (inr[i] === maxi) {
      bgc.push("rgb(0 , 0 , 0)");
      document.getElementById("max").innerHTML = dates[i];
      document.getElementById("maxval").innerHTML = maxi;
      console.log(dates[i]);
      pointradius.push(3);
    } else if (inr[i] == mini) {
      bgc.push("rgb(0 , 0 , 0)");
      document.getElementById("min").innerHTML = dates[i];
      document.getElementById("minval").innerHTML = mini;
      console.log(dates[i]);
      pointradius.push(3);
    } else {
      bgc.push("rgb(0 , 0 , 255)");
      pointradius.push(0);
    }
  }

  return [bgc, pointradius];
}

/*
  Function to update chart if user specify weekly monthly, yearly
*/
function updateChart(range) {
  if (range == 3600) {
    range = labels.length;
  }
  console.log(myChart.config.data.datasets[0].data);
  const rangeValue = labels.slice(labels.length - range, labels.length);
  myChart.config.data.labels = rangeValue;
  const ansValue = inr.slice(labels.length - range, labels.length);
  myChart.config.data.datasets[0].data = ansValue;
  const temp = findMinMax(ansValue, rangeValue);
  const backValue = temp[0];
  myChart.config.data.datasets[0].pointBackgroundColor = backValue;
  const pointValue = temp[1];
  myChart.config.data.datasets[0].pointRadius = pointValue;
  myChart.update(myChart.config.data.datasets.data);
}

/*
  Function to update if user specify specific dates to show
*/
function filterUsingDate() {
  var startdate = document.getElementById("startdate").value;
  var enddate = document.getElementById("enddate").value;

  startdate = startdate.split("-").reverse().join("-");
  enddate = enddate.split("-").reverse().join("-");
  const startIndex = labels.indexOf(startdate);
  const endIndex = labels.indexOf(enddate);
  const rangeValue = labels.slice(startIndex, endIndex);
  myChart.config.data.labels = rangeValue;
  const ansValue = inr.slice(startIndex, endIndex);
  myChart.config.data.datasets[0].data = ansValue;
  const temp = findMinMax(ansValue, rangeValue);
  const backValue = temp[0];
  myChart.config.data.datasets[0].pointBackgroundColor = backValue;
  const pointValue = temp[1];
  myChart.config.data.datasets[0].pointRadius = pointValue;
  myChart.update(myChart.config.data.datasets.data);
}
