import DashboardLayout from "@/layout/dashboard/DashboardLayout.vue";
// GeneralViews

//Views
import InsuranceCompaniesHome from "@/views/InsuranceCompaniesHome"
import InsuredPersonsHome from "@/views/InsuredPersonsHome"
import AgentsHome from "@/views/AgentsHome"
import AppraisalCompaniesHome from "@/views/AppraisalCompaniesHome"
import AppraisersHome from "@/views/AppraisersHome"
import InsuredEventsHome from "@/views/InsuredEventsHome"
import SDPHome from "@/views/SDPHome"

import NotFound from "@/pages/NotFoundPage.vue";

import Registration from "@/pages/Registration"
import Auth from "@/pages/Auth"

// Admin pages
import InsuranceCompanies from "@/pages/InsuranceCompanies/InsuranceCompanies";
import NewInsuranceCompany from "@/pages/InsuranceCompanies/NewInsuranceCompany";
import InsuranceCompanyDetail from "@/pages/InsuranceCompanies/InsuranceCompanyDetail"
import AppraisalCompanies from "@/pages/AppraisalCompanies/AppraisalCompanies"
import AppraisalCompanyDetail from "@/pages/AppraisalCompanies/AppraisalCompanyDetail"
import NewAppraisalCompany from "@/pages/AppraisalCompanies/NewAppraisalCompany"
import InsuredEvents from "@/pages/InsuredEvents/InsuredEvents"
import NewInsuredEvent from "@/pages/InsuredEvents/NewInsuredEvent"
import InsuredEventDetail from "@/pages/InsuredEvents/InsuredEventDetail"
import InsuredPersons from "@/pages/InsuredPersons/InsuredPersons"
import NewInsuredPerson from "@/pages/InsuredPersons/NewInsuredPerson"
import InsuredPersonDetail from "@/pages/InsuredPersons/InsuredPersonDetail"
import SDP from "@/pages/SDP/SDP"
import NewSDP from "@/pages/SDP/NewSDP"
import SDPDetail from "@/pages/SDP/SDPDetail"
import Agents from "@/pages/Agents/Agents"
import AgentDetail from "@/pages/Agents/AgentDetail"
import NewAgent from "@/pages/Agents/NewAgent"
import Appraisers from "@/pages/Appraisers/Appraisers"
import AppraiserDetail from "@/pages/Appraisers/AppraiserDetail"
import NewAppraiser from "@/pages/Appraisers/NewAppraiser"



const routes = [
  {
    path: "/registration",
    component: Registration
  },
  {
    path: "/auth",
    component: Auth
  },
  {
    path: "/",
    component: DashboardLayout,
    meta: { isAuth: true },
    redirect: "/insurance-companies",
    children: [
      {
        path: "insurance-companies",
        name: "insurance-companies-home",
        redirect: { name: "insurance companies" },
        component: InsuranceCompaniesHome,
        children: [
          {
            path: "",
            name: "insurance companies",
            component: InsuranceCompanies,
            meta: { requiredRole: "superadmin" }
          },
          {
            path: "new",
            name: "new-insurance company",
            component: NewInsuranceCompany,
            meta: { requiredRole: "superadmin" }
          },
          {
            path: ":insuranceCompanyId",
            name: "insrance company",
            component: InsuranceCompanyDetail,
            meta: { requiredRole: "superadmin" }
          },
        ]
      },
      {
        path: "agents",
        name: "agents-home",
        redirect: { name: "agents" },
        component: AgentsHome,
        children: [
          {
            path: "",
            name: "agents",
            component: Agents
          },
          {
            path: "new",
            name: "new agent",
            component: NewAgent
          },
          {
            path: ":agentId",
            name: "agents",
            component: AgentDetail
          },
        ]
      },
      {
        path: "insured-events",
        name: "insured-events-home",
        component: InsuredEventsHome,
        redirect: { name: "insured-events" },
        children: [
          {
            path: "",
            name: "insured events",
            component: InsuredEvents
          },
          {
            path: "new",
            name: "new insured event",
            component: NewInsuredEvent
          },
          {
            path: ":insuredEventId",
            name: "insured event",
            component: InsuredEventDetail
          },
        ]
      },
      {
        path: "sdp",
        name: "sdp-home",
        redirect: { name: "sdp" },
        component: SDPHome,
        children:
          [
            {
              path: "",
              name: "all sdp",
              component: SDP
            },
            {
              path: "new",
              name: "new sdp",
              component: NewSDP
            },
            {
              path: ":SDPId",
              name: "sdp",
              component: SDPDetail
            },
          ]
      },
      {
        path: "insured-persons",
        component: InsuredPersonsHome,
        name: "insured-persons-home",
        redirect: { name: "insured-persons" },
        children:
          [{
            path: "",
            name: "insured persons",
            component: InsuredPersons
          },
          {
            path: "new",
            name: "new insured person",
            component: NewInsuredPerson
          },
          {
            path: ":insuredPersonId",
            name: "insured person",
            component: InsuredPersonDetail
          },
          ]
      },
      {
        path: "appraisal-companies",
        name: "appraisal-companies-home",
        redircet: { name: "appraisal-companies" },
        component: AppraisalCompaniesHome,
        children:
          [{
            path: "",
            name: "appraisal companies",
            component: AppraisalCompanies
          },
          {
            path: "new",
            name: "new appraisal company",
            component: NewAppraisalCompany
          },
          {
            path: ":appraisalCompanyId",
            name: "appraisal company",
            component: AppraisalCompanyDetail
          },]
      },
      {
        path: "appraisers",
        name: "appraisers-home",
        redirect: { name: "appraisers" },
        component: AppraisersHome,
        children:
          [{
            path: "appraisers",
            name: "appraisers",
            component: Appraisers
          },
          {
            path: "new",
            name: "new appraiser",
            component: NewAppraiser
          },
          {
            path: ":appraiserId",
            name: "appraiser",
            component: AppraiserDetail
          }
          ]
      }
    ]
  },
  { path: "*", component: NotFound }
];

/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * The specified component must be inside the Views folder
 * @param  {string} name  the filename (basename) of the view to load.
function view(name) {
   var res= require('../components/Dashboard/Views/' + name + '.vue');
   return res;
};**/

export default routes;
