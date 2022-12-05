import { Agenttourpackage } from "./agenttourpackage";

export interface TravelAgent {
    travelAgentId?:number;
    agentName?:string;
    email?:string;
    agentAddress?:string;
    agentTourPackages?:Agenttourpackage[];
}
