
function initialize() {
    var mapCanvas = document.getElementById('map_canvas');
    var mapOptions = {
      center: new google.maps.LatLng(55.0237, -7.4275),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    var map = new google.maps.Map(mapCanvas, mapOptions);
  }


function setMapLocation(lat,long)
{
    console.log("Lat is " + lat + " Long is " + long);
    gMap = new google.maps.Map(document.getElementById('map_canvas')); 
    gMap.setZoom(15);      // This will trigger a zoom_changed on the map
    gMap.setCenter(new google.maps.LatLng(lat, long));
}

google.maps.event.addDomListener(window, 'load', initialize);

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
        
    $scope.selectedItemWiki = "This is random wiki text";
    
    $scope.attractions = [
    {name: "Grianan of Aileach",
     wikipediaURL : 'http://en.wikipedia.org/wiki/Grianan_of_Aileach',
     img1Src : "/NewWebProject/img/grianan/g1.Jpg",
     img2Src : "/NewWebProject/img/grianan/g2.jpg",
     img3Src : "/NewWebProject/img/grianan/g3.jpg",
     img4Src : "/NewWebProject/img/grianan/g4.jpg",
     img5Src : "/NewWebProject/img/grianan/g5.jpg",
     lat: 55.0237,
     long: -7.4275,
    },
         {name: "Malin Head",
     wikipediaURL : 'http://en.wikipedia.org/wiki/Malin_Head',
     img1Src : "/NewWebProject/img/malin/m1.jpg",
     img2Src : "/NewWebProject/img/malin/m2.jpg",
     img3Src : "/NewWebProject/img/malin/m3.jpg",
     img4Src : "/NewWebProject/img/malin/m4.jpg",
     img5Src : "/NewWebProject/img/malin/m5.jpg",
     lat: 55.3527795,
     long: -7.33208,
    },
         {name: "Slieve League",
     wikipediaURL : 'http://en.wikipedia.org/wiki/Slieve_League',
     img1Src : "/NewWebProject/img/slieve/s1.JPG",
     img2Src : "/NewWebProject/img/slieve/s2.jpg",
     img3Src : "/NewWebProject/img/slieve/s3.jpeg",
     img4Src : "/NewWebProject/img/slieve/s4.jpg",
     img5Src : "/NewWebProject/img/slieve/s5.jpg",
               lat: 54.6367862,
     long: -8.6814817,
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
 
    }
               
    $scope.updateSelectedItem = function(selectedItem)
    {
    $scope.selectedItem = selectedItem;
    
        
           angular.forEach($scope.attractions, function(attraction, index){
             if(attraction.name === $scope.selectedItem)
             { 
                //$scope.updateImages(attraction);
                $scope.selectedAttraction = attraction;
                setMapLocation(attraction.lat,attraction.long);
                //console.log(attraction.wikipediaURL);
                var info = WIKIPEDIA.getData(attraction.wikipediaURL,$scope.updateSelectedItemText,function(error) {
                alert(error);
                });
             } 
            });
    

    $scope.$apply();    
    }
    
    var init = function () {
      console.log("Document loaded fired");
           var elementHTML =  "Grianan of Aileach";
          
           $scope.updateSelectedItem(elementHTML);
           console.log("Selected Item is : " + $scope.selectedItem);
          
    };
    init();
  
    $scope.$on('$viewContentLoaded', function() {
            
    });
                                                                                       
    }
                                         
]);



