import Model, { attr, hasMany } from '@ember-data/model';
import { computed } from '@ember/object';

export default Model.extend({
  name: attr('string'),
  email: attr('string'),
  groups: hasMany('group'),
  assignmentFrequency: attr('number'),
  lastAssignment: attr(),
  assignmentCount: attr('number'), // used to even out schedules
  datesUnavailable: attr({ defaultValue() { return []; } }),
  get randomSeed() {
    return Math.random();
  },
  groupsSorted: computed.sort('groups', function(a, b){
    if (a.get('name') > b.get('name')) {
      return 1;
    } else if (a.get('name') < b.get('name')) {
      return -1;
    }
    return 0;
  }),
  assignmentFrequencyPrintable: computed('assignmentFrequency', function() {
    if (this.assignmentFrequency === 0) {
      return 'As needed';
    } else {
      return `${this.assignmentFrequency} weeks`;
    }
  }),

  deleteRecord: function() {
    var self = this;

    this.groups.forEach(function(item) {
      item.get('people').removeObject(self);
      item.save();
    });

    this._super(...arguments);
  }
});
