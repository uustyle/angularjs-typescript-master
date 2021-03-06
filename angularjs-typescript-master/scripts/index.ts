///<reference path='../typings/angularjs/angular.d.ts' />
///<reference path='../typings/angularjs/angular-route.d.ts' />

///<reference path='./hello/index.ts' />
///<reference path='./hello/SampleController.ts' />

namespace app {
	"use strict";

	// angular.module(
	// 	"app",
	// 	["ngRoute", "app.hello", "app.utils"],
	// 	($routeProvider: ng.route.IRouteProvider, $locationProvider: ng.ILocationProvider)=> {
	// 		$routeProvider
	// 			.when("/sample", {
	// 				templateUrl: "/template/sample.html"
	// 			})
	// 			.otherwise({
	// 				templateUrl: "/template/main.html"
	// 			});
	// 		$locationProvider.html5Mode(true);
	// 	}
	// )
	// 	.run(($rootScope: ng.IRootScopeService, $routeParams: ng.route.IRouteParamsService)=> {
	// 		false;
	// 	})
	// ;



	angular.module('app', ['ui.router'])
		.config(function($stateProvider, $urlRouterProvider) {
			$stateProvider
				.state('app', {
					url: '/',
					templateUrl: 'templates/main.html'
				})
				.state('articles', {
					url: '/articles',
					templateUrl: 'templates/articles.html'
				})
				.state('sample', {
					url: '/sample',
					
					resolve: {
						customers: function () {
						return ['Alice', 'Bob'];
						}
					},					
					// controller: 'SampleController',
					// controllerAs: 'c',
					templateUrl: 'templates/sample.html'
				})

				.state('sample2', {
					url: '/sample2',
					
					resolve: {
						customers: function () {
						return ['Alice', 'Bob'];
						}
					},					
					controller: 'SampleController',
					controllerAs: 'c',
					templateUrl: 'templates/sample2.html'
				})




			//   .state('app.customer', {
			//     url: 'customer',
			//     controller: function () {
			//       // 処理色々...
			//     },
			//     controllerAs: 'customerCtrl',
			//     templateUrl: 'app/customer.html'
			//   })
			;
			$urlRouterProvider.otherwise('/');
		});
	
		angular.module("app").controller("SampleController", app.hello.SampleController);

	
	// モジュールの定義。filterに関するモジュール。
	angular.module(
		"app.utils",
		[],
		() => {
			false;
		}
	)
	/**
	 * 指定した要素を {@type Array} 内から除外するフィルタ。
	 * @function
	 * @param {Array|Object} options
	 * @param {Array} [options.exclude] 除外する対象
	 * @param {function} [options.compare]
	 */
		.filter("rmDuplicated", () => {
			return (input: any[], options: any) => {
				if (angular.isUndefined(input)) {
					return input;
				} else if (!angular.isArray(input)) {
					console.error("input is not array.", input);
					return input;
				}
				var excludeList: any;
				if (angular.isUndefined(options)) {
					console.error("options is required.");
					return input;
				} else if (angular.isArray(options)) {
					excludeList = options;
				} else if (angular.isArray(options.exclude)) {
					excludeList = options.exclude;
				}
				var compareFn = (a: any, b: any) => {
					return a.$key.keystr === b.$key.keystr;
				};
				if (angular.isUndefined(options)) {
					false;
				} else if (angular.isFunction(options.compare)) {
					compareFn = options.compare;
				}

				var result: any[] = [];
				input.forEach((data) => {
					if (!excludeList.some((exclude: any) => compareFn(data, exclude))) {
						result.push(data);
					}
				});

				return result;
			};
		}
		)
	;
}
