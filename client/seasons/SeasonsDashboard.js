Template.SeasonsDashboard.onCreated(function (){

	var self = this;
	self.autorun(function(){
		self.subscribe('garden_app_seasons');
	})
});

Template.SeasonsDashboard.helpers({
	seasons: () => {
		return Seasons.find({});
	}
});