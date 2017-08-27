Template.SeasonDetails.onCreated(function (){

	var self = this;
	self.autorun(function(){
		self.subscribe('garden_app_seasons');
		self.subscribe('garden_app_donations');
		self.subscribe('garden_app_teams');
	})
});


let _team_id_to_donation_sum_lookup = {};

Template.SeasonDetails.helpers({
	
	season: () => {

		const id = FlowRouter.getParam('id');

		season_id = parseInt(id);

		let season = _get_season_by_season_id(season_id);

		const team_list = _get_team_list_by_season(season);

		season.team_list = team_list;

		return season;
	}

		// _load_team_id_to_donation_sum_lookup_by_season_id(season_id);
		


		// const team_id_lookup = _get_team_id_lookup_by_season_id(season_id);

		// const team_ids = season.team_ids;





		// console.log("Here are the team_ids for season with season_id '" + season_id + "' :" + team_ids);

		// season.teams = [];

		// team_ids.forEach(function(team_id){

		// 	if (team_id_lookup[team_id] !== undefined){

		// 		const team = team_id_lookup[team_id];

		// 		if (team === undefined){
		// 			throw new Error("team was not defined for team_id '" + team_id + "'");
		// 		}

		// 		const name = team.name;

		// 		if (name === undefined){
		// 			throw new Error("name was not defined for team_id '" + team_id + "'");
		// 		}
				
		// 		const plot_number = team.plot_number;
				
		// 		if (plot_number === undefined){
		// 			throw new Error("plot_number was not defined for team_id '" + team_id + "'");
		// 		}
			
		// 		const donation_sum = _get_donation_sum_by_team_id(team_id);

		// 		season.teams.push({
		// 			"name"         : name,
		// 			"team_id"      : team_id,
		// 			"plot_number"  : plot_number,
		// 			"donation_sum" : donation_sum
		// 		});		
		// 	}
		// 	else {
		// 		throw new Error("team_id '" + team_id + "' does not exist in the team lookup");
		// 	}
		// });

		// season.teams = _getSeasonTeams(season_id);

		// return season;
	// }
});

function _get_team_list_by_season(season){

	const team_id_list = season.team_ids;

	let team_list = [];

	team_id_list.forEach(function(team_id){

		let team = Teams.findOne({"team_id" : team_id}, {"name": 1, "plot_number" : 1, "team_id" : 1, "_id" : 0});

		if (team === undefined){
		
			const error_msg = "team was not defined for team_id '"  + team_id + "'";
		
			console.error(error_msg);
		
			throw new Error(error_msg);
		}		

		team.donation_sum = _get_donation_sum_by_team(team);

		team_list.push(team);
	});

	return team_list;
}


function _get_season_by_season_id(season_id){

	if (season_id === undefined){

		const id = FlowRouter.getParam('id');

		season_id = parseInt(id);
	}

	let season = Seasons.findOne({"season_id": season_id}, {"_id" : 0});

	if (season === undefined){

		const error_msg = "season was not defined for season_id '" + season_id + "'";

		console.error(error_msg);

		throw new Error(error_msg);
	}		

	console.log(season);

	return season;
}

function _get_donation_sum_by_team(team){

	if (team === undefined){
	
		const error_msg = "team was not defined";
	
		console.error(error_msg);
	
		throw new Error(error_msg);
	}		

	const donation_ids = team.donation_ids;

	let donation_sum = 0;

	if ((donation_ids !== undefined) && (donation_ids.length > 0)){

		donation_ids.forEach(function(donation_id){

			const donation = Donations.findOne({"donation_id" : donation_id}, {"weight" : 1, "_id" : 0});

			if (donation === undefined){
			
				const error_msg = "donation was not defined for donation_id '" + donation_id + "'";
			
				console.error(error_msg);
			
				// throw new Error(error_msg);			
			}		
			else {
				donation_sum += donation.weight;
			}
		});
	}

	return donation_sum;
}




// 	if (_team_id_to_donation_sum_lookup[team_id] !== undefined){

// 		donation_sum = _team_id_to_donation_sum_lookup[team_id];

// 		if (donation_sum === undefined){
// 			throw new Error("donation_sum was not defined for team_id '" + team_id + "'");
// 		}
// 	}
// 	else {
// 		console.log("team_id '" + team_id + "' does not exist in the _team_id_to_donation_sum_lookup");
// 	}

// 	return donation_sum;
// }



// function _load_team_id_to_donation_sum_lookup(season_id){


// 	let _team_id_to_donation_sum_lookup = {};

// 	let team_id_list = _get_team_id_list_by_season_id(season_id);


// 	team_id_list.forEach(function(team_id){

// 		let team = _get_team_by_team_id(team_id);

// 		const donation_id_list = team.donation_id

// 	});


// 	_getDonationIdLookup();
// }


// function _getDonationIdLookup(){

// 	const donation_documents = Donations.find({});

// 	if (donation_documents === undefined){
// 		throw new Error("Could not retrieve documents for the donations collection");
// 	}

// 	let lookup = {};

// 	donation_documents.forEach(function(donation){

// 		const donation_id = donation.donation_id;

// 		lookup[donation_id] = donation;
// 	});

// 	console.log("loaded the donation lookup");

// 	return lookup;
// }


// function _getTeamIdLookup(season_id){

// 	// const donation_lookup = _getDonationIdLookup();

// 	/*----------------------------------------------- 
// 		Retrieve the team documents for this season
// 	-----------------------------------------------*/
// 	const team_documents = Teams.find({"season_id" : season_id}, {"plot_number": 1, "name": 1, "_id": 0});
// 	// const team_documents = Teams.find({"season_id" : season_id});

// 	if (team_documents === undefined){
// 		throw new Error("Could not retrieve documents for the teams collection");
// 	}

// 	let team_lookup = {};

// 	/*------------------------------------------------ 
// 		Build the team_id to team name lookup 
// 	------------------------------------------------*/
// 	team_documents.forEach(function(team){
		
// 		const team_id  = team.team_id;

// 		team.donations = _getDonationSumByTeamId(team_id);

// 		team_lookup[team_id] = team;

// 	});

// 	console.log("loaded team lookup");

// 	return team_lookup;
// }

// function _getDonationSumByTeamId(team_id){

// 	if (team_id === undefined){
	
// 		const error_msg = "team_id was not defined";
	
// 		console.error(error_msg);
	
// 		throw new Error(error_msg);
// 	}		

// 	const team = _getTeamByTeamId(team_id);

// 	if (team === undefined){
	
// 		const error_msg = "team was not defined for team_id '" + team_id + "'";
	
// 		console.error(error_msg);
	
// 		throw new Error(error_msg);
// 	}		

// 	return _getDonationSumByTeam(team);
// }


// function _getDonationSumByTeam(team){

// 	if (team === undefined){
	
// 		const error_msg = "team was not defined";
	
// 		console.error(error_msg);
	
// 		throw new Error(error_msg);
// 	}		

// 	const team_id = team.team_id;

// 	let donation_weight_sum = 0;

// 	const donation_ids = team.donation_ids;

// 	if ((donation_ids !== undefined) && (donation_ids.length > 0)){

// 		console.log("team with team_id '" + team_id + "' has the following donation_ids '" + donation_ids);

// 		donation_ids.forEach(function(donation_id){

// 			console.log("donation_id '" + donation_id + "'");

// 			if (donation_lookup[donation_id] !== undefined){
			
// 				const donation = donation_lookup[donation_id];
			
// 				const weight = donation.weight;
			
// 				donation_weight_sum += weight;
// 			}
// 		});


// 	console.log("Donation sum is '" + donation_weight_sum + "' for team with team_id '" + team_id + "'");

// 		team.donations = donation_weight_sum;



// function _getDonationSumByDonationIds(donation_ids){


// 	let donation_weight_sum = 0;

// 	donation_ids.forEach(function(donation_id){

// 		console.log("donation_id '" + donation_id + "'");

// 		if (donation_lookup[donation_id] !== undefined){
// 			const donation = donation_lookup[donation_id];
// 			const weight = donation.weight;
// 			donation_weight_sum += weight;
// 		}
// 	});


// 	return donation_weight_sum;
// }

// function _getSeasonTeams(season_id){

// 	const team_lookup = _getTeamIdLookup();


// 	game_documents.forEach(function(game){

// 		if (team_lookup[game.home_team_id] === undefined){
// 			throw new Error("home team id '" + game.home_team_id + "' does not exist in the team lookup");
// 		}

// 		const home_team_name = team_lookup[game.home_team_id];
	

// 		if (team_lookup[game.away_team_id] === undefined){
// 			throw new Error("away team id '" + game.away_team_id + "' does not exist in the team lookup");
// 		}

// 		const away_team_name = team_lookup[game.away_team_id];

// 		if (location_lookup[game.location_id] === undefined){
// 			throw new Error("location id '" + game.location_id + "' does not exist in the location lookup");
// 		}

// 		const location_name = location_lookup[game.location_id];


// 		let new_game = {
// 			"home_team_name" : home_team_name,
// 			"away_team_name" : away_team_name,
// 			"home_team_id" : game.home_team_id,
// 			"away_team_id" : game.away_team_id,
// 			"date" : game.date,
// 			"location_id" : game.location_id,
// 			"location_name" : location_name
// 		};

// 		game_list.push(new_game);

// 		game_ctr++;

// 	});

// 	console.log("loaded game list (" + game_ctr + " records)");

// 	return game_list;
// }