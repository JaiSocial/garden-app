Template.TeamsDashboard.onCreated(function (){

	var self = this;

	self.autorun(function(){
		self.subscribe('garden_app_teams');
	})
});

Template.TeamsDashboard.helpers({

	teams: () => {
		
		let team_documents = Teams.find({});
		
		if (team_documents === undefined){
			throw new Error("Could not retrieve documents for teams collection");
		}

		return team_documents;
	}
})

Template.TeamsDashboard.events({});