


// Since promise is a reserved keyword, I will use promist here instead
class Promist {
	constructor(promist, description) {
		this.date = Date(); // See how to do date
		this.promist = promist;
	}

	updateDescription() {

	}

	updateState(state) {
		this.state = state; // Update the completion state of the promise
		// State can be 1) pending 2) fulfilled 3) archived. Meaning fulfilled and not in search anymore unless searching thur archive
	}

	
}

// Start learning git with this project