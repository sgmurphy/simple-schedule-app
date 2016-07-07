import Model from 'ember-data/model';
import attr from 'ember-data/attr';

export default Model.extend({
  date: attr('date')
  // has many assignments
    // assignment
      // has one assignment
      // has one person
});
