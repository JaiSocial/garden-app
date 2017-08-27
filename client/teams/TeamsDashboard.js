Template.TeamsDashboard.onCreated(function (){

	var self = this;

	self.autorun(function(){
		self.subscribe('garden_app_teams');
		self.subscribe('garden_app_donations');
	})
});

Template.TeamsDashboard.helpers({

	teams: () => {
		
		let team_documents = Teams.find({});
		
		if (team_documents === undefined){
			throw new Error("Could not retrieve documents for teams collection");
		}


		let team_list = [];

		team_documents.forEach(function(team){

			const team_id = team.team_id;

			const donation_sum = _get_donation_sum_by_team_id(team_id);

			if (donation_sum === undefined){
			
				const error_msg = "donation_sum was not defined";
			
				console.error(error_msg);
			
				throw new Error(error_msg);
			}		

			team.donation_sum = donation_sum;

			team_list.push(team);
		});

		return team_list;
	}
});

function _get_donation_sum_by_team_id(team_id){

	if (team_id === undefined){
	
		const error_msg = "team was not defined";
	
		console.error(error_msg);
	
		throw new Error(error_msg);
	}		

	const donations = Donations.find({"team_id" : team_id}, {"weight" : 1, "_id" : 0});

	let donation_sum = 0;

	donations.forEach(function(donation){

		donation_sum += donation.weight;
	});

	return donation_sum;
}

Template.TeamsDashboard.events({});