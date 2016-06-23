import Model from 'ember-data/model';
import attr from 'ember-data/attr';

export default Model.extend({
  midweek_meeting: attr('string'),
  weekend_meeting: attr('string')
});
