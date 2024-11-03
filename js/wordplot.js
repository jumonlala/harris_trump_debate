
function WordPlot(_data){
    this.data = _data;
    this.trumpData = [];
    this.harrisData = []; 
    this.initVis();
}

WordPlot.prototype.initVis = function(){
    var vis = this;
    vis.margin = {top: 30, right: 50, bottom: 10, left: 50};
    vis.width = window.innerWidth/2 - vis.margin.left - vis.margin.right;
    vis.height = window.innerHeight - vis.margin.top - vis.margin.bottom;
    
    vis.trump_svg = d3.select("#trump-word").append("svg")
        .attr("width", vis.width/2)
        .attr("height", vis.height + vis.margin.top + vis.margin.bottom)
        .append("g")
        .attr("transform", "translate(" + vis.margin.left + "," + vis.margin.top +")");

    vis.harris_svg = d3.select("#harris-word").append("svg")
        .attr("width", vis.width/2)
        .attr("height", vis.height + vis.margin.top + vis.margin.bottom)
        .append("g")
        .attr("transform", "translate(" + vis.margin.left + ","  + vis.margin.top + ")");
}

WordPlot.prototype.wrangleData = function(_selected){
    var vis = this;

    vis.selected = _selected;
    var trump_filtered = vis.data[vis.selected].trump;
    var harris_filtered = vis.data[vis.selected].harris;
    vis.trumpData = (trump_filtered.length < 20) ? trump_filtered : trump_filtered.slice(0,20);
    vis.harrisData = (harris_filtered.length < 20) ? harris_filtered : harris_filtered.slice(0,20);
    vis.updateVis();
}

WordPlot.prototype.updateVis = function(){
    var vis = this;
    var orig_font_size = 0;
    var trump_texts = vis.trump_svg.selectAll(".trump-texts")
        .data(vis.trumpData);

    trump_texts.enter()
        .append("text")  
        .merge(trump_texts)
        .attr("class", "trump-texts")
        .attr("x", 60)
        .attr("y", function(d, i) { 
            return 30 + i*30; // Use updated cumulative_y for line height
        })
        .text(function(d) { return d[0]; }) 
        .attr("font-size", function(d, i){return (20-i*0.5)+"px"})
        .attr("fill", "red")
        .style("cursor", "pointer")
        .on("mouseover", function(d){
            orig_font_size = d3.select(this).attr("font-size");
            d3.select(this)
                .attr("fill", "black")
                .attr("font-size", "30px");
        })
        .on("mouseout", function(d, i){
            d3.select(this)
                .attr("fill", "red")
                .attr("font-size", orig_font_size);
        });


    var harris_texts = vis.harris_svg.selectAll(".harris-texts")
        .data(vis.harrisData);

    harris_texts.enter()
        .append("text")  
        .merge(harris_texts)
        .attr("class", "harris-texts")
        .attr("x", 10)
        .attr("y", function(d, i) { 
            return 30 + i*30; // Use updated cumulative_y for line height
        })
        .text(function(d) { return d[0]; }) 
        .attr("font-size", function(d, i){return (20-i*0.5)+"px"})
        .attr("fill", "blue")
        .style("cursor", "pointer")
        .on("mouseover", function(d){
            orig_font_size = d3.select(this).attr("font-size");
            d3.select(this)
                .attr("fill", "black")
                .attr("font-size", "30px");
        })
        .on("mouseout", function(d, i){
            d3.select(this)
                .attr("fill", "blue")
                .attr("font-size", orig_font_size);
        });

    trump_texts.exit().remove();
    harris_texts.exit().remove();

}