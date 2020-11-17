import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { hasMany } from 'ember-data/relationships';
import moment from 'moment';

export default Model.extend({
  name: attr('string'),
  startDate: attr({ defaultValue() { return moment().add(1, 'month').startOf('month').format('YYYY-MM-DD'); } }), // Wasn't working with attr('date')
  endDate: attr({ defaultValue() { return moment().add(1, 'month').endOf('month').format('YYYY-MM-DD'); } }), // Wasn't working with attr('date')
  dates: hasMany('date', { cascadeDelete: true }),
  assignments: attr({ defaultValue() { return []; } }), // Might want to find a better name
  notes: attr('string')
});
