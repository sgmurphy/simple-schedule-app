import Model, { belongsTo } from '@ember-data/model';

export default Model.extend({
  date: belongsTo('date'),
  group: belongsTo('group'),
  person: belongsTo('person')
});
