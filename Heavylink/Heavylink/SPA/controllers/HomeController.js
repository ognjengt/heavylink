﻿app.controller('HomeController', function ($scope, $window, $rootScope, HomeFactory, jwtHelper) {

    var tokenPayload = null;
    function init() {

        if($rootScope.token != null) {
            tokenPayload = jwtHelper.decodeToken(localStorage.getItem('token'));
          }

        $scope.links = [];
        $scope.link = {};
        $scope.linkId = 0;
        $scope.firstHotkey = 17;
        $scope.addOnPasteEnabled = true;
        document.getElementById('linkInput').focus();
        $('[data-toggle="tooltip"]').tooltip();
        //$scope.popupVisible = false;
    }

    init();

    $scope.CallAddLinkOnEnter = function ($event) {
        var key = $event.keyCode;
        if (key == 13) {
            $scope.addLink($scope.link);
        }
        if($scope.addOnPasteEnabled) {
            if(key == 17) {
                $scope.firstHotkey = key;
            }
        else if(key == 86) {
            if($scope.firstHotkey == 17) {
                    $scope.addLink($scope.link);
                    $scope.firstHotkey = 0;
                }
            }
        }
         
    }

    $scope.addLink = function(link) {
        if(link.pastedUrl == null || link.pastedUrl == '') {
            alert('Please enter a valid link');
            return;
        }
        if($scope.links.length == 10) {
            alert('No more than 10 links per group!');
            return;
        }
        // check if link contains http
        if(!link.pastedUrl.includes("http://") && !link.pastedUrl.includes("https://")) link.pastedUrl = 'http://'+link.pastedUrl;
        link.id = $scope.linkId++;
        $scope.links.push(link);
        $scope.link = {};
        document.getElementById('linkInput').focus();
    }

    $scope.removeLink = function(id,$event) {
        $event.preventDefault();
        $scope.links = $scope.links.filter(function( obj ) {
            return obj.id !== id;
        });
        document.getElementById('linkInput').focus();
    }

    $scope.clearAll = function() {
        $scope.links = [];
    }

    $scope.generateGroupLink = function(links) {
        var urls = [];
        $('#popup').fadeIn(200);
        links.forEach(function(link) {
            urls.push(link.pastedUrl);
        });
        var username = "Anonymous";
        if(tokenPayload != null) {
            username = tokenPayload.unique_name;
        }
        HomeFactory.generateGroupLink(urls, username).then(function(response) {
            console.log(response.data);
            $scope.generatedLink = "http://localhost:6934/"+response.data; // change in prod
            $('#loading').fadeOut(100);
            $('#wrapperGenerated').fadeIn(200);
        })
    }

    $scope.closePopup = function() {
        $scope.links = [];
        $('#popup').fadeOut(200);
        $('#wrapperGenerated').fadeOut(200);
        $('#loading').fadeIn(700);
        $('#copyToClipBtn').attr('title', 'Copy link').tooltip('fixTitle');
    }

    $scope.putCopiedFeedback = function() {
        $('#copyToClipBtn').attr('title', 'Copied!').tooltip('fixTitle').tooltip('show');
    }

    $scope.goToGeneratedLink = function(generatedLink) {
        //$window.open(generatedLink, '_blank');
        $window.location.href = generatedLink;
    }
    
})