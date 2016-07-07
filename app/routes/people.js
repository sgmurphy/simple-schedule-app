import Ember from 'ember';

var people = [{
  id: 1,
  name: 'Sean Murphy',
  assignmentFrequency: 1,
  lastAssignment: '01/01/2016',
  datesUnavailable: undefined
}, {
  id: 2,
  name: 'Kevin Murphy',
  assignmentFrequency: 2,
  lastAssignment: '01/01/2016',
  datesUnavailable: undefined
}, {
  id: 3,
  name: 'John Smith',
  assignmentFrequency: 4,
  lastAssignment: '01/01/2016',
  datesUnavailable: undefined
}];

export default Ember.Route.extend({
  model() {
    //return this.store.findAll('people');
    return people;
  }
});
