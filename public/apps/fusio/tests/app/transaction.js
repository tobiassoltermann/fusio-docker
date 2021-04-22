'use strict';

describe('Transaction tests', function() {

  it('List transaction', function() {
    browser.get('#!/transaction');

    var EC = protractor.ExpectedConditions;

    // set filter settings
    $('a.btn-primary').click();

    browser.wait(EC.visibilityOf($('div.modal-body')), 5000);

    element(by.model('filter.from')).click().sendKeys('2018-10-01');
    element(by.model('filter.to')).click().sendKeys('2018-10-30');

    $('button.btn-primary').click();

    var transactions = element.all(by.repeater('transaction in transactions').column('transaction.transactionId'));
    expect(transactions.count()).toEqual(1);
    expect(transactions.get(0).getText()).toMatch('9e239bb3-cfb4-4783-92e0-18ce187041bc');
  });

  it('Detail transaction', function() {
    browser.get('#!/transaction');

    var EC = protractor.ExpectedConditions;

    // set filter settings
    $('a.btn-primary').click();

    browser.wait(EC.visibilityOf($('div.modal-body')), 5000);

    element(by.model('filter.from')).click().sendKeys('2018-10-01');
    element(by.model('filter.to')).click().sendKeys('2018-10-30');

    $('button.btn-primary').click();

    element.all(by.css('div.fusio-options a:nth-child(1)')).get(0).click();

    browser.wait(EC.visibilityOf($('div.modal-body')), 5000);

    expect(element(by.model('transaction.provider')).getAttribute('value')).toEqual('paypal');
    expect(element(by.model('transaction.transactionId')).getAttribute('value')).toEqual('9e239bb3-cfb4-4783-92e0-18ce187041bc');
    expect(element(by.model('transaction.amount')).getAttribute('value')).toEqual('39.99');
    expect(element(by.model('transaction.insertDate')).getAttribute('value')).toEqual('2018-10-05T18:18:00Z');

    $('button.btn-default').click();
  });

});
