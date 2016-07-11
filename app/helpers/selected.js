import Ember from 'ember';

export function selected(params/*, hash*/) {
  console.log(params[0], params[1], params[0].has(params[1]));
  if (params[0].has(params[1])) {
    return Ember.String.htmlSafe('selected');
  }
  return Ember.String.htmlSafe('');
}

export default Ember.Helper.helper(selected);
