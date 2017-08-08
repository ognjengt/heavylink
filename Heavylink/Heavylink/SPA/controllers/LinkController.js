app.controller('LinkController', function ($scope, $window, $rootScope, $routeParams, LinksFactory, $sce) {

    function init() {
        // change in prod
        $scope.linkUrl = "http://localhost:6934/"+$routeParams.generatedUrl;
        $('[data-toggle="tooltip"]').tooltip();

        LinksFactory.getLinksForThisUrl($routeParams.generatedUrl).then(function(response) {
            console.log(response.data);
            if(response.data == null) {
                $('.not-found').show();
                return;
            }
            $scope.record = response.data;
            var trusted = [];
            $scope.record.Urls.forEach(function(url){
                trusted.push($sce.trustAsResourceUrl(url));
            });
            $scope.record.Urls = trusted;
            
        })
    }

    init();

    $scope.putCopiedFeedback = function() {
        $('#copyLinkBtn').attr('title', 'Copied!').tooltip('fixTitle').tooltip('show');
    }

    window.iframeLoaded = function(iframe) {
        console.log(iframe.id);
        if(!isNaN(iframe.id.substring(7,6))) {
            
        }
    }


})