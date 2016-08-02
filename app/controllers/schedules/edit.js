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
      var controller = this;

      // Delete current dates first
      this.model.get('dates').invoke('destroyRecord');

      // TODO: There might be a cleaner way to do this
      this.model.save().then(function() {
        controller.generateDates();
        controller.generateAssignments();

        controller.model.save();
        controller.transitionToRoute('schedules.view', controller.model);
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
        person.save();
      });
    });

    // Loop thru schedule dates
    controller.model.get('dates').forEach(function(date) {
      // Loop thru available assignments (schedule columns)
      controller.model.get('assignments').forEach(function(availableAssignment, index, availableAssignments) {
        var group = controller.get('store').peekRecord('group', availableAssignment.group);

        //console.log(group.get('people').map(function(person) { return person.get('name'); }));
        //console.log(group.get('people').map(function(person) { return person.get('assignmentCount'); }));
        //console.log(group.get('people').map(function(person) { return person.get('lastAssignment'); }));

        // Find a person in the group that is available
        var person = group.get('people').sortBy('lastAssignment', 'sequence').find(function(person) {
          // Do they already have an assignment on this date?
          if (moment(person.get('lastAssignment')).isSame(date.get('date'))) {
            return false;
          }

          // Has enough time passed since their last assignment?
          if (moment(date.get('date')).isBefore(moment(person.get('lastAssignment')).add(person.get('assignmentFrequency'), 'weeks'))) {
            return false;
          }

          // Check if the person is unavailable
          var unavailable = person.get('datesUnavailable').any(function(item, index, enumerable) {
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
        group.save()

        if (person) {
          person.set('lastAssignment', date.get('date'));
          person.set('sequence', availableAssignments.get('length') - index);
          person.save();
        }
      });
    });
  }
});
