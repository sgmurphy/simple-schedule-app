import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { hasMany } from 'ember-data/relationships';

export default Model.extend({
  name: attr('string'),
  people: hasMany('person'),

  deleteRecord: function() {
    var self = this;

    this.get('people').forEach(function(item) {
      item.get('groups').removeObject(self);
      item.save();
    });

    this._super(...arguments);
  }
});
