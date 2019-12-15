const x = 'http://localhost:4000'
// const x = '52.221.201.9:4000';

export const environment = {
  production: true,
  API_USERSERVICE: x + "/api/user",
  API_PROJECTSERVICE: x + "/api/project",
  API_TASKSERVICE: x + "/api/task",
  API_PGROUPSERVICE: x + "/api/pgroup",
  API_KPISERVICE: x + "/api/kpi",
  API_FUNDRAISINGSERVICE: x + "/fundraising"
};
