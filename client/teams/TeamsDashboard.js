Template.TeamsDashboard.onCreated(function (){

	var self = this;

	self.autorun(function(){
		self.subscribe('teams');
		self.subscribe('persons');
	})
});

Template.TeamsDashboard.helpers({

	teams: () => {

		const coach_lookup = _getCoachIdToCoachLookup();

		let team_documents = Teams.find({});
		
		if (team_documents === undefined){
			throw new Error("teams was not defined");
		}

		// console.log("going to process the team documents");

		// console.log(team_documents);
		
		// console.log("teams count is " + team_documents.length);

		let final_team_list = [];

		team_documents.forEach(function(team){

			const coach_ids = team.coach_ids;

			console.log("coach ids:" + coach_ids);

			team.coaches = [];

			coach_ids.forEach(function(coach_set){
				
				const coach_id = coach_set.coach_id;
				const coach_role = coach_set.role;
				console.log("coach_id '" + coach_id + "' role '" + coach_role + "'");

				if (coach_lookup[coach_id] === undefined){

					throw new Error("coach_id '" + coach_id + "' does not exist in the lookup");
				}
				else {

					const coach = coach_lookup[coach_id];

					if (coach_role == 'main'){
						coach.coach_title = "Coach";
					}
					else {
						coach.coach_title = "Assistant";
					}

					team.coaches.push(coach);
				}
			});

			final_team_list.push(team);
		});

		return final_team_list;
	}
})

Template.TeamsDashboard.events({
});


function _getPersonIdToPersonLookup(){

	const person_documents = Persons.find({});

	let lookup = {};

	person_documents.forEach(function(person){

		const person_id = person.person_id;

		lookup[person_id] = person;
	});

	console.log("loaded the person lookup");

	return lookup;
}


function _getCoachIdToCoachLookup(){

	const coach_documents = Coaches.find({});

	let lookup = {};

	const person_lookup = _getPersonIdToPersonLookup();

	coach_documents.forEach(function(coach){

		const coach_id = coach.coach_id;
		
		const person_id = coach.person_id;
		
		if (person_lookup[person_id] === undefined){
			throw new Error("person_id '" + person_id + "' does not exist in the lookup");
		}
		else {

			const person_document = person_lookup[person_id];
			
			coach.first_name = person_document.first_name;
			
			coach.last_name = person_document.last_name;
			
			coach.email_address = person_document.email_address;

			coach.phone_number_1 = person_document.phone_number_1;

			coach.phone_number_2 = person_document.phone_number_2;

			lookup[coach_id] = coach;
		}
	});

	console.log("loaded the coach lookup");

	return lookup;
}