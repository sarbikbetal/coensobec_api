function PlotAll(json, page) {
    plotTable(json, page);
    PlotChart(json, page);
}

function PlotMain(data) {
    var ds = data.priceHistory;
    var fdateArray = [];
    var fopenArray = [];
    var fcloseArray = [];

    for (var i = 0; i < ds.length; i++) {
        fdateArray[i] = ds[i][0]
    }
    for (var i = 0; i < ds.length; i++) {
        fopenArray[i] = ds[i][1]
    }
    for (var i = 0; i < ds.length; i++) {
        fcloseArray[i] = ds[i][4]
    }

    var fconfig = {
        type: 'line',
        data: {
            labels: fdateArray,
            datasets: [{
                label: 'Open',
                fill: false,
                borderWidth: 1,
                pointRadius: 0,
                borderColor: 'rgba(79, 195, 0, 1)',
                data: fopenArray,
                lineTension: 0,
            }, {
                label: 'Close',
                fill: false,
                borderWidth: 1,
                pointRadius: 0,
                borderColor: 'rgba(198, 30, 60, 1)',
                data: fcloseArray,
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
                        labelString: ''
                    }
                }]
            }
        }
    };
    var fct = document.getElementById('fullChart');
    window.myLine2 = new Chart(fct, fconfig);

    document.getElementById('cname').innerHTML = data.ticker;
}

var PlotChart = (data, page) => {
    var cc = document.getElementById('chart-container');
    cc.innerHTML = "<canvas id='myChart'></canvas>"

    var p = page - 1;
    var dateArray = [];
    var openArray = [];
    var closeArray = [];
    var highArray = [];
    var lowArray = [];
    var pHistory = data.priceHistory;

    for (var i = 0; i < 10 && (i + (p * 10)) < pHistory.length; i++) {
        dateArray[i] = pHistory[i + (p * 10)][0]
    }
    for (var i = 0; i < 10 && (i + (p * 10)) < pHistory.length; i++) {
        openArray[i] = pHistory[i + (p * 10)][1]
    }
    for (var i = 0; i < 10 && (i + (p * 10)) < pHistory.length; i++) {
        highArray[i] = pHistory[i + (p * 10)][2]
    }
    for (var i = 0; i < 10 && (i + (p * 10)) < pHistory.length; i++) {
        lowArray[i] = pHistory[i + (p * 10)][3]
    }
    for (var i = 0; i < 10 && (i + (p * 10)) < pHistory.length; i++) {
        closeArray[i] = pHistory[i + (p * 10)][4]
    }


    var config = {
        type: 'line',
        data: {
            labels: dateArray,
            datasets: [{
                label: 'High',
                borderColor: 'rgba(79, 195, 0, 1)',
                data: highArray,
                fill: false,
                lineTension: 0,
            }, {
                label: 'Low',
                fill: false,
                borderColor: 'rgba(220, 79, 0, 1)',
                data: lowArray,
                lineTension: 0,
            }, {
                label: 'Open',
                fill: false,
                borderColor: '#4bb9e8',
                data: openArray,
                lineTension: 0,
            }, {
                label: 'Close',
                fill: false,
                borderColor: '#f9d50e',
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
                        labelString: 'Date'
                    }
                }],
                yAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: ''
                    }
                }]
            }
        }
    };

    var ctx = document.getElementById('myChart');
    window.myLine = new Chart(ctx, config);
};

//table plot function
function plotTable(data, page) {

    var p = page - 1;

    const table = document.getElementById('table');

    var tableHeadData = "";
    var tableBodyData = "";
    var tRow = "";
    var tHeads = data.column_names;
    var tBody = data.priceHistory;

    for (var i = 0; i < 6; i++) {
        tableHeadData += "<th>" + tHeads[i] + "</th>";
    }

    for (var i = 0; i < 10 && (i + (p * 10)) < tBody.length; i++) {
        for (var j = 0; j < 6; j++) {
            tRow += "<td>" + tBody[i + (p * 10)][j] + "</td>";
        }
        tableBodyData += "<tr>" + tRow + "</tr>";
        tRow = "";
    }

    tableData = "<table class='striped responsive-table centered'><thead><tr>" + tableHeadData + "</tr></thead><tbody>" + tableBodyData + "</tbody></table>";
    table.innerHTML = tableData;

    const pages = document.getElementById('pages');
    var pgMarkup = "";
    var nop = Math.ceil(tBody.length / 10.0);
    for (var i = (0 + p); i < p + 7 && i < nop; i++) {
        if (i == (0 + p)) {
            pgMarkup += "<li class='active'><a onclick='PlotAll(json," + (i + 1) + ")'>" + (i + 1) + "</a></li>";
        } else {
            pgMarkup += "<li class='waves-effect'><a onclick='PlotAll(json," + (i + 1) + ")'>" + (i + 1) + "</a></li>";
        }
    };

    if (page == 1) {
        pages.innerHTML = "<ul class='pagination' style='text-align:center'><li class='disabled'><a><i class='material-icons'>chevron_left</i></a></li>" + pgMarkup + "<li class='waves-effect'><a onclick='PlotAll(json," + (p + 2) + ")'><i class='material-icons'>chevron_right</i></a></li><li class='waves-effect'><a onclick='PlotAll(json," + nop + ")'><i class='material-icons'>fast_forward</i></a></li></ul>"
    } else if (page == nop) {
        pages.innerHTML = "<ul class='pagination' style='text-align:center'><li class='waves-effect'><a onclick='PlotAll(json,1)'><i class='material-icons'>fast_rewind</i></a></li><li class='waves-effect'><a onclick='PlotAll(json," + (p) + ")'><i class='material-icons'>chevron_left</i></a></li>" + pgMarkup + "<li class='waves-effect'><a class='disabled'><i class='material-icons'>chevron_right</i></a></li></ul>"
    } else {
        pages.innerHTML = "<ul class='pagination' style='text-align:center'><li class='waves-effect'><a onclick='PlotAll(json,1)'><i class='material-icons'>fast_rewind</i></a></li><li class='waves-effect'><a onclick='PlotAll(json," + (p) + ")'><i class='material-icons'>chevron_left</i></a></li>" + pgMarkup + "<li class='waves-effect'><a onclick='PlotAll(json," + (p + 2) + ")'><i class='material-icons'>chevron_right</i></a></li><li class='waves-effect'><a onclick='PlotAll(json," + nop + ")'><i class='material-icons'>fast_forward</i></a></li></ul>"

    }


};