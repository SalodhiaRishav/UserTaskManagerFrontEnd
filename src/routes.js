import Login from "@/components/Login.vue";
import ReportChart from "@/components/ReportChart.vue";
import ReportTable from "@/components/ReportTable.vue";
import TaskEntry from "@/components/TaskEntry.vue";

export const routes = [
  {
    path: "/login",
    component: Login
  },
  {
    path: "/table",
    component: ReportTable
  },
  {
    path: "/chart",
    component: ReportChart
  },
  {
    path: "/task",
    component: TaskEntry
  },
  {
    path: "/",
    redirect: "/login"
  }
];
