var priApp = angular.module('priApp', ['angularMoment']);

priApp.run([
    '$rootScope',
    '$window',
    function($rootScope, $window) {
        var firebaseConfig = {
            apiKey: "AIzaSyBlQuibtEZ-B-D-lztUvdV37XBP-f3imYM",
            authDomain: "lion00098-4f2af.firebaseapp.com",
            projectId: "lion00098-4f2af",
            storageBucket: "lion00098-4f2af.appspot.com",
            messagingSenderId: "696698867184",
            appId: "1:696698867184:web:d49986d4a6ecd50f2b6135",
            measurementId: "G-2T3HZL3SW3"
        };
        // Initialize Firebase
        try {
            $window.firebase.initializeApp(firebaseConfig);
            $window.firebase.analytics();
            $rootScope.db = firebase.firestore();
            $rootScope.storage = firebase.storage();
        } catch (error) {}
    },
]);

priApp.controller('RegController', function(
    $scope,
    moment,
    $window,
    $rootScope,
    $timeout
) {
    $scope.user = {
        firstName: '',
        lastName: '',
        dob: '',
        ssn: '',
        idNumber: '',
        city: '',
        address: '',
        state: '',
        zipcode: '',



    };
    $scope.applicants = [];
    // loadApplicants();

    console.log("Inside Application");



    $scope.submitForm = function() {

        if ($scope.user.firstName === "") {
            alert("FirstName cannot be empty!");
            return;

        }


        if ($scope.user.lastName === "") {
            alert("LastName cannot be empty!");
            return;

        }
        var guid = createGuid();
        $rootScope.db
            .collection('application_form')
            .doc(`${guid}`)
            .set({
                id: `${ guid}`,
                firstName: `${$scope.user.firstName}`,
                lastName: `${$scope.user.lastName}`,
                dob: `${$scope.user.dob}`,
                ssn: `${$scope.user.ssn}`,
                idNumber: `${$scope.user.idNumber}`,
                address: `${$scope.user.address}`,
                city: `${$scope.user.city}`,
                state: `${$scope.user.state}`,
                zipcode: `${$scope.user.zipcode}`,
            })
            .then(() => {
                $scope.user = {};
                //alert(`Application was  successfully posted!`);
                $window.location.href = "./page2.html";

            })
            .catch(error => {
                console.error('Error adding document: ', error);
            });
    }




    function createGuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0,
                v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    function loadApplicants() {

        try {
            $rootScope.db.collection('application_form').get().then(result => {
                const data = result.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));



                $scope.$apply(function() {
                    $scope.applicants = data;
                    console.log(data);


                });
            });

        } catch (error) {

        }

    }

});

priApp.controller('Page2Controller', function(
    $scope,
    moment,
    $window,
    $rootScope,
    $timeout
) {
    $scope.user = {
        firstName: '',
        lastName: '',
        dob: '',
        ssn: '',
        idNumber: '',
        city: '',
        address: '',
        state: '',
        zipcode: '',



    };
    $scope.applicants = [];
    loadApplicants();





    function loadApplicants() {

        try {
            $rootScope.db.collection('winners').get().then(result => {
                const data = result.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                $scope.$apply(function() {
                    $scope.applicants = data;
                    console.log(data);


                });
            });

        } catch (error) {

        }

    }

});