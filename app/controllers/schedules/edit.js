import Ember from 'ember';
import moment from 'moment';

export default Ember.Controller.extend({
  actions: {
    addAssignment() {
      this.model.get('assignments').pushObject({name: null, group: null});
    },
    save() {
      var controller = this;

      return this.model.save().then(function() {
        controller.transitionToRoute('schedules.view', controller.model);
      });
    },
    saveAndRebuild() {
      var controller = this;

      return new Ember.RSVP.Promise(function(resolve, reject) {
        // Delete current dates first
        controller.model.get('dates').invoke('destroyRecord');

        // TODO: There might be a cleaner way to do this
        controller.model.save().then(function() {
          controller.generateDates();
          controller.generateAssignments();

          controller.model.save().then(function() {
            controller.transitionToRoute('schedules.view', controller.model);
            resolve();
          }, function(reason) {
            reject(reason);
          });
        }, function(reason) {
          reject(reason);
        });
      });
    },
    cancel() {
      window.history.back();
    }
  },
  generateDates() {
    var date = moment(this.model.get('startDate'));

    // Loop through days between startDate and endDate
    while (date.isSameOrBefore(this.model.get('endDate'))) {
      // Check if current date matches a meeting day
      if (date.day() === this.settings.get('midweekMeeting') || date.day() === this.settings.get('weekendMeeting')) {
        // Create a new date model and attach it to this schedule
        this.get('store').createRecord('date', {
          schedule: this.model,
          date: date.format('YYYY-MM-DD')
        }).save();
      }

      date.add(1, 'days');
    }
  },
  generateAssignments() {
    var controller = this;

    // TODO: Fix this hack. Resets lastAssignment dates for everyone so rebuilding
    // schedules will work.
    controller.store.findAll('person').then(function(people) {
      people.forEach(function(person) {
        person.set('lastAssignment', null);
        person.set('assignmentCount', 0);
        person.save();
      });
    });

    // Loop thru schedule dates
    controller.model.get('dates').forEach(function(date) {
      // Loop thru available assignments (schedule columns)
      controller.model.get('assignments').forEach(function(availableAssignment) {
        var group = controller.get('store').peekRecord('group', availableAssignment.group);

        var sortedPeople = group.get('people').sortBy('randomSeed').sortBy('lastAssignment', 'assignmentCount');

        console.log(sortedPeople.map(function(person) { return `${person.get('name')}:${person.get('assignmentCount')}`; }));

        // Find a person in the group that is available
        var person = sortedPeople.find(function(person) {
          // Do they already have an assignment on this date?
          if (moment(person.get('lastAssignment')).isSame(date.get('date'))) {
            return false;
          }

          // Has enough time passed since their last assignment?
          if (moment(date.get('date')).isBefore(moment(person.get('lastAssignment')).add(person.get('assignmentFrequency'), 'weeks'))) {
            return false;
          }

          // Check if the person is unavailable
          var unavailable = person.get('datesUnavailable').any(function(item) {
            if (moment(item.date).isSame(date.get('date'))) {
              return true;
            }
            return false;
          });

          return !unavailable;
        });

        console.log(date.get('date'), group.get('name'), person.get('name'));

        // Create assignment
        controller.get('store').createRecord('assignment', {
          date: date,
          group: group,
          person: person
        }).save();

        date.save();
        group.save();

        if (person) {
          person.set('lastAssignment', date.get('date'));
          person.incrementProperty('assignmentCount');
          person.save();
        }
      });
    });
  }
});
