//jQuery(function() {
//  var q = parseQueryString(window.location.search);
//  if (q.url) {
//    $('input[name="url"]').val(q.url);
//
//    $('.loading').show();
//
//    var display = function(info) {
//      $('.loading').hide();
//      $('.results').show();
//
//      rawData = info.raw;
//      var summaryInfo = info.summary;
//      var properties = rawData[info.dbpediaUrl];
//
//      for (key in summaryInfo) {
//        $('.summary .' + key).text(summaryInfo[key]);
//      }
//      $('.summary .thumbnail').attr('src', summaryInfo.image);
//      var dataAsJson = JSON.stringify(summaryInfo, null, '    ')
//      $('.summary .raw').val(dataAsJson);
//
//      // Raw Data Summary
//      var count = 0;
//      for (key in properties) {
//        count += 1;
//        $('.data-summary .properties').append(key + '\n');
//      }
//      $('.data-summary .count').text(count);
//
//      // raw JSON
//      var dataAsJson = JSON.stringify(rawData, null, '    ')
//      $('.results-json').val(dataAsJson);
//
//      $('html,body').animate({
//        scrollTop: $('#demo').offset().top
//        },
//        'slow'
//      );
//    };
//
//    WIKIPEDIA.getData(q.url, display, function(error) {
//        alert(error);
//      }
//    );
//  }
//
//  $('.js-data-summary').click(function(e) {
//    $('.data-summary').show();
//  });
//});

// TODO: search of wikipedia
// http://en.wikipedia.org/w/api.php?action=query&format=json&callback=test&list=search&srsearch=%richard%

// Parse a URL query string (?xyz=abc...) into a dictionary.
parseQueryString = function(q) {
  if (!q) {
    return {};
  }
  var urlParams = {},
    e, d = function (s) {
      return unescape(s.replace(/\+/g, " "));
    },
    r = /([^&=]+)=?([^&]*)/g;

  if (q && q.length && q[0] === '?') {
    q = q.slice(1);
  }
  while (e = r.exec(q)) {
    // TODO: have values be array as query string allow repetition of keys
    urlParams[d(e[1])] = d(e[2]);
  }
  return urlParams;
};


var angularApp = angular.module('angularApp', []);

angularApp.directive('ngHover', function() {
  return {
    link: function(scope, element) {
       
       element.bind('mouseenter', function() 
       {
          angular.element(element).addClass('hover');
       })
       
       element.bind('mouseleave', function() 
       {
          angular.element(element).removeClass('hover');   
       })
    }
  }
});

angularApp.directive('ngActive', function() {
  return {
    link: function(scope, element) {
       
       element.bind('click', function() 
       {
        
           var elementHTML =  angular.element(element)[0].innerHTML.trim();
           angular.element(element).addClass('active');
           scope.$apply();
           
           scope.updateSelectedItem(elementHTML);
           console.log("Selected Item is : " + scope.selectedItem);
           
            $('#attractionsGroup').children('li').each(function () {
            var thisName = this.innerHTML.trim();
         
            if(thisName != elementHTML)
            {
                angular.element(this).removeClass('active');
            }
               
            });
       })
       
    }
  }
});

//APP CONTROLLER
angularApp.controller('mainController', ['$scope', '$compile',
                                                                      
    
    function($scope, $compile) {
        
    //$scope.attractions =[];
        
    $scope.selectedItemWiki = "This is random wiki text";
    
    $scope.attractions = [
    {name: "Grianan of Aileach",
     wikipediaURL : 'http://en.wikipedia.org/wiki/Grianan_of_Aileach',
     img1Src : "/NewWebProject/img/grianan/g1.Jpg",
     img2Src : "/NewWebProject/img/grianan/g2.jpg",
     img3Src : "/NewWebProject/img/grianan/g3.jpg",
     img4Src : "/NewWebProject/img/grianan/g4.jpg",
     img5Src : "/NewWebProject/img/grianan/g5.jpg",
    },
         {name: "Malin Head",
     wikipediaURL : 'http://en.wikipedia.org/wiki/Malin_Head',
     img1Src : "/NewWebProject/img/malin/m1.Jpg",
     img2Src : "/NewWebProject/img/malin/m2.jpg",
     img3Src : "/NewWebProject/img/malin/m3.jpg",
     img4Src : "/NewWebProject/img/malin/m4.jpg",
     img5Src : "/NewWebProject/img/malin/m5.jpg",
    },
         {name: "Slieve League",
     wikipediaURL : 'http://en.wikipedia.org/wiki/Slieve_League',
     img1Src : "/NewWebProject/img/slieve/s1.Jpg",
     img2Src : "/NewWebProject/img/slieve/s2.jpg",
     img3Src : "/NewWebProject/img/slieve/s3.jpeg",
     img4Src : "/NewWebProject/img/slieve/s4.jpg",
     img5Src : "/NewWebProject/img/slieve/s5.jpg",
    },
];
    
    
    $scope.selectedItem="Selected Location";
    $scope.selectedAttraction = $scope.attractions[0];
        
    $scope.updateImages = function(attraction)
    {
    $("#image1").attr("src",attraction.img1Src);
    $("#image2").attr("src",attraction.img2Src);
    $("#image3").attr("src",attraction.img3Src);
    $("#image4").attr("src",attraction.img4Src);
    $("#image5").attr("src",attraction.img5Src);
    }
    
    $scope.updateSelectedItemText = function(info)
    {
 
      var summaryInfo = info.summary.description;
      //var properties = rawData[info.dbpediaUrl];
      console.log(summaryInfo);
      $scope.selectedItemWiki = summaryInfo;
    
    $scope.$apply(); 
//      for (key in summaryInfo) {
//        $('.summary .' + key).text(summaryInfo[key]);
//      }
//      $('.summary .thumbnail').attr('src', summaryInfo.image);
//      var dataAsJson = JSON.stringify(summaryInfo, null, '    ')
//      $('.summary .raw').val(dataAsJson);    
    }
               
    $scope.updateSelectedItem = function(selectedItem)
    {
    $scope.selectedItem = selectedItem;
    
        
           angular.forEach($scope.attractions, function(attraction, index){
             if(attraction.name === $scope.selectedItem)
             { 
                //$scope.updateImages(attraction);
                $scope.selectedAttraction = attraction;
                //console.log(attraction.wikipediaURL);
                var info = WIKIPEDIA.getData(attraction.wikipediaURL,$scope.updateSelectedItemText,function(error) {
                alert(error);
                });
             } 
            });
    

    $scope.$apply();    
    }
        
 
// 
//        
//        
//            $scope.activateTime = new Date();
//    $scope.loginTime = new Date();
//    $scope.doneActivate = false;
//    $scope.doneLogin = false;
//    $scope.activateHandle = "";
//        
//    $scope.user = UserService.user;
//    $scope.$broadcast( 'mainController.load' );
//
//        
//    ua.onNotification = function()
//    {
//        console.log("Entered ua.onNotification(jsonObject) with notificationType == " + jsonObject.notificationType);
//                var notificationType = jsonObject.notificationType;
//    
//                if (notificationType == 'User') {
//                    $scope.handleUserNotification(jsonObject);
//                } else if (notificationType == 'Work') {
//                    $scope.handleWorkNotification(jsonObject);
//                }
//    }
//        
//        
//        //HANDLE WORK NOTIFICATION
//        $scope.handleWorkNotification = function(jsonObject) {
//
//            console.log("Entered handleWORKNotification(jsonObject)");
//            console.log(jsonObject);
//            var workitemid;
//            var callingLineId;
//            var workitemState;
//
//            if (jsonObject.newValue != null) {
//
//                if (jsonObject.newValue.workId != null) {
//                    workitemid = jsonObject.newValue.workId;
//                }
//
//                if (jsonObject.newValue.state != null) {
//                    workitemState = jsonObject.newValue.state;
//                }
//
//                if (jsonObject.newValue.callingLineId != null) {
//                    callingLineId = jsonObject.newValue.callingLineId;
//                }
//
//                if (workitemid != null) {
//                    //currentWorkItemID = workitemid;
//                }
//
//            }
//
//            if (jsonObject.changeType == 'New') {
//
//                if ($('#' + workitemid).length == 0) //if the workitem doesn't already exist
//                {
//                    //$scope.createWorkItem("voice", workitemid, workitemState, callingLineId);
//                    UserService.addWork("voice", workitemid, workitemState, callingLineId);
//                }
//                
//            } else if (jsonObject.changeType == 'Update') {
//                
//                if ($('#' + workitemid).length > 0) //if the workitem does exist
//                {
//                    //$scope.updateWorkItem(workitemid, workitemState);
//                    UserService.updateWork(workitemid, workitemState);
//                }
//                
//            } else if (jsonObject.changeType == 'Deleted') {
//                 var currentWorkItemID =  $scope.currentSelectedWorkItemID;
//                 //$scope.releaseWorkItem(currentWorkItemID);
//                UserService.deleteWork(currentWorkItemID);
//            }
//
//        };
//
//        //HANDLE USER NOTIFICATION
//        $scope.handleUserNotification = function(jsonObject) {
//            console.log("Entered handleUserNotification(jsonObject)");
//            console.log(jsonObject);
//
//            UserService.setUserName(jsonObject.newValue.firstName, jsonObject.newValue.surname);
//            $scope.$apply();
//            
//            if (jsonObject.newValue.userState == null) {
//                
//                UserService.setUserState("loggedout");
//                
//                $scope.$broadcast( 'handleUserNotification.activate' );
//
//                
//            } else {
//                
//                var userState = jsonObject.newValue.userState;
//                UserService.setUserState(userState);
//                $scope.$apply();
//                //If we are logged in
//                if (jsonObject.newValue.userState.state === "LoggedIn") {
//                    
//                    $scope.$broadcast( 'handleUserNotification.login' );
//                    
//                } else {
//                    //If we are logged out
//                    if (jsonObject.newValue.userState.state === "LoggedOut") {
//                        
//                        $scope.$broadcast( 'handleUserNotification.logout' );
//
//                    }
//
//                }
//            }
//        };
//        
//
//              $scope.doneActivate = false;
//    $scope.doneLogin = false;
//    
//    $scope.compileUITemplates = function(jsonObject) {
//
//         $scope.compiledWITemplate = $compile('<udworkitem id="newWorkItem" ng-click="workItemClickEvent($event)"></udworkitem>')($scope);
//         $scope.compiledLoginTemplate = $compile('<udloginform></udloginform>')($scope);
//         $scope.compiledProfileTemplate = $compile('<udagentprofile></udagentprofile>')($scope);
//         $scope.compiledAgentStateTemplate = $compile('<udagentstate></udagentstate>')($scope);
//         $scope.compiledPerformanceTemplate = $compile('<udperformance></udperformance>')($scope);
//         $scope.compiledCallDetailsTemplate = $compile('<udvoicecalldetails></udvoicecalldetails>')($scope);
//    }
//
//    $scope.compileUITemplates();
//  
//        $scope.views = {
//            loginView: 'login',
//            activateView: 'activate',
//            mainView: 'main',
//            workitemView: 'workitems',
//        };
//
//        $scope.setCurrentView = function(newView) {
//            $scope.currentView = newView;
//            
//            console.log("CURRENT VIEW IS === " + $scope.currentView);
//        }
//                
//        $scope.setCurrentView($scope.views.loginView);
//        $scope.currentSelectedWorkItemID = 0;
//        
//
//
//
//              //DOCUMENT READY EVENT
//        angular.element(document).ready(function() {
//        initMainApp();
//
//        });
//        
//        $scope.createTestWorkNotification = function() {
//            var TestWorkNotification = new TestNotification("Work", "Work", "123456", "abc123", "New", "WorkState", true);
//            $scope.handleNotification(TestWorkNotification);
//        };
//
//
//        
//    
//                                         
//                                         
//                                                                                  
    }
                                         
]);



