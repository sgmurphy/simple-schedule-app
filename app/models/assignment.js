import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

export default Model.extend({
  schedule: belongsTo('schedule'),
  date: attr('date'),
  group: belongsTo('group'),
  person: belongsTo('person')
});
