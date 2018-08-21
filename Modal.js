$(document).ready(function(){
	$("#loading").hide();
	$('input[name=movieFlt]').change(function(){
		if($('input[name=movieFlt]:checked').val()==='imdbID')
		{
			$("#searchBars").empty();
			$("#searchBars").append('<input type="text" placeholder="Enter IMDB ID" class="searchMovie" id="searchMovieByIMDBID">');
		}
		else if($('input[name=movieFlt]:checked').val()==='yearAndTitle')
		{
			$("#searchBars").empty();
			$("#searchBars").append('<input type="text" placeholder="Enter movie Title" class="searchMovie" id="searchMovieByTitle">');
			$("#searchBars").append('<input type="text" placeholder="Enter movie Year" class="searchMovie" id="searchMovieByYear">');
		}
	})

	$('#searchBars').on('input', '.searchMovie', function () {
		let ajaxData ="";
		if($('input[name=movieFlt]:checked').val()==='imdbID')
		{
			ajaxData="&i="+$("#searchMovieByIMDBID").val();
		}
		else if($('input[name=movieFlt]:checked').val()==='yearAndTitle')
		{
			ajaxData="&y="+$("#searchMovieByYear").val();
			ajaxData+="&t="+$("#searchMovieByTitle").val();
		}
        $.ajax({
		    type: "get",
		    url: "http://www.omdbapi.com/?apikey=46bb6d12"+ajaxData,
		    //data: "{y: " + 2015 + "}",
		    //contentType: "application/json; charset=utf-8",
		    dataType: "json",
		    success: function(result){
		        console.log(result);
		        $("#modalBody").empty();
		        $(result).each(function(){
		        	if(this.Response!=="False")
		        	{
		        		let Poster="";
		        		let WebsiteAdd="";
		        		if(this.Poster==='N/A'||this.Poster===undefined){
		        			Poster="IMDB_Logo.png";
		        		}
		        		else
		        		{
		        			Poster=this.Poster;
		        		}
		        		if(this.Website==="N/A"||this.Website===undefined){WebsiteAdd="#"}else {WebsiteAdd=this.Website}
		        	var html=`<div class="col-md-12" style="padding-bottom: 15px">
			          <div class="MovieCard" style="border: 2px solid grey;">
			            <img class="movieImg row" src="${Poster}" alt="${this.Title}" style="width:auto;height:auto;max-width:100%;max-heigth:100%">
			            <div class="movieDetail">
			              <h4 style="font-weight: bold;">${this.Title}</h4>
			              <p>${this.Plot}</p>
			            </div>
			            <ul class="list-group list-group-flush">
			              <li class="list-group-item"><h5 style="font-weight: bold;">Genre</h5><br>${this.Title}</li>
			              <li class="list-group-item"><h5 style="font-weight: bold;">CAST</h5><br>${this.Actors}</li>
			              <li class="list-group-item"><h5 style="font-weight: bold;">Awards</h5><br>${this.Awards}</li>
			              <li class="list-group-item"><h5 style="font-weight: bold;">Genre</h5><br>${this.Released}</li>
			              <li class="list-group-item"><h5 style="font-weight: bold;">IMDB Rating</h5><br>${this.imdbRating}</li>
			              <li class="list-group-item"><h5 style="font-weight: bold;">IMDB Votes</h5><br>${this.imdbVotes}</li>
			            </ul>
			            <div class="card-body">
			              <a href="${WebsiteAdd}" class="card-link">Web Link</a>
			            </div>
			          </div>
			        </div>`;
			        $("#modalBody").append(html);
			    }
			    else
			    {
			    	$("#modalBody").append(`<h3>${this.Error} Try Again</h3>`);
			    }
		        })
		    },
		    error: function(ex){
		    	console.log(ex);
		    },
		    beforeSend: function(){
		    	$("#loading").show();
		    },
		    complete: function(){
		    	$("#loading").hide();
		    }
		});
		//console.log($(this).val().toLowerCase());
		
    });
})