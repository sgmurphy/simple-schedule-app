import Ember from 'ember';
import moment from 'moment';

export default Ember.Controller.extend({
  actions: {
    addAssignment() {
      this.model.get('assignments').pushObject({name: null, group: null});
    },
    save() {
      this.model.save();
      this.transitionToRoute('schedules.view', this.model);
    },
    saveAndRebuild() {
      // Delete current dates first
      this.model.get('dates').invoke('destroyRecord');

      this.generateDates();
      this.generateAssignments();

      this.model.save();
      this.transitionToRoute('schedules.view', this.model);
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

    // Loop thru schedule dates
    controller.model.get('dates').forEach(function(date) {
      // Loop thru available assignments (schedule columns)
      controller.model.get('assignments').forEach(function(availableAssignment) {
        var group = controller.get('store').peekRecord('group', availableAssignment.group);

        // Find a person in the group that is available
        var person = group.get('people').sortBy('lastAssignment').find(function(person) {
          // Check if the person is available
          return true;
        });

        // Create assignment
        controller.get('store').createRecord('assignment', {
          date: date,
          group: group,
          person: person
        }).save();

        if (person) {
          //person.set('lastAssignment', date.date);
          //person.save();
        }
      });
    });
  }
});
