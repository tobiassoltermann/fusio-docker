'use strict';

describe('User tests', function() {

  it('List user', function() {
    browser.get('#!/user');

    var users = element.all(by.repeater('user in users'));
    expect(users.count()).toEqual(4);
    expect(users.get(0).getText()).toMatch('Developer');
    expect(users.get(1).getText()).toMatch('Disabled');
    expect(users.get(2).getText()).toMatch('Consumer');
    expect(users.get(3).getText()).toMatch('Administrator');
  });

  it('Create user', function() {
    browser.get('#!/user');

    var EC = protractor.ExpectedConditions;

    $('.fusio-btn-create').click();

    browser.wait(EC.visibilityOf($('div.modal-body')), 5000);

    var statusOptions = element.all(by.options('status.id as status.name for status in statuuus'));
    expect(statusOptions.count()).toEqual(2);
    expect(statusOptions.get(0).getText()).toEqual('Active');
    expect(statusOptions.get(1).getText()).toEqual('Disabled');

    statusOptions.get(0).click();

    var roleOptions = element.all(by.options('role.id as role.name for role in roles'));
    expect(roleOptions.count()).toEqual(4);
    expect(roleOptions.get(0).getText()).toEqual('');
    expect(roleOptions.get(1).getText()).toEqual('Administrator');
    expect(roleOptions.get(2).getText()).toEqual('Backend');
    expect(roleOptions.get(3).getText()).toEqual('Consumer');

    roleOptions.get(1).click();

    element(by.model('user.name')).sendKeys('test-user');
    element(by.model('user.email')).sendKeys('foo@bar.com');
    element(by.model('user.password')).sendKeys('test1234!');

    $('button.btn-primary').click();

    browser.wait(EC.visibilityOf($('div.alert-success')), 5000);

    expect($('div.alert-success > div').getText()).toMatch('User successful created');
  });

  it('Update user', function() {
    browser.get('#!/user');

    var EC = protractor.ExpectedConditions;

    $('.fusio-btn-update').click();

    browser.wait(EC.visibilityOf($('div.modal-body')), 5000);

    expect(element(by.model('user.status')).getAttribute('value')).toEqual('number:1');
    expect(element(by.model('user.name')).getAttribute('value')).toEqual('test-user');

    // @TODO check and edit scopes
    
    $('button.btn-primary').click();

    browser.wait(EC.visibilityOf($('div.alert-success')), 5000);

    expect($('div.alert-success > div').getText()).toEqual('User successful updated');
  });

  it('Delete user', function() {
    browser.get('#!/user');

    var EC = protractor.ExpectedConditions;

    $('.fusio-btn-delete').click();

    browser.wait(EC.visibilityOf($('div.modal-body')), 5000);

    expect(element(by.model('user.name')).getAttribute('value')).toEqual('test-user');

    $('button.btn-primary').click();

    browser.wait(EC.visibilityOf($('div.alert-success')), 5000);

    expect($('div.alert-success > div').getText()).toEqual('User successful deleted');
  });

});
