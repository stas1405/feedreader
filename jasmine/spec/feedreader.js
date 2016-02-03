/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */
/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL and name defined
         * and that the URL and name are not empty.
         */

        it('has defined URL and name', function() {
            var i = 0;
            var allFeedsLen = allFeeds.length;
            for (; i < allFeedsLen; i++) {
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url.length).not.toBe(0);
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name.length).not.toBe(0);
            }
        });
    });

    /* TODO: Write a new test suite named "The menu" */

    describe("The menu", function() {
        var body = $('body');


        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('is hidden by default', function() {
            expect(body.hasClass('menu-hidden')).toBeTruthy();
        });


        /* TODO: Write a test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does  and does it hide when clicked again.
         */


        describe('icon is clicked,', function() {

            beforeEach(function() {
                $('.menu-icon-link').trigger('click');
            });

            //the menu is displayed when burger icon is clicked
            it('and the menu is displayed', function() {
                expect(body.hasClass('menu-hidden')).toBeFalsy();
            });

            //the menu is hidden when burger icon is clicked again
            it('and the menu is hidden', function() {
                expect(body.hasClass('menu-hidden')).toBeTruthy();
            });
        });
    });

    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {

        beforeEach(function(done) {
            loadFeed(0, done);
        });

        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        it('has been loaded', function(done) {
            expect($('.feed').children().length).toBeGreaterThan(0);
            done();
        });
    });

    describe('New Feed Selection', function() {

        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        var feed0, feed1;

        beforeEach(function(done) {
            loadFeed(0, function() {
                // Get the first article header of the current feed
                feed0 = $('.feed').find('h2')[0].innerText;
                // Invoke done callback function
                done();
            });
        });

        // Change feed back to the first one.
        afterEach(function(done) {
            loadFeed(0, done);
        });

        it('Content Actually Changed', function(done) {

            // Load new feed
            loadFeed(1, function() {
                // Get the first article header of the new feed
                feed1 = $('.feed').find('h2')[0].innerText;
                // Compare two of them, should not equal
                expect(feed0).not.toEqual(feed1);
                // Invoke done callback function
                done();
            });
        });
    });
}());