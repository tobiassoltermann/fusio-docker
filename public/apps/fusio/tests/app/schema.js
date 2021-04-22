'use strict';

describe('Schema tests', function() {

  it('List schema', function() {
    browser.get('#!/schema');

    var schemas = element.all(by.repeater('row in schemas'));
    expect(schemas.count()).toEqual(7);
    expect(schemas.get(0).getText()).toEqual('Provider-Entity');
    expect(schemas.get(1).getText()).toEqual('Provider-Collection');
    expect(schemas.get(2).getText()).toEqual('SQL-Table-Response');
    expect(schemas.get(3).getText()).toEqual('SQL-Table-Parameters');
    expect(schemas.get(4).getText()).toEqual('Entry-Schema');
    expect(schemas.get(5).getText()).toEqual('Collection-Schema');
    expect(schemas.get(6).getText()).toEqual('Passthru');
  });

  it('Create schema', function() {
    browser.get('#!/schema');

    var EC = protractor.ExpectedConditions;

    $('.fusio-btn-create').click();

    browser.wait(EC.visibilityOf($('div.modal-body')), 5000);
    browser.wait(EC.visibilityOf($('.ace_editor')), 5000);
    browser.actions().doubleClick($('div.ace_content')).perform();

    element(by.model('schema.name')).sendKeys('test-schema');
    element(by.css('textarea.ace_text-input')).sendKeys('{ "id": "http://acme.com/schema", "type": "object", "title": "schema", "properties": { "name": { "type": "string" }, "date": { "type": "string", "format": "date-time" } } }');

    $('button.btn-primary').click();

    browser.wait(EC.visibilityOf($('div.alert-success')), 5000);

    expect($('div.alert-success > div').getText()).toEqual('Schema successful created');
  });

  it('Update schema', function() {
    browser.get('#!/schema');

    var EC = protractor.ExpectedConditions;

    $('.fusio-btn-update').click();

    browser.wait(EC.visibilityOf($('div.modal-body')), 5000);

    expect(element(by.model('schema.name')).getAttribute('value')).toEqual('test-schema');

    $('button.btn-primary').click();

    browser.wait(EC.visibilityOf($('div.alert-success')), 5000);

    expect($('div.alert-success > div').getText()).toEqual('Schema successful updated');
  });

  it('Delete schema', function() {
    browser.get('#!/schema');

    var EC = protractor.ExpectedConditions;

    $('.fusio-btn-delete').click();

    browser.wait(EC.visibilityOf($('div.modal-body')), 5000);

    expect(element(by.model('schema.name')).getAttribute('value')).toEqual('test-schema');

    $('button.btn-primary').click();

    browser.wait(EC.visibilityOf($('div.alert-success')), 5000);

    expect($('div.alert-success > div').getText()).toEqual('Schema successful deleted');
  });

});
