/*var myPlot = document.getElementById('myDiv'),
    hoverInfo = document.getElementById('hoverinfo'),
    d3 = Plotly.d3,
    N = 16,
    x = d3.range(N),
    y1 = d3.range(N).map( d3.random.normal() ),
    y2 = d3.range(N).map( d3.random.normal() ),
    data = [ { x:x, y:y1, type:'scatter', name:'Trial 1',
        mode:'markers', marker:{size:16} },
        { x:x, y:y2, type:'scatter', name:'Trial 2',
        mode:'markers', marker:{size:16} } ];
    layout = {
        hovermode:'closest',
        title:'Hover on Points'
     };
Plotly.plot('myDiv', data, layout);

myPlot.on('plotly_hover', function(data){
    
    var infotext = data.points.map(function(d){
      return (d.data.name+': x= '+d.x+', y= '+d.y.toPrecision(3));
    });

    hoverInfo.innerHTML = infotext.join('');
})
 .on('plotly_unhover', function(data){
    hoverInfo.innerHTML = '';
});*/
var trace1 = {
  x: [1, 2, 3, 4],
  y: [10, 11, 12, 13],
  text: ['A<br>size: 40', 'B<br>size: 60', 'C<br>size: 80', 'D<br>size: 100'],
  mode: 'markers',
  marker: {
    size: [400, 600, 800, 1000],
    sizemode: 'area'
  }
};

var trace2 = {
  x: [1, 2, 3, 4],
  y: [14, 15, 16, 17],
  text: ['A</br>size: 40</br>sixeref: 0.2', 'B</br>size: 60</br>sixeref: 0.2', 'C</br>size: 80</br>sixeref: 0.2', 'D</br>size: 100</br>sixeref: 0.2'],
  mode: 'markers',
  marker: {
    size: [400, 600, 800, 1000],
    //setting 'sizeref' to lower than 1 decreases the rendered size
    sizeref: 2,
    sizemode: 'area'
  }
};

var trace3 = {
  x: [1, 2, 3, 4],
  y: [20, 21, 22, 23],
  text: ['A</br>size: 40</br>sixeref: 2', 'B</br>size: 60</br>sixeref: 2', 'C</br>size: 80</br>sixeref: 2', 'D</br>size: 100</br>sixeref: 2'],
  mode: 'markers',
  marker: {
    size: [400, 600, 800, 1000],
    //setting 'sizeref' to less than 1, increases the rendered marker sizes
    sizeref: 0.2,
    sizemode: 'area'
  }
};

var data = [trace1, trace2, trace3];

var layout = {
  title: 'Bubble Chart Size Scaling',
  showlegend: false,
  height: 400,
  width: 480
};

Plotly.newPlot('myDiv', data, layout);