import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';

export default Model.extend({
  name: attr('string'),
  startDate: attr(), // Wasn't working with attr('date')
  endDate: attr(), // Wasn't working with attr('date')
  dates: hasMany('date'),
  groupOrder: attr()
});
