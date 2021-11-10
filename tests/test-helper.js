import Application from 'simple-schedule-app/app';
import config from 'simple-schedule-app/config/environment';
import { setApplication } from '@ember/test-helpers';
import { start } from 'ember-qunit';

setApplication(Application.create(config.APP));

start();
