import Model, { attr, hasMany } from '@ember-data/model';

export default Model.extend({
  name: attr('string'),
  people: hasMany('person'),

  deleteRecord: function() {
    var self = this;

    this.people.forEach(function(item) {
      item.get('groups').removeObject(self);
      item.save();
    });

    this._super(...arguments);
  }
});
