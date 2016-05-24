 
      google.charts.load("current", {packages:["corechart"]});
      google.charts.setOnLoadCallback(drawChart);
      function drawChart() {
        var data = google.visualization.arrayToDataTable([
          ['Task', 'Hours per Day'],
          ['Work',     11],
          ['Eat',      2],
          ['Commute',  2],
          ['Watch TV', 2],
          ['Sleep',    7]
        ]);
        var data2 = google.visualization.arrayToDataTable([
        ["Element", "Density", { role: "style" } ],
        ["Copper", 8.94, "#b87333"],
        ["Silver", 10.49, "silver"],
        ["Gold", 19.30, "gold"],
        ["Platinum", 21.45, "color: #e5e4e2"]
      ]);
        var view = new google.visualization.DataView(data2);
      view.setColumns([0, 1,
                       { calc: "stringify",
                         sourceColumn: 1,
                         type: "string",
                         role: "annotation" },
                       2]);

        var options = {
       titleTextStyle: {
    color: 'white',
},
legend: {textStyle: {color: 'white'}},
          title: 'My Daily Activities',
          backgroundColor: '#344770',
          fontName: 'corbertregular',
          color:'white',
          is3D: true,
        };
        /*
 var options2 = {
        title: "Density of Precious Metals, in g/cm^3",
        width: 600,
        height: 400,
        bar: {groupWidth: "95%"},
        legend: { position: "none" },
      };
*/
var options2 = {
       titleTextStyle: {
    color: 'white',
},
legend: {textStyle: {color: 'white'}},
vAxis:{textStyle: {color: 'white'}},
          title: 'My Daily Activities',
          backgroundColor: '#344770',
          fontName: 'corbertregular',
          color:'white',
          
        };
        var chart = new google.visualization.BarChart(document.getElementById("barchart_values"));
      chart.draw(view, options2);

        var chart = new google.visualization.PieChart(document.getElementById('piechart_3d'));
        chart.draw(data, options);

      }