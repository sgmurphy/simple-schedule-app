import Model, { attr, belongsTo, hasMany } from '@ember-data/model';

export default Model.extend({
  schedule: belongsTo('schedule'),
  date: attr(),
  assignments: hasMany('assignment'),

  deleteRecord: function() {
    this.assignments.invoke('destroyRecord');

    this._super(...arguments);
  }
});
