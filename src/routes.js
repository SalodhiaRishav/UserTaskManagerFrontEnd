import Login from "@/components/Login.vue";
import ReportChart from "@/components/ReportChart.vue";
import ReportTable from "@/components/ReportTable.vue";
import TaskEntry from "@/components/TaskEntry.vue";
import RegisterUser from "@/components/RegisterUser.vue";

export const routes = [
  {
    path: "/table",
    component: ReportTable
  },
  {
    path: "/register",
    component: RegisterUser
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
    path: "/login",
    component: Login
  },
  {
    path: "/",
    redirect: "/login"
  }
];
