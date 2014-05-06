"use strict";

var angular = require('angular');
var services = angular.module('visualisti.services');

services.service('postService', ['$q', '$timeout', ($q, $timeout) => {

    var posts = [
        {
            title: 'Sample blog post',
            author: 'Mark',
            body: '<p>This blog post shows a few different types of content that\'s supported and styled with Bootstrap. Basic typography, images, and code are all supported.</p>\n    <hr>\n    <p>Cum sociis natoque penatibus et magnis <a href="#">dis parturient montes</a>, nascetur ridiculus mus. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Sed posuere consectetur est at lobortis. Cras mattis consectetur purus sit amet fermentum.</p>\n    <blockquote>\n        <p>Curabitur blandit tempus porttitor. <strong>Nullam quis risus eget urna mollis</strong> ornare vel eu leo. Nullam id dolor id nibh ultricies vehicula ut id elit.</p>\n    </blockquote>\n    <p>Etiam porta <em>sem malesuada magna</em> mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.</p>\n    <h2>Heading</h2>\n    <p>Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>\n    <h3>Sub-heading</h3>\n    <p>Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p>\n    <pre><code>Example code block</code></pre>\n    <p>Aenean lacinia bibendum nulla sed consectetur. Etiam porta sem malesuada magna mollis euismod. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa.</p>\n    <h3>Sub-heading</h3>\n    <p>Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aenean lacinia bibendum nulla sed consectetur. Etiam porta sem malesuada magna mollis euismod. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.</p>\n    <ul>\n        <li>Praesent commodo cursus magna, vel scelerisque nisl consectetur et.</li>\n        <li>Donec id elit non mi porta gravida at eget metus.</li>\n        <li>Nulla vitae elit libero, a pharetra augue.</li>\n    </ul>\n    <p>Donec ullamcorper nulla non metus auctor fringilla. Nulla vitae elit libero, a pharetra augue.</p>\n    <ol>\n        <li>Vestibulum id ligula porta felis euismod semper.</li>\n        <li>Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</li>\n        <li>Maecenas sed diam eget risus varius blandit sit amet non magna.</li>\n    </ol>\n    <p>Cras mattis consectetur purus sit amet fermentum. Sed posuere consectetur est at lobortis.</p>',
            date: new Date(2014, 0, 1)
        },
        {
            title: 'Another blog post',
            author: 'Jacob',
            body: '<p>Cum sociis natoque penatibus et magnis <a href="#">dis parturient montes</a>, nascetur ridiculus mus. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Sed posuere consectetur est at lobortis. Cras mattis consectetur purus sit amet fermentum.</p>\n<blockquote>\n    <p>Curabitur blandit tempus porttitor. <strong>Nullam quis risus eget urna mollis</strong> ornare vel eu leo. Nullam id dolor id nibh ultricies vehicula ut id elit.</p>\n</blockquote>\n<p>Etiam porta <em>sem malesuada magna</em> mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.</p>\n<p>Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>\n',
            date: new Date(2013, 11, 23)
        },
        {
            title: 'New feature',
            author: 'Chris',
            body: '<p>Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aenean lacinia bibendum nulla sed consectetur. Etiam porta sem malesuada magna mollis euismod. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.</p>\n<ul>\n    <li>Praesent commodo cursus magna, vel scelerisque nisl consectetur et.</li>\n    <li>Donec id elit non mi porta gravida at eget metus.</li>\n    <li>Nulla vitae elit libero, a pharetra augue.</li>\n</ul>\n<p>Etiam porta <em>sem malesuada magna</em> mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.</p>\n<p>Donec ullamcorper nulla non metus auctor fringilla. Nulla vitae elit libero, a pharetra augue.</p>\n',
            date: new Date(2013, 11, 14)
        }
    ];

    return {
        loadPosts() {
            var deferred = $q.defer();
            $timeout(() => deferred.resolve(angular.copy(posts)), 1000);
            return deferred.promise;
        },

        savePost(post) {
            var deferred = $q.defer();

            $timeout(() => {
                var newPost = angular.copy(post);
                newPost.author = 'komu';
                newPost.date = new Date();

                posts.unshift(newPost);
                console.log("posts", posts);
                console.log("posts.length", posts.length);
                deferred.resolve(angular.copy(newPost));
            }, 1000);

            return deferred.promise;
        }
    }
}]);
