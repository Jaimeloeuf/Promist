'use strict'; // Enforce use of strict verion of JavaScript

// Since promise is a reserved keyword, I will use promist here instead
export default class Promist {
	constructor(title, description, reminder, fwoh={}) {
		this.date = Date.now(); // Determine date/time format
		this.title = title; // Set title

		/* @Ques for self
		Can a contructor in Javascript return a value?
		Because if I do checking here and relise the user inputted crap, I want to be
		able to reject it and ask the user to input again. Which I will need to either
		do by rejecting val here and somehow call new_promist.js screen agn using
		smth like a while loop with a semi-colon. Or I can add input checking and
		sanitization code into the UI screen code. Which will feel weird in the architecture */

		setDescription(description);
		set5W1H(fwoh);
		if(!reminder)
			setReminder(reminder);
	}

	/* A Promist object should contain a
	who, what, when, where, why, how, as part of its state.
	Which will be defined in a object called fwoh or 5W1H */

	setReminder(reminder) {
		// set a call back that will call me at a set time?

		// Should the reminder thing be an object?

		const currentTime = Date.now();
		if (reminder.time < currentTime) // If reminder due time is set before the current time
			throw error;
		else
			setTimeout(callback, reminder.time)
	}

	setDescription(description) {

	}

	setState(state) {
		this.state = state; // Update the completion state of the promise
		// State can be 1) pending 2) fulfilled 3) archived. Meaning fulfilled and not in search anymore unless searching thur archive

		// Check if state is fulfilled. If it is, automatically archive it.
		// Check if archived without setting fulfilled val
		// for both of the 2 abv checks, if true, turn off the reminder.
		// Turn off the alarm by calling setReminder(0).

		// So total thr are 2 booleans to keep track of the state of a Promise.
		// 1 to determine if fulfilled, 1 to determine if archived.
	}
	
}