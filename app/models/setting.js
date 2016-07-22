import Model from 'ember-data/model';
import attr from 'ember-data/attr';

export default Model.extend({
  midweekMeeting: attr('number', { defaultValue: 3 }), // 0-6; 3 = Wednesday
  weekendMeeting: attr('number', { defaultValue: 0 }) // 0-6; 0 = Sunday
});
