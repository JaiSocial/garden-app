if (Meteor.isClient){
	Accounts.onLogin(function(){
		FlowRouter.go('seasons-dashboard');	
	});

	Accounts.onLogout(function(){
		FlowRouter.go('home');	
	});
}


FlowRouter.triggers.enter([function(context, redirect){
	if (! Meteor.userId()){
		FlowRouter.go('home');
	}
}]);

FlowRouter.route('/', {
	name : 'home',
	action(){
		if (Meteor.userId()){
			FlowRouter.go('seasons-dashboard');
		}
		BlazeLayout.render('HomeLayout');
	}
});

FlowRouter.route('/seasons-dashboard', {
	name : 'seasons-dashboard',
	action(){
		BlazeLayout.render('MainLayout', {main:"SeasonsDashboard"});
	}
});

FlowRouter.route('/teams-dashboard', {
	name : 'teams-dashboard',
	action(){
		BlazeLayout.render('MainLayout', {main:"TeamsDashboard"});
	}
});

FlowRouter.route('/season/:id', {
	name : 'season',
	action(){
		BlazeLayout.render('MainLayout', {main:"SeasonDetails"});
	}
});

FlowRouter.route('/team/:id', {
	name : 'team',
	action(){
		BlazeLayout.render('MainLayout', {main:"TeamDetails"});
	}
});