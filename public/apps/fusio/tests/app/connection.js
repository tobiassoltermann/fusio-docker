'use strict';

describe('Connection tests', function() {

  it('List connection', function() {
    browser.get('#!/connection');

    var connections = element.all(by.repeater('connection in connections'));
    expect(connections.count()).toEqual(3);
    expect(connections.get(0).getText()).toEqual('paypal');
    expect(connections.get(1).getText()).toEqual('Test');
    expect(connections.get(2).getText()).toEqual('System');
  });

  it('Create connection', function() {
    browser.get('#!/connection');

    var EC = protractor.ExpectedConditions;

    $('.fusio-btn-create').click();

    browser.wait(EC.visibilityOf($('div.modal-body')), 5000);

    element(by.model('connection.name')).sendKeys('test-connection');

    var connectionOptions = element.all(by.options('conn.class as conn.name for conn in connections'));
    expect(connectionOptions.get(0).getText()).toEqual('HTTP');
    expect(connectionOptions.get(1).getText()).toEqual('SQL');
    expect(connectionOptions.get(2).getText()).toEqual('SQL (advanced)');
    connectionOptions.get(2).click();

    browser.wait(EC.visibilityOf($('#config-url')), 5000);

    element(by.css('#config-url')).sendKeys('sqlite://:memory:');

    $('button.btn-primary').click();

    browser.wait(EC.visibilityOf($('div.alert-success')), 5000);

    expect($('div.alert-success > div').getText()).toEqual('Connection successful created');
  });

  it('Update connection', function() {
    browser.get('#!/connection');

    var EC = protractor.ExpectedConditions;

    $('.fusio-btn-update').click();

    browser.wait(EC.visibilityOf($('div.modal-body')), 5000);

    expect(element(by.model('connection.name')).getAttribute('value')).toEqual('test-connection');
    expect(element(by.model('connection.class')).getAttribute('value')).toEqual('Fusio\\Adapter\\Sql\\Connection\\SqlAdvanced');

    browser.wait(EC.visibilityOf($('#config-url')), 5000);

    expect(element(by.css('#config-url')).getAttribute('value')).toEqual('sqlite://:memory:');

    $('button.btn-primary').click();

    browser.wait(EC.visibilityOf($('div.alert-success')), 5000);

    expect($('div.alert-success > div').getText()).toEqual('Connection successful updated');
  });

  it('Delete connection', function() {
    browser.get('#!/connection');

    var EC = protractor.ExpectedConditions;

    $('.fusio-btn-delete').click();

    browser.wait(EC.visibilityOf($('div.modal-body')), 5000);

    expect(element(by.model('connection.name')).getAttribute('value')).toEqual('test-connection');

    $('button.btn-primary').click();

    browser.wait(EC.visibilityOf($('div.alert-success')), 5000);

    expect($('div.alert-success > div').getText()).toEqual('Connection successful deleted');
  });

});
