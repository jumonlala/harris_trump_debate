
var allData = {};
var selected, scatterPlot, wordPlot;
loadData();
function loadData(){
    var files = ['./data/transcript_data.json', './data/word_data.json']
    var promises = []

    files.forEach(function(file){
        promises.push(d3.json(file));
    });

    Promise.all(promises).then(function(data){
        allData['transcript_data'] = data[0];
        allData['word_data'] = data[1];   
        // console.log(allData['word_data']);
        scatterPlot = new ScatterPlot(allData['transcript_data']);   
        wordPlot = new WordPlot(allData['word_data']);
        wrangleData();
    });
}

function wrangleData(){
    selected =d3.select("#topics-dropdown").property("value");
    x_label = d3.select("#scatterX-dropdown").property("value");
    y_label = d3.select("#scatterY-dropdown").property("value");
    trump_check = d3.select("#trumpCheckbox").property("checked");
    harris_check = d3.select("#harrisCheckbox").property("checked");
    scatterPlot.wrangleData(selected, x_label, y_label, trump_check, harris_check);
    wordPlot.wrangleData(selected);
}