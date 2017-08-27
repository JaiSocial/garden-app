Template.TeamsDashboard.onCreated(function (){

	var self = this;

	self.autorun(function(){
		self.subscribe('garden_app_teams');
		self.subscribe('garden_app_persons');
	})
});

Template.TeamsDashboard.helpers({

	teams: () => {

		const person_lookup = _getPersonIdToPersonLookup();

		let team_documents = Teams.find({});
		
		if (team_documents === undefined){
			throw new Error("Could not retrieve documents for teams collection");
		}

		// const team_doc_count = team_documents.length;

		// console.log("Retrieved '" + team_doc_count +"' documents from garden_app_teams");
		
		// console.log(team_documents);

		// if (team_doc_count > 0){

			let team_ctr = 0;

			team_documents.forEach(function(team){

				team_ctr++;

				const member_ids = team.member_ids;

				if (member_ids === undefined){
					throw new Error("team.member_ids is not defined for team with team_id '" + team.team_id + "'");
				}

				team.member_list = [];

				member_ids.forEach(function(id){

					if (person_lookup[id] !== undefined){
						
						const person = person_lookup[id];

						team.member_list.push(person);
					}
				});
			});

			console.log("Loaded '" + team_ctr + "' teams intothe team lookup");
		// }
		// else {
		// 	console.log("Looks like there are no documents in the garden_app_teams collection");
		// }

		return team_documents;
	}
})

Template.TeamsDashboard.events({});


function _getPersonIdToPersonLookup(){

	const person_documents = Persons.find({});

	if (person_documents === undefined){
		throw new Error("Could not retrieve documents for the persons collection");
	}

	let lookup = {};

	person_documents.forEach(function(person){

		const person_id = person.person_id;

		lookup[person_id] = person;
	});

	console.log("loaded the person lookup");

	return lookup;
}