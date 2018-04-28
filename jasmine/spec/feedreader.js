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
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function () {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */

        //define few helper functions for tests. Each returns true or false depending on result. Two functions (instead of one) to make purpose more clear.
        const allDefined = (array, property) => array.every(element => element[property] !== undefined);
        const allNotEmpty = (array, property) => array.every(element => element[property].length > 0);

        it('are defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it('should have their URL defined and not empty', function () {
            expect(allDefined(allFeeds, 'url')).toBe(true);
            expect(allNotEmpty(allFeeds, 'url')).toBe(true);
         });


        /* Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('should have their name defined and not empty', function () {
            expect(allDefined(allFeeds, 'name')).toBe(true);
            expect(allNotEmpty(allFeeds, 'name')).toBe(true);
         });
    });


    /* Write a new test suite named "The menu" */
    describe('The menu', function () {
        const menu = $('body');
        /* Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
        */
        it('should be hidden by default', function () {
            expect(menu.attr('class')).toEqual('menu-hidden');
        });


         /* Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
         it('should be displayed after click', function () {
            const menuBtn = $('.menu-icon-link');

            menuBtn.click();
            expect(menu.attr('class')).toEqual('');

            menuBtn.click();
            expect(menu.attr('class')).toEqual('menu-hidden');
         });
    });

    /* Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function () {

        /* Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */

         //call loadFeed before tests
         beforeEach(function (done) {
            loadFeed(0, function () {
                done();
            });
         });

         it('should have at least one entry in the .feed container', function (done) {
            const feed = $('.feed');
            expect(feed.length).toBeGreaterThan(0);
            done();
         });
    });

    /* Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function () {
        let firstLoadFeed;
        let secondLoadFeed;
        /* Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */

         //load our loadFeed functions before tests
         beforeEach(function(done) {
            loadFeed(0, function() {
                firstLoadFeed = $('.feed').text();

                loadFeed(1, function() {
                    secondLoadFeed = $('.feed').text();
                    done();
                });
            });
        });

        it('should load new feed content', function () {
            //helper function to compare objects. toString() ensures we compare values, not references. Returns boolean - if true, means objects have the same values.
            const compare = (firstObject, secondObject) => firstObject.toString() === secondObject.toString();

            expect(compare(firstLoadFeed, secondLoadFeed)).toBe(false);
        });
    });
}());
