// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  API_USERSERVICE: "http://localhost:4000/api/user",
  API_PROJECTSERVICE: "http://localhost:4000/api/project",
  API_TASKSERVICE: "http://localhost:4000/api/task",
  API_PGROUPSERVICE: "http://localhost:4000/api/pgroup",
  API_KPISERVICE: "http://localhost:4000/api/kpi",
  API_FUNDRAISINGSERVICE: "http://localhost:4000/api/fundraising"

};



/*

 * For easier debugging in development mode, you can import the following file

 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
