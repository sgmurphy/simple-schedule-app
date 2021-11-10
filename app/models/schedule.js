import Model, { attr, hasMany } from '@ember-data/model';
import { computed } from '@ember/object';
import { resolve } from 'rsvp';
import moment from 'moment';

export default Model.extend({
  name: attr('string'),
  startDate: attr({ defaultValue() { return moment().add(1, 'month').startOf('month').format('YYYY-MM-DD'); } }), // Wasn't working with attr('date')
  endDate: attr({ defaultValue() { return moment().add(1, 'month').endOf('month').format('YYYY-MM-DD'); } }), // Wasn't working with attr('date')
  dates: hasMany('date'),
  assignments: attr({ defaultValue() { return []; } }), // Might want to find a better name
  notes: attr('string'),
  mailto: computed('dates.[]', 'name', 'startDate', 'endDate', function() {
    let people = [];

    this.dates.forEach(function (date) {
      date.assignments.forEach(function (assignment) {
        resolve(assignment.person).then(function (person) {
          console.log(person.name); 
        });
        // people.pushObject());
      });
    });

    console.log(people);
    people = people.uniq();

    let emails = people.getEach('email');
    console.log(emails);
    return `mailto:${emails}?subject=${this.name} (${moment(this.startDate).format('YYYY/MM/DD')}-${moment(this.endDate).format('YYYY/MM/DD')})`;
  }),
  
  deleteRecord: function() {
    this.dates.invoke('destroyRecord');

    this._super(...arguments);
  }
});
