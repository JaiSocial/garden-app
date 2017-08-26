Template.SeasonsDashboard.onCreated(function (){

	var self = this;
	self.autorun(function(){
		self.subscribe('seasons');
	})
});

Template.SeasonsDashboard.helpers({
	seasons: () => {
		return Seasons.find({});
	}
});