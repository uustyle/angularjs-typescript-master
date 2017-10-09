namespace app.hello {
	"use strict";

	export interface TestScope extends ng.IScope {
		name?: string;
		temp?: string;
	}

	export class SampleController {

		scope = null;;


		constructor( 
		// private customers,
		private $scope: TestScope,
		private $timeout,
		private $state: ng.ui.IStateProvider) {
			
console.log("constructor", this.$state.current.name, $scope);
// console.log(customers);
			
			$scope.name = "サーバと通信中";
			$scope.temp = "仮";

// this.scope = $scope;
$scope.$on('event1', function(event, args) {
console.log('event11', event.targetScope,event.currentScope);
});

		}


        filedownload() {

console.log("filedownload");
this.$state.go("sample");


        }		


        broad() {

// this.$state.go("sample");
this.$state.go("sample");

let sc = this.$scope;

     this.$timeout(function() {
       /* 任意の非同期処理 */
	   console.log("send",sc);
sc.$broadcast('event1', "");

     },3000);

// this.$scope.$broadcast('event1', "");

//this.$state.go("sample");

        }		



		// update() {
		// 	this.sampleService.test();
		// }
	}

}
