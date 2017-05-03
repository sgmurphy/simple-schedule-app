import Ember from 'ember';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { hasMany } from 'ember-data/relationships';

export default Model.extend({
  name: attr('string'),
  email: attr('string'),
  groups: hasMany('group'),
  assignmentFrequency: attr('number'),
  lastAssignment: attr(),
  assignmentCount: attr('number'), // used to even out schedules
  datesUnavailable: attr({ defaultValue() { return []; } }),
  randomSeed: Ember.computed(function() {
    return Math.random();
  }).volatile(),
  groupsSorted: Ember.computed.sort('groups', function(a, b){
    if (a.get('name') > b.get('name')) {
      return 1;
    } else if (a.get('name') < b.get('name')) {
      return -1;
    }
    return 0;
  }),
  assignmentFrequencyPrintable: Ember.computed('assignmentFrequency', function() {
    if (this.get('assignmentFrequency') === 0) {
      return 'As needed';
    } else {
      return `${this.get('assignmentFrequency')} weeks`;
    }
  }),

  deleteRecord: function() {
    var self = this;

    this.get('groups').forEach(function(item) {
      item.get('people').removeObject(self);
      item.save();
    });

    this._super(...arguments);
  }
});
