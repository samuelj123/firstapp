// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

// const x = 'EC2-13-250-44-92.ap-southeast-1.compute.amazonaws.com:4000'
const x = 'http://localhost:8080';
export const environment = {
  production: false,
  API_USERSERVICE: x + "/api/user",
  API_PROJECTSERVICE: x + "/api/project",
  API_TASKSERVICE: x + "/api/task",
  API_PGROUPSERVICE: x + "/api/pgroup",
  API_KPISERVICE: x + "/api/kpi",
  API_FUNDRAISINGSERVICE: x + "/api/fundraising",
  API_LANGUAGE: x + "/api/language",
  API_BUDGET: x + "/api/budget"

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
