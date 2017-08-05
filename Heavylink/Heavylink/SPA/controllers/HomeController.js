app.controller('HomeController', function ($scope, $window, $rootScope, HomeFactory) {

    function init() {
        $scope.links = [];
        $scope.linkId = 0;
        $scope.firstHotkey = 17;
        $scope.addOnPasteEnabled = true;
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
        link.id = $scope.linkId++;
        $scope.links.push(link);
        $scope.link = {};
    }

    $scope.removeLink = function(id,$event) {
        $event.preventDefault();
        $scope.links = $scope.links.filter(function( obj ) {
            return obj.id !== id;
        });
    }
    
})