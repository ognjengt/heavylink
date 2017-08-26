app.controller('LinkController', function ($scope, $window, $rootScope, $routeParams, LinksFactory, $sce, jwtHelper, $location) {

    function init() {
        // change in prod
        $scope.linkUrl = "http://localhost:6934/"+$routeParams.generatedUrl;
        $('[data-toggle="tooltip"]').tooltip();

        LinksFactory.getLinksForThisUrl($routeParams.generatedUrl).then(function(response) {
            console.log(response.data);
            if(response.data == null) {
                $('.not-found').show();
                $scope.found = false;
                return;
            }
            $scope.found = true;
            $scope.record = response.data;
            if ($scope.record.Private && $rootScope.username != $scope.record.Author) {

                $scope.record.Urls = [];
                $scope.found = false;
                $('.privateLink').show();
                return;
            }
            var trusted = [];
            $scope.record.Urls.forEach(function(url){
                trusted.push($sce.trustAsResourceUrl(url));
            });
            $scope.record.Urls = trusted;
            $scope.privateChecked = $scope.record.Private;
            //$scope.title = $scope.record.Title;
        })
    }

    init();

    $scope.putCopiedFeedback = function() {
        $('#copyLinkBtn').attr('title', 'Copied!').tooltip('fixTitle').tooltip('show');
    }

    // window.iframeLoaded = function(iframe) {
    //     console.log(iframe.id);
    //     if(!isNaN(iframe.id.substring(7,6))) {
            
    //     }
    // }

    $scope.openEditTitle = function() {
        if($scope.record.Author != $rootScope.username) return;
        $('#changeTitlePopup').fadeIn(150);
    }

    $scope.openSettings = function() {
        if($scope.record.Author != $rootScope.username) return;
        $('#settingsPopup').fadeIn(150);
    }

    $scope.SubmitChangeTitle = function() {
        if($scope.record.Author != $rootScope.username) return;
        $('#submitTitleIcon').removeClass('ion-checkmark').addClass('ion-load-c animateloader');
        LinksFactory.changeLinkTitle($scope.record.Id, $scope.record.Title).then((response) => {
            $('#changeTitlePopup').fadeOut(150);
            $('#submitTitleIcon').removeClass('ion-load-c animateloader').addClass('ion-checkmark');
        })
    }

    $scope.closeTitlePopup = function() {
        $('#submitTitleIcon').removeClass('ion-load-c animateloader').addClass('ion-checkmark');
        $('#changeTitlePopup').fadeOut(150);
    }

    $scope.closeSettingsPopup = function() {
        $('#settingsPopup').fadeOut(150);
    }

    $scope.UpdateSettings = function(private) {
        if($scope.record.Author != $rootScope.username) return;
        var settings = {
            private: private,
            id: $scope.record.Id
        }
        $('.pull-right').hide();
        $('.updatingSettings').show();
        LinksFactory.UpdateSettings(settings).then((response) => {
            $('.pull-right').show();
            $('.updatingSettings').hide();
            $('#settingsPopup').fadeOut(150);
        })
    }

    $scope.DeleteLink = function() {
        $('.pull-right').hide();
        $('.updatingSettings').show();
        LinksFactory.DeleteLink($scope.record.Id).then((response) => {
            $location.path('/profile');
        })
    }


})