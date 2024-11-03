
function ScatterPlot(_data){
    this.data = _data;
    this.displayData = [];
    this.initVis();
}

ScatterPlot.prototype.initVis = function(){
    var vis = this;

    var width = window.innerWidth/2;
    var height = window.innerHeight;

    vis.margin = {top: 70, right: 30, bottom: 50, left: 90};
    vis.width = width - vis.margin.left - vis.margin.right;
    vis.height = height - vis.margin.top - vis.margin.bottom;

    vis.svg = d3.select("#scatter-area").append("svg")
        .attr("width", vis.width + vis.margin.left + vis.margin.right)
        .attr("height", vis.height + vis.margin.top + vis.margin.bottom)
        .append("g")
        .attr("transform", "translate(" + vis.margin.left + "," + vis.margin.top + ")");
    
    vis.x = d3.scaleLinear()
        .range([0, vis.width]);
    
    vis.y = d3.scaleLinear()
        .range([vis.height, 0]);
    
    vis.xAxis = d3.axisBottom()
        .scale(vis.x);
    
    vis.yAxis = d3.axisLeft()
        .scale(vis.y);
    
    vis.svg.append("g")
        .attr("class", "x-axis")
        .attr("transform", "translate(0," + vis.height/2 + ")");
    
    vis.svg.append("g")
        .attr("class", "y-axis")
        .attr("transform", "translate(" + vis.width/2 + ",0)");
}

ScatterPlot.prototype.wrangleData = function(_selected, _xlabel, _ylabel, _trumpcheck, _harrischeck){
    var vis = this;
    vis.selected = _selected;
    vis.x_label = _xlabel;
    vis.y_label = _ylabel;
    vis.trump_check = _trumpcheck;
    vis.harris_check = _harrischeck;
    
    var trump_transcript = [];
    var harris_transcript = []; 
    if (vis.selected != "default") {
        trump_transcript = vis.data[vis.selected].trump.filter(d => d.token.length > 3);
        harris_transcript = vis.data[vis.selected].harris.filter(d => d.token.length > 3);
    }else {
        for (key in vis.data){
            let topic = vis.data[key];
            trump_transcript = trump_transcript.concat(topic.trump).filter(d => d.token.length > 3);
            harris_transcript = harris_transcript.concat(topic.harris).filter(d => d.token.length > 3);
        };
    };

    vis.displayData = {'trump': trump_transcript, 'harris' : harris_transcript};
    vis.updateVis();
}

ScatterPlot.prototype.updateVis = function(){
    var vis = this;

    var trump_tip = d3.tip()
        .attr('class', 'd3-tip')
        .direction('ne')
        .offset([-10, 0])
        .html(function(event, d){
            return "<span style='color: red'>Donald Trump</span>" + 
                "<br>" + d.text + "<br>" + 
                "<strong>" + vis.x_label+": </strong><span>" + Math.round(d[vis.x_label] * 100)/100 + 
                "</span><br><strong>"+vis.y_label+": </strong><span>" + Math.round(d[vis.y_label]*100)/100 +"</span>";
        });
    
    var harris_tip = d3.tip()
        .attr('class', 'd3-tip')
        .direction('ne')
        .offset([-10, 0])
        .html(function(event, d){
            return "<span style='color: blue'>Kamala Harris</span>" +
            "<br>" + d.text + "<br>" + 
            "<strong>" + vis.x_label+": </strong><span style='color:red'>" + Math.round(d[vis.x_label] * 100)/100 + 
            "</span><br><strong>"+vis.y_label+": </strong><span style='color:red'>" + Math.round(d[vis.y_label]*100)/100 +"</span>";
        });
    
    var domains = {'polarity': [-1, 1], 'subjectivity': [0, 1], 'certainty': [-1,1]}
    vis.x.domain(domains[vis.x_label]);
    vis.y.domain(domains[vis.y_label]);

    var trump_data = vis.displayData.trump;
    var harris_data = vis.displayData.harris;

    var trump_circles = vis.svg.selectAll(".trump-circles")
        .data(trump_data)
    
    var harris_circles = vis.svg.selectAll(".harris-circles")
        .data(harris_data)

    trump_circles.enter()
        .append("circle")
        .merge(trump_circles)
        .attr("class", "trump-circles")
        .classed('hide', !vis.trump_check)
        .attr("r", 5)
        .attr('cx', function(d){ return vis.x(d[vis.x_label]);})
        .attr('cy', function(d){ return vis.y(d[vis.y_label]);})
        .attr('fill', 'red')
        .style("cursor", "pointer")
        .on("mouseover", function(event, d){
            d3.select(this)
                .attr("r", 7)
                .attr("fill", "white")
                .attr("stroke", "red")
                .attr("stroke-width", 5);
            trump_tip.show(event,d);
        })
        .on("mouseout", function(event, d){
            d3.select(this)
                .attr("r", 5)
                .attr("fill", "red")
                .attr("stroke", "none");
            trump_tip.hide(event,d);
        });
    
    harris_circles.enter()
        .append("circle")
        .merge(harris_circles)
        .attr("class", "harris-circles")
        .classed('hide', !vis.harris_check)
        .attr("r", 5)
        .attr('cx', function(d){ return vis.x(d[vis.x_label]);})
        .attr('cy', function(d){ return vis.y(d[vis.y_label]);})
        .attr('fill', 'blue')
        .style("cursor", "pointer")
        .on("mouseover", function(event, d){
            d3.select(this)
                .attr("r", 7)
                .attr("fill", "white")
                .attr("stroke", "blue")
                .attr("stroke-width", 5);
            harris_tip.show(event,d);
        })
        .on("mouseout", function(event, d){
            d3.select(this)
                .attr("r", 5)
                .attr("fill", "blue")
                .attr("stroke", "none");
            harris_tip.hide(event, d);
        });
    
    trump_circles.exit().remove();
    harris_circles.exit().remove();

    vis.svg.select(".x-axis")
        .call(vis.xAxis);
    
    vis.svg.select(".y-axis")
        .call(vis.yAxis);
    
    vis.svg.call(harris_tip);
    vis.svg.call(trump_tip);
}
