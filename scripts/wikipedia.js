var wikipedia_base_url = "https://en.wikipedia.org/w/api.php";

$(document).ready(function(){
	
	getRandomWikiArticle();

})

var getRandomWikiArticle = function() {

	var articleId;

	var random_request = $.ajax({
        url: wikipedia_base_url + "?action=query&generator=random&grnnamespace=0&grnlimit=1&prop=info&inprop=url&format=json",
        type: "GET",
        success: function(data, textStatus) {	
        	articleId = Object.keys(data.query.pages)[0];
        	var articleUrl = data.query.pages[articleId].fullurl;
        	var articleTitle = data.query.pages[articleId].title;
        	$("a").attr("href", articleUrl);
        	$(".logo").html(articleTitle);
        	loadWikiSummary(articleId);
        },
        error: function() {
        	console.log("Error fetching random article.");
        }
    });

}

var loadWikiSummary = function(articleId) {

	var article_request = $.ajax({
		url: wikipedia_base_url + "?action=query&pageids=" + articleId + "&prop=extracts&explaintext=%27%27&exintro=%27%27&format=json",
		type: "GET",
		success: function(data, textStatus) {
			console.log(data);
			var articleSummary = data.query.pages[articleId].extract;

			$("#wiki_summary").html(articleSummary);
		},
		error: function() {
			console.log("Error fetching article summary.")
		}
	});

}