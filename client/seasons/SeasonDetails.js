Template.SeasonDetails.onCreated(function (){

	var self = this;
	self.autorun(function(){
		self.subscribe('seasons');
		self.subscribe('donations');
		self.subscribe('teams');
	})
});

Template.SeasonDetails.helpers({
	
	season: () => {
		
		const id = FlowRouter.getParam('id');

		const season_id = parseInt(id);

		let season = Seasons.findOne({"season_id": season_id});

		season.teams = _getSeasonTeams(season_id);

		return season;
	}
});


function _getTeamIdToNameLookup(){

	/*----------------------------------------------- 
		Retrieve the team documents 
	-----------------------------------------------*/
	const team_documents = Teams.find({});

	let team_lookup = {};

	/*------------------------------------------------ 
		Build the team_id to team name lookup 
	------------------------------------------------*/
	team_documents.forEach(function(team){
		
		const team_id  = team.team_id;
		
		const team_name = team.name;
		
		team_lookup[team_id] = team_name;
	});


	console.log("loaded team lookup");

	return team_lookup;
}


function _getSeasonTeams(season_id){

	const team_lookup = _getTeamIdToNameLookup();

	const game_documents = Games.find({});

	let game_list = [];
	
	let game_ctr = 0;

	game_documents.forEach(function(game){

		if (team_lookup[game.home_team_id] === undefined){
			throw new Error("home team id '" + game.home_team_id + "' does not exist in the team lookup");
		}

		const home_team_name = team_lookup[game.home_team_id];
	

		if (team_lookup[game.away_team_id] === undefined){
			throw new Error("away team id '" + game.away_team_id + "' does not exist in the team lookup");
		}

		const away_team_name = team_lookup[game.away_team_id];

		if (location_lookup[game.location_id] === undefined){
			throw new Error("location id '" + game.location_id + "' does not exist in the location lookup");
		}

		const location_name = location_lookup[game.location_id];


		let new_game = {
			"home_team_name" : home_team_name,
			"away_team_name" : away_team_name,
			"home_team_id" : game.home_team_id,
			"away_team_id" : game.away_team_id,
			"date" : game.date,
			"location_id" : game.location_id,
			"location_name" : location_name
		};

		game_list.push(new_game);

		game_ctr++;

	});

	console.log("loaded game list (" + game_ctr + " records)");

	return game_list;
}