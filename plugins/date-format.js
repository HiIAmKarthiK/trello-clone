import Vue from 'vue';
import moment from 'moment';

Vue.filter('date', (value) => {
  if (!value) return '';
  return moment(value).format('dddd, MMMM Do YYYY');
});

Vue.filter('daysDuration', (value) => {
  if (!value) return '';
  var now = moment(Date.now()); //todays date
  var end = moment(value); // another date
  var duration = moment.duration(now.diff(end));

  var hours = duration.asHours();

  return `${Math.ceil(hours)}h ago`;
});
