module.exports = {
    
    "Register New Customer": function (browser) {
        egovLogin(browser, 'https://myendpoint.it/another-app/index.html')
            .waitForElementVisible('#main', 5000)
            .assert.containsText('#header', 'iam perf tests jmeter')
            .url('https://myendpoint.it/another-app/index.html#account/filter')
            .waitForElementVisible('input[name=username]', 1000)
            .setValue('input[name=id]', '141684')
            .submitForm('form#accountFilter')
            .pause(1000)
            .assert.elementPresent('table.list')
            .assert.containsText("table.list", "EGOV-PERF-TEST")
            .url('https://myendpoint.it/logout.aspx')
            .end();
    }
};