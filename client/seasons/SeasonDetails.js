Template.SeasonDetails.onCreated(function (){

	var self = this;
	self.autorun(function(){
		self.subscribe('garden_app_seasons');
		self.subscribe('garden_app_donations');
		self.subscribe('garden_app_teams');
	})
});

Template.SeasonDetails.helpers({
	
	season: () => {
		
		const id = FlowRouter.getParam('id');

		const season_id = parseInt(id);

		let season = Seasons.findOne({"season_id": season_id});

		console.log(season);

		const team_id_lookup = _getTeamIdLookup();

		const team_ids = season.team_ids;

		console.log("Here are the team_ids for season with season_id '" + season_id + "' :" + team_ids);

		season.teams = [];

		team_ids.forEach(function(team_id){

			if (team_id_lookup[team_id] !== undefined){

				const team = team_id_lookup[team_id];

				if (team === undefined){
					throw new Error("team was not defined for team_id '" + team_id + "'");
				}

				const name = team.name;

				if (name === undefined){
					throw new Error("name was not defined for team_id '" + team_id + "'");
				}
				
				const plot_number = team.plot_number;
				
				if (plot_number === undefined){
					throw new Error("plot_number was not defined for team_id '" + team_id + "'");
				}
			
				const donation_sum = team.donations;

				if (donation_sum === undefined){
					throw new Error("donation_sum was not defined for team_id '" + team_id + "'");
				}


				season.teams.push({
					"name"        : name,
					"team_id"     : team_id,
					"plot_number" : plot_number,
					"donations"   : donation_sum
				});		
			}
			else {
				throw new Error("team_id '" + team_id + "' does not exist in the team lookup");
			}
		});

		// season.teams = _getSeasonTeams(season_id);

		return season;
	}
});


function _getDonationIdLookup(){

	const donation_documents = Donations.find({});

	if (donation_documents === undefined){
		throw new Error("Could not retrieve documents for the donations collection");
	}

	let lookup = {};

	donation_documents.forEach(function(donation){

		const donation_id = donation.donation_id;

		lookup[donation_id] = donation;
	});

	console.log("loaded the donation lookup");

	return lookup;
}


function _getTeamIdLookup(){

	const donation_lookup = _getDonationIdLookup();

	/*----------------------------------------------- 
		Retrieve the team documents 
	-----------------------------------------------*/
	// const team_documents = Teams.find({}, {"plot_number": 1, "name": 1, "_id": 0});
	const team_documents = Teams.find();

	if (team_documents === undefined){
		throw new Error("Could not retrieve documents for the teams collection");
	}

	let team_lookup = {};

	/*------------------------------------------------ 
		Build the team_id to team name lookup 
	------------------------------------------------*/
	team_documents.forEach(function(team){
		
		const team_id  = team.team_id;
		
		const donation_ids = team.donation_ids;

		console.log("team with team_id '" + team_id + "' has the following donation_ids '" + donation_ids);

		let donation_weight_sum = 0;

		donation_ids.forEach(function(donation_id){

			console.log("donation_id '" + donation_id + "'");

			if (donation_lookup[donation_id] !== undefined){
				const donation = donation_lookup[donation_id];
				const weight = donation.weight;
				donation_weight_sum += weight;
			}
		});


		console.log("Donation sum is '" + donation_weight_sum + "' for team with team_id '" + team_id + "'");

		team.donations = donation_weight_sum;

		team_lookup[team_id] = team;


	});

	console.log("loaded team lookup");

	return team_lookup;
}


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