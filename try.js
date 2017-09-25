import { Selector } from 'testcafe'; // first import testcafe selectors

var daysResult = {};

fixture `Hilan`
    .page `https://interwise.net.hilan.co.il/login`;

test('Copy from Hilan', async t => {
    await t
        .typeText('#user_nm', '')
        .typeText('#password_nm', '')
        .click('[type="submit"]')
        .switchToIframe('#mainIFrame')
        .click('#ctl00_mp_lnkPeriodReproting') // דיווח תקופתי
    var paragraphElements = Selector('.cDIES')
    var count = await paragraphElements.count
    for (var i = 0; i < count; i++) {
        var element = paragraphElements.nth(i);
        if (!(await element.hasClass('CSD')))
            await t.click(element);
    }
    await t.click('#ctl00_mp_RefreshSelectedDays') // ימים נבחרים

    var days = Selector('#MainDiv').find('table').nth(0).find('tr').nth(0).nextSibling('tr').find('div').nth(0).find('table tbody').nth(0).child('tr');
    var daysCount = await days.count;
    for (var i = 0; i < count; i++) {
        var dateElement = days.nth(i).child('td').nth(0);
        var date = await dateElement.getAttribute('ov');
        if (date) {
            date = date.split('/')[0];
            daysResult[date] = {
                entry: "",
                exit: ""
            }
        }
    }
    console.log(daysResult)
});

fixture `Getting Started` // declare the fixture
    .page `https://webtime.taldor.co.il/?msg=login&ret=wt_periodic.adp`; // specify the start page

// test('Paste into OvdimNet', async t => {
//     await t
//         .typeText('#user_nm', '20167')
//         .typeText('#password_nm', 'r7602355')
//         .click('[type="submit"]')
//         .switchToIframe('#mainIFrame')
//         .click('#ctl00_mp_lnkPeriodReproting') // דיווח תקופתי
// 	    var paragraphElements = Selector('.cDIES')
// 	    var count = await paragraphElements.count
// 	    for (var i = 0; i < count; i++) {
// 	    	var element = paragraphElements.nth(i);
// 	    	if(!(await element.hasClass('CSD')))
// 	        	await t.click(element);
// 	    }
// 	    // await t.switchToIframe('#mainIFrame')
//         await t.click('#ctl00_mp_RefreshSelectedDays') // ימים נבחרים
// 	    .expect(Selector('#article-header').innerText).eql('Thank you, John Smith!');
// });
