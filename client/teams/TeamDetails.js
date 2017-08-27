Template.TeamDetails.onCreated(function (){

	var self = this;

	self.autorun(function(){
		self.subscribe('garden_app_plants');
		self.subscribe('garden_app_donations');
		self.subscribe('garden_app_teams');
		self.subscribe('garden_app_persons');
	});

	console.log("In TeamDetails.onCreated method");
});


Template.TeamDetails.helpers({
	
	team: () => {

		const id = FlowRouter.getParam('id');

		const team_id = parseInt(id);

		let team = _get_team_by_team_id(team_id);

		team.member_list = _get_person_list_by_team_id(team_id);

		team.donation_list = _get_donation_list_by_team_id(team_id);

		team.plant_list = _get_plant_list_by_team_id(team_id);

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


function _get_donation_list_by_team_id(team_id){

	const donations = Donations.find({"team_id" : team_id}, {"_id" : 0});

	return donations;	
}

function _get_person_list_by_team_id(team_id){

	const persons = Persons.find({"team_id" : team_id}, {"_id" : 0});

	return persons;
}

function _get_plant_list_by_team_id(team_id){

	const plants = Plants.find({"team_id": team_id}, {"_id" : 0});

	return plants;
}

Template.TeamDetails.events({});