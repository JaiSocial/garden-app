Teams       = new Mongo.Collection('garden_app_teams');
Seasons     = new Mongo.Collection('garden_app_seasons');
Persons     = new Mongo.Collection('garden_app_persons');
Donations   = new Mongo.Collection('garden_app_donations');
Plants      = new Mongo.Collection('garden_app_plants');


Teams.allow({
	insert: function(userId, doc){
		return !!userId;
	},
	update: function (userId, doc){
		return !!userId;
	}
});

Seasons.allow({
	insert: function(userId, doc){
		return !!userId;
	},
	update: function (userId, doc){
		return !!userId;
	}
});

Persons.allow({
	insert: function(userId, doc){
		return !!userId;
	},
	update: function (userId, doc){
		return !!userId;
	}
});

Donations.allow({
	insert: function(userId, doc){
		return !!userId;
	},
	update: function (userId, doc){
		return !!userId;
	}
});

Plants.allow({
	insert: function(userId, doc){
		return !!userId;
	},
	update: function (userId, doc){
		return !!userId;
	}
});

SeasonSchema = new SimpleSchema({
	season_id: {
		type : Number,
		label : 'Season ID'
	},
	name: {
		type : String,
		label : 'Name'
	},
	desc: {
		type : String,
		label : 'Description'
	},
	start_year: {
		type : Number,
		label : 'Start Year'
	},
	end_year: {
		type : Number,
		label : 'End Year'
	},
	start_month: {
		type : Number,
		label : 'Start Month'
	},
	end_month: {
		type : Number,
		label : 'End Month'
	}
});

Seasons.attachSchema( SeasonSchema );


PersonSchema = new SimpleSchema({
	person_id : {
		type : Number,
		label : 'Person ID'
	},
	first_name : {
		type : String,
		label : 'First Name'
	},
	last_name : {
		type : String,
		label : 'Last Name'
	},
	phone_number_1 : {
		type : String,
		label : 'Phone Number 1'
	},
	phone_number_2 : {
		type : String,
		label : 'Phone Number 2'
	},
	email_address : {
		type : String,
		label : 'Email Address'
	},
	role : {
		type : String,
		label: 'Role'
	},
	is_obsolete: {
		type: Boolean,
		label: 'Obsolete',
		defaultValue: false
	},
	team_id : {
		type : Number,
		label: "Team ID"
	}
});


Persons.attachSchema ( PersonSchema );

DonationSchema = new SimpleSchema({
	donation_id : {
		type : Number,
		label : 'Donation ID'
	},
	desc : {
		type : String,
		label : 'Description'
	},
	weight : {
		type : Number,
		label : 'Weight'
	},
	quantity : {
		type : Number,
		label : 'Quantity'
	},
	date : {
		type : String,
		label : 'Date'
	},
	team_id : {
		type : Number,
		label : 'Team ID'
	}
});

Donations.attachSchema ( DonationSchema );


PlantSchema = new SimpleSchema({
	plant_id : {
		type : Number,
		label : 'Plant ID'
	},
	name : {
		type : String,
		label : 'Name'
	},
	desc : {
		type : String,
		label : 'Description'
	}
});

Plants.attachSchema ( PlantSchema );

TeamsSchema = new SimpleSchema({
	team_id: {
		type : Number,
		label : 'Team ID'
	},
	name: {
		type: String,
		label : 'Name'
	},
	season_id : {
		type : Number,
		label : 'Season ID'
	},
	plant_ids: {
		type : [Number]
	}
});

Teams.attachSchema( TeamsSchema );