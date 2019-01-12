


function PlotAll(json,page) {
    plotTable(json,page);
    PlotChart(json,page);
}

var PlotChart = (data,page) => {
    var cc = document.getElementById('chart-container');
    cc.innerHTML = "<canvas id='myChart'></canvas>"

    var p = page-1;
    var dateArray = [];
    var openArray = [];
    var closeArray = [];
    var highArray = [];
    var lowArray = [];

    for (var i = 0; i < 10; i++) {
        dateArray[i] = data.priceHistory[i+(p*10)][0]
    }
    for (var i = 0; i < 10; i++) {
        openArray[i] = data.priceHistory[i+(p*10)][1]
    }
    for (var i = 0; i < 10; i++) {
        highArray[i] = data.priceHistory[i+(p*10)][2]
    }
    for (var i = 0; i < 10; i++) {
        lowArray[i] = data.priceHistory[i+(p*10)][3]
    }
    for (var i = 0; i < 10; i++) {
        closeArray[i] = data.priceHistory[i+(p*10)][4]
    }


    var config = {
        type: 'line',
        data: {
            labels: dateArray,
            datasets: [{
                label: 'High',
                backgroundColor: 'rgba(77, 182, 172, 1)',
                borderColor: 'rgba(77, 182, 172, 1)',
                data: highArray,
                fill: false,
                lineTension: 0,
            }, {
                label: 'Low',
                fill: false,
                backgroundColor: 'rgba(79, 195, 247, 1)',
                borderColor: 'rgba(79, 195, 247, 1)',
                data: lowArray,
                lineTension: 0,
            }, {
                label: 'Open',
                fill: false,
                backgroundColor: 'rgba(79, 195, 0, 1)',
                borderColor: 'rgba(79, 195, 0, 1)',
                data: openArray,
                lineTension: 0,
            }, {
                label: 'Close',
                fill: false,
                backgroundColor: 'rgba(0, 195, 247, 1)',
                borderColor: 'rgba(0, 195, 247, 1)',
                data: closeArray,
                lineTension: 0,
            }]
        },
        options: {
            maintainAspectRatio: false,
            tooltips: {
                mode: 'index',
                intersect: false,
            },
            hover: {
                mode: 'nearest',
                intersect: true
            },
            scales: {
                xAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: ''
                    }
                }],
                yAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Temperature'
                    }
                }]
            }
        }
    };

    var ctx = document.getElementById('myChart');
    window.myLine = new Chart(ctx, config);
};

//table plot function
function plotTable(data,page) {

    var p = page-1;

    const table = document.getElementById('table');

    var tableHeadData = "";
    var tableBodyData = "";
    var tRow = "";
    var tHeads = data.column_names;
    var tBody = data.priceHistory;

    for (var i = 0; i < 6; i++) {
        tableHeadData += "<th>" + tHeads[i] + "</th>";
    }

    for (var i = 0; i < 10; i++) {
        for (var j = 0; j < 6; j++) {
            tRow += "<td>" + tBody[i+(p*10)][j] + "</td>";
        }
        console.log(tRow);
        tableBodyData += "<tr>" + tRow + "</tr>";
        tRow = "";
    }

    tableData = "<table class='striped responsive-table centered'><thead><tr>" + tableHeadData + "</tr></thead><tbody>" + tableBodyData + "</tbody></table>";
    table.innerHTML = tableData;

    const pages = document.getElementById('pages');
    var pgMarkup = "";
    var nop = Math.ceil(tBody.length);
    for (var i = 0; i < nop; i++) {
        pgMarkup += "<li class='waves-effect'><a onclick='PlotAll(json,"+(i+1)+")'>"+(i+1)+"</a></li>";
    };

    pages.innerHTML = "<ul class='pagination' style='text-align:center'>"+pgMarkup+"</ul>"

};