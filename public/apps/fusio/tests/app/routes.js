'use strict';

var http = require('request-promise');

describe('Routes tests', function() {

  it('List routes', function() {
    browser.get('#!/routes');

    var routes = element.all(by.repeater('row in routes'));
    expect(routes.count()).toEqual(3);
    expect(routes.get(0).getText()).toEqual('/inspect/:foo');
    expect(routes.get(1).getText()).toEqual('/foo');
    expect(routes.get(2).getText()).toEqual('/');
  });

  it('Create route', function() {
    browser.get('#!/routes');

    var EC = protractor.ExpectedConditions;

    $('.fusio-btn-create').click();

    browser.wait(EC.visibilityOf($('div.modal-body')), 5000);

    element(by.model('route.path')).sendKeys('/test');

    var actionOptions = element.all(by.options('action.name as action.name for action in actions'));
    expect(actionOptions.get(0).getText()).toEqual('');
    expect(actionOptions.get(1).getText()).toEqual('No action');
    expect(actionOptions.get(2).getText()).toEqual('app-action');
    expect(actionOptions.get(3).getText()).toEqual('Inspect-Action');
    expect(actionOptions.get(4).getText()).toEqual('Sql-Insert');
    expect(actionOptions.get(5).getText()).toEqual('Sql-Select-All');
    expect(actionOptions.get(6).getText()).toEqual('Util-Static-Response');

    actionOptions.get(2).click();

    $('.fusio-btn-save').click();

    browser.wait(EC.visibilityOf($('div.alert-success')), 5000);

    expect($('div.alert-success > div').getText()).toEqual('Route successful created');
  });

  it('Change status to development', function() {
    browser.get('#!/routes');

    var EC = protractor.ExpectedConditions;

    $('.fusio-btn-update').click();

    browser.wait(EC.visibilityOf($('select.form-control')), 5000);

    var statusOptions = element.all(by.options('status.key as status.value for status in statuuus'));
    statusOptions.get(0).click();

    $('.fusio-btn-save').click();

    browser.wait(EC.visibilityOf($('div.alert-success')), 5000);

    expect($('div.alert-success > div').getText()).toEqual('Route successful updated');

    $('.fusio-route-path').getAttribute('href').then(function(url){
      // make a request to the endpoint
      expect(http({
        method: 'GET',
        uri: url,
        headers: {
          'User-Agent': 'Fusio-Test'
        },
        json: true,
        simple: false
      })).toEqual({
        totalResults: 2,
        itemsPerPage: 16,
        startIndex: 0,
        entry: [{
          id: '2',
          title: 'bar',
          content: 'foo',
          date: '2015-02-27 19:59:15'
        }, {
          id: '1',
          title: 'foo',
          content: 'bar',
          date: '2015-02-27 19:59:15'
        }]
      });
    });
  });

  it('Change status to production', function() {
    browser.get('#!/routes');

    var EC = protractor.ExpectedConditions;

    $('.fusio-btn-update').click();

    browser.wait(EC.visibilityOf($('select.form-control')), 5000);

    var statusOptions = element.all(by.options('status.key as status.value for status in statuuus'));
    statusOptions.get(1).click();

    $('.fusio-btn-save').click();

    browser.wait(EC.visibilityOf($('div.alert-success')), 5000);

    expect($('div.alert-success > div').getText()).toEqual('Route successful updated');

    $('.fusio-route-path').getAttribute('href').then(function(url){
      // make a request to the endpoint
      expect(http({
        method: 'GET',
        uri: url,
        headers: {
          'User-Agent': 'Fusio-Test'
        },
        json: true,
        simple: false
      })).toEqual({
        totalResults: 2,
        itemsPerPage: 16,
        startIndex: 0,
        entry: [{
          id: '2',
          title: 'bar',
          content: 'foo',
          date: '2015-02-27 19:59:15'
        }, {
          id: '1',
          title: 'foo',
          content: 'bar',
          date: '2015-02-27 19:59:15'
        }]
      });
    });
  });

  it('Change status to deprecated', function() {
    browser.get('#!/routes');

    var EC = protractor.ExpectedConditions;

    $('.fusio-btn-update').click();

    browser.wait(EC.visibilityOf($('select.form-control')), 5000);

    var statusOptions = element.all(by.options('status.key as status.value for status in statuuus'));
    statusOptions.get(2).click();

    $('.fusio-btn-save').click();

    browser.wait(EC.visibilityOf($('div.alert-success')), 5000);

    expect($('div.alert-success > div').getText()).toEqual('Route successful updated');

    $('.fusio-route-path').getAttribute('href').then(function(url){
      // make a request to the endpoint
      expect(http({
        method: 'GET',
        uri: url,
        headers: {
          'User-Agent': 'Fusio-Test'
        },
        json: true,
        simple: false
      })).toEqual({
        totalResults: 2,
        itemsPerPage: 16,
        startIndex: 0,
        entry: [{
          id: '2',
          title: 'bar',
          content: 'foo',
          date: '2015-02-27 19:59:15'
        }, {
          id: '1',
          title: 'foo',
          content: 'bar',
          date: '2015-02-27 19:59:15'
        }]
      });
    });
  });

  it('Change status to closed', function() {
    browser.get('#!/routes');

    var EC = protractor.ExpectedConditions;

    $('.fusio-btn-update').click();

    browser.wait(EC.visibilityOf($('select.form-control')), 5000);

    var statusOptions = element.all(by.options('status.key as status.value for status in statuuus'));
    statusOptions.get(3).click();

    $('.fusio-btn-save').click();

    browser.wait(EC.visibilityOf($('div.alert-success')), 5000);

    expect($('div.alert-success > div').getText()).toEqual('Route successful updated');

    $('.fusio-route-path').getAttribute('href').then(function(url){
      // make a request to the endpoint
      expect(http({
        method: 'GET',
        uri: url,
        headers: {
          'User-Agent': 'Fusio-Test'
        },
        json: true,
        simple: false
      })).toEqual({
        success: false,
        title: 'Internal Server Error',
        message: 'Resource is not longer supported'
      });
    });
  });

  it('Update route', function() {
    browser.get('#!/routes');

    var EC = protractor.ExpectedConditions;

    $('.fusio-btn-update').click();

    browser.wait(EC.visibilityOf($('select.form-control')), 5000);

    expect(element(by.model('route.path')).getAttribute('value')).toEqual('/test');
    expect(element.all(by.model('config.active')).get(0).getAttribute('value')).toEqual('on');
    expect(element.all(by.model('config.public')).get(0).getAttribute('value')).toEqual('on');
    expect(element.all(by.model('config.parameters')).get(0).getAttribute('value')).toEqual('');
    expect(element.all(by.model('config.responses[code]')).get(0).getAttribute('value')).toEqual('string:Passthru');
    expect(element.all(by.model('config.action')).get(0).getAttribute('value')).toEqual('string:app-action');

    $('.fusio-btn-save').click();

    browser.wait(EC.visibilityOf($('div.alert-success')), 5000);

    expect($('div.alert-success > div').getText()).toEqual('Route successful updated');
  });

  it('Delete route', function() {
    browser.get('#!/routes');

    var EC = protractor.ExpectedConditions;

    $('.fusio-btn-delete').click();

    browser.wait(EC.visibilityOf($('div.modal-body')), 5000);

    expect(element(by.model('route.path')).getAttribute('value')).toEqual('/test');

    $('.fusio-btn-save').click();

    browser.wait(EC.visibilityOf($('div.alert-success')), 5000);

    expect($('div.alert-success > div').getText()).toEqual('Route successful deleted');
  });

  it('Create route provider', function() {
    browser.get('#!/routes');

    var EC = protractor.ExpectedConditions;

    $('.fusio-btn-provider').click();

    browser.wait(EC.visibilityOf($('div.modal-body')), 5000);

    element(by.model('route.path')).sendKeys('/provider');

    var providerOptions = element.all(by.options('provider.class as provider.name for provider in providers'));
    expect(providerOptions.get(0).getText()).toEqual('SQL-Table');

    providerOptions.get(0).click();

    element(by.cssContainingText('#config-connection option', 'System')).click();
    element(by.css('#config-table')).sendKeys('app_news');

    $('.fusio-btn-save').click();

    browser.wait(EC.visibilityOf($('div.alert-success')), 5000);

    expect($('div.alert-success > div').getText()).toEqual('Provider successful created');
  });

});


