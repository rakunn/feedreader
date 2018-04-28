/* global $ expect allFeeds loadFeed */

/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function () {
    /* RSS Feeds test suite - concerning allFeed variable, which holds our feed data (url, name) and if the data is correctly assigned */
    describe('RSS Feeds', function () {

        /* define few helper functions for tests. Each returns true or false depending on result. Two functions (instead of one) to make purpose more clear. */
        const allDefined = (array, property) => array.every(element => element[property] !== undefined);
        const allNotEmpty = (array, property) => array.every(element => element[property].length > 0);

        /* We need to have if allFeeds variable is defined - without it we will not be able to run the app */
        it('are defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Here we are ensuring, that every feed has its url property defined and not empty */
         it('should have their URL defined and not empty', function () {
            expect(allDefined(allFeeds, 'url')).toBe(true);
            expect(allNotEmpty(allFeeds, 'url')).toBe(true);
         });

        /* Here we are ensuring, that every feed has its name property defined and not empty */
         it('should have their name defined and not empty', function () {
            expect(allDefined(allFeeds, 'name')).toBe(true);
            expect(allNotEmpty(allFeeds, 'name')).toBe(true);
         });
    });


    /* Write a new test suite named "The menu" */
    describe('The menu', function () {
        const menu = $('body');
        /* Here we are checking if menu is hidden after the first page load (which is our default) */
        it('should be hidden by default', function () {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });


         /* Tests checking whether menu is correctly displayed or hidden after clicks */
         it('should be displayed after click', function () {
            const menuBtn = $('.menu-icon-link');

            menuBtn.click();
            expect(menu.hasClass('menu-hidden')).toBe(false);

            menuBtn.click();
            expect(menu.hasClass('menu-hidden')).toBe(true);
         });
    });

    /* Initial entries test suite - tests for entries after the first page load */
    describe('Initial Entries', function () {

         /* call loadFeed before tests */
         beforeEach(function (done) {
            loadFeed(0, function () {
                done();
            });
         });

        /* Here we are checking if there is at least one entry element in the feed (which is what we expect after ajax request) */
        it('should have at least one entry in the .feed container', function (done) {
            const feedElements = $('.feed .entry-link');

            expect(feedElements.length).toBeGreaterThan(0);
            done();
        });
    });

    /* New Feed Selection test suite - tests for loading next (new) feeds after the first page load */
    describe('New Feed Selection', function () {
        let firstLoadFeed;
        let secondLoadFeed;

         /* load our loadFeed functions before tests */
         beforeEach(function(done) {
            loadFeed(0, function() {
                firstLoadFeed = $('.feed').text();

                loadFeed(1, function() {
                    secondLoadFeed = $('.feed').text();
                    done();
                });
            });
        });

        /* Here we are comparing results from calling loadFeed twice, each time with different feed */
        it('should load new feed content', function () {
            //helper function to compare objects. toString() ensures we compare values, not references. Returns boolean - if true, means objects have the same values.
            const compare = (firstObject, secondObject) => firstObject.toString() === secondObject.toString();

            expect(compare(firstLoadFeed, secondLoadFeed)).toBe(false);
        });
    });
}());
