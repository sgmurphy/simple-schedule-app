import Model from 'ember-data/model';
import { belongsTo } from 'ember-data/relationships';

export default Model.extend({
  date: belongsTo('date'),
  group: belongsTo('group'),
  person: belongsTo('person')
});
