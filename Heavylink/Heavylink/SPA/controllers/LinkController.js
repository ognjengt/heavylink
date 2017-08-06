app.controller('LinkController', function ($scope, $window, $rootScope, $routeParams, LinksFactory) {

    function init() {
        // change in prod
        $scope.linkUrl = "http://localhost:6934/"+$routeParams.generatedUrl;
        $('[data-toggle="tooltip"]').tooltip();

        LinksFactory.getLinksForThisUrl($routeParams.generatedUrl).then(function(response) {
            console.log(response.data);
        })
    }

    init();

    $scope.putCopiedFeedback = function() {
        $('#copyLinkBtn').attr('title', 'Copied!').tooltip('fixTitle').tooltip('show');
    }


})