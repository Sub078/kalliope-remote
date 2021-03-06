import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  signals: DS.attr(),
  neurons: DS.attr(),

  launchable: Ember.computed('signals', function() {
    // For now, we disable signals that have parameter in their order.
    var valid = true;
    this.get('signals').forEach(function(item, index, enumerable) {
      if (item.name == "order" && item.parameters.match(/{{[^}]*}}/)){
        valid = false;
      }
    });
    return valid;
  }),

  isOrder: Ember.computed('signals', function() {
    this.get('signals').forEach(function(item, index, enumerable) {
      if (item.name == 'order') {
        return true;
      }
    });
    return false;
  }),

  hidden: Ember.computed('name', function() {
    var tmp = localStorage.getItem('kr:ignored-synapses');
    if (tmp == null || tmp.indexOf(this.get('name')) === -1) {
      return false;
    }
    return true;
  }),

  displayed_name: Ember.computed('name', function(){
    return this.get('name').replace(/-/g, ' ');
  })

});
