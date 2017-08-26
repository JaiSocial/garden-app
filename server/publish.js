Meteor.publish('garden_app_teams', function (){
	return Teams.find({});
});

Meteor.publish('garden_app_seasons', function (){
	return Seasons.find({});
});

Meteor.publish('garden_app_persons', function (){
	return Persons.find({});
});

Meteor.publish('garden_app_donations', function (){
	return Donations.find({});
});

Meteor.publish('garden_app_plants', function (){
	return Plants.find({});
});