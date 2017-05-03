import Ember from 'ember';
import CascadeDeleteMixin from 'the-scheduler/mixins/cascade-delete';
import { module, test } from 'qunit';

module('Unit | Mixin | cascade delete');

// Replace this with your real tests.
test('it works', function(assert) {
  let CascadeDeleteObject = Ember.Object.extend(CascadeDeleteMixin);
  let subject = CascadeDeleteObject.create();
  assert.ok(subject);
});
