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
        person.set('assignmentCount', 0)
        person.save();
      });
    });
    // Sort availableAssignment by group size
    var groupsSorted = controller.model.get('assignments').toArray().sort(function(a, b) {
      var groupA = controller.get('groups').findBy('id', a.group).get('people').get('length');
      var groupB = controller.get('groups').findBy('id', b.group).get('people').get('length');
      return groupA - groupB;
    });
    //Log groupsSorted to console
    console.log(groupsSorted.map(function(group) {
        return group.name;
    }));
    // Loop thru schedule dates
    controller.model.get('dates').forEach(function(date) {
      // Loop thru available assignments (schedule columns)
      groupsSorted.forEach(function(availableAssignment, index, availableAssignments) {
        var group = controller.get('store').peekRecord('group', availableAssignment.group);
        console.log(group.get('people').sortBy('assignmentCount', 'lastAssignment').map(function(person) { return person.get('name'); }));
        console.log(group.get('people').sortBy('assignmentCount', 'lastAssignment').map(function(person) { return person.get('assignmentCount'); }));
        console.log(group.get('people').sortBy('assignmentCount', 'lastAssignment').map(function(person) { return person.get('lastAssignment'); }));
        // Find a person in the group that is available
        var person = group.get('people').sortBy('assignmentCount', 'lastAssignment').find(function(person) {
          // Check if the person is available

          // Do they already have an assignment on this date?
          if (moment(person.get('lastAssignment')).isSame(date.get('date'))) {
            console.log(person.get('name') + ' already has an assignment on ' + date.get('date'));
            return false;
          }
          return true;
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
          person.incrementProperty('assignmentCount');
          person.save();
        }
      });
    });
  }
});
