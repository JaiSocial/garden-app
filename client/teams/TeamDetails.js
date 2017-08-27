Template.TeamDetails.onCreated(function (){

	var self = this;

	self.autorun(function(){
		// self.subscribe('garden_app_plants');
		self.subscribe('garden_app_donations');
		self.subscribe('garden_app_teams');
		self.subscribe('garden_app_persons');
	});

	console.log("In TeamDetails.onCreated method");
});


Template.TeamDetails.helpers({
	
	team: () => {

		const id = FlowRouter.getParam('id');

		console.log("id : " + id);

		const team_id = parseInt(id);

		console.log("team_id : " + team_id);

		let team = _get_team_by_team_id(team_id);

		console.log("team : "  + team);

		const member_list = _get_person_list_by_team(team);

		team.member_list = member_list;

		const donation_list = _get_donation_list_by_team(team);

		team.donation_list = donation_list;

		// const plant_list = _get_plant_list_by_team(team) ;

		// team.plant_list = plant_list;

		return team;
	}
});

function _get_team_by_team_id(team_id){

	if (team_id === undefined){
	
		const error_msg = "team_id was not defined";
	
		console.error(error_msg);
	
		throw new Error(error_msg);
	}		

	const team = Teams.findOne({"team_id" : team_id});

	if (team === undefined){
	
		const error_msg = "team was not defined for team_id '" + team_id + "'";
	
		console.error(error_msg);
	
		throw new Error(error_msg);
	}		

	return team;
}


function _get_donation_list_by_team(team){

	const donation_id_list = team.donation_ids;

	const team_id = team.team_id;
	
	let donation_list = [];

	donation_id_list.forEach(function(donation_id){

		let donation = Donations.findOne({"donation_id" : donation_id}, {"_id" : 0});

		if (donation === undefined){
		
			const error_msg = "donation was not defined for donation_id '" + donation_id + "' while processing team with team_id '"  + team_id + "'";
		
			console.error(error_msg);
		
			throw new Error(error_msg);
		}
		else {

			donation_list.push(donation);
		}
	});

	return donation_list;
}

function _get_person_list_by_team(team){

	const person_id_list = team.member_ids;

	let person_list = [];

	const team_id = team.team_id;

	person_id_list.forEach(function(person_id){

		person_id = parseInt(person_id);

		let person = Persons.findOne({"person_id" : person_id}, {"_id" : 0});

		if (person === undefined){
		
			const error_msg = "person was not defined for person_id '" + person_id + "' while processing team with team_id '"  + team_id + "'";
		
			console.error(error_msg);
		
			throw new Error(error_msg);
		}
		else {

			person_list.push(person);
		}
	});

	return person_list;
}

function _get_plant_list_by_team(team){

	const plant_id_list = team.plant_ids;

	const team_id = team.team_id;
	
	let plant_list = [];

	plant_id_list.forEach(function(plant_id){

		let plant = Plants.findOne({"plant_id" : plant_id}, {"_id" : 0});

		if (plant === undefined){
		
			const error_msg = "plant was not defined for plant_id '" + plant_id + "' while processing team with team_id '"  + team_id + "'";
		
			console.error(error_msg);
		
			throw new Error(error_msg);
		}
		else {

			plant_list.push(plant);
		}
	});

	return plant_list;
}

Template.TeamDetails.events({});