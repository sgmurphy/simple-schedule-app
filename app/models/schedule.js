import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';

export default Model.extend({
  startDate: attr('date'),
  endDate: attr('date'),
  assignments: hasMany('assignment'),
  groupOrder: attr()
});
