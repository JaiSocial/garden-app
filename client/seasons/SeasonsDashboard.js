Template.SeasonsDashboard.onCreated(function (){

	var self = this;
	self.autorun(function(){
		self.subscribe('garden_app_seasons');
	})
});

Template.SeasonsDashboard.helpers({
	seasons: () => {
		
		let seasons = Seasons.find({});

		if (seasons === undefined){
		
			const error_msg = "seasons was not defined";
		
			console.error(error_msg);
		
			throw new Error(error_msg);
		}		

		return seasons;
	}
});

