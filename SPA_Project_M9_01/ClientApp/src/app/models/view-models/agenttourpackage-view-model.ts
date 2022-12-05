import { Agenttourpackage } from "../data/agenttourpackage";

export interface AgenttourpackageViewModel {
    travelAgentId?:number;
    agentName?:string;
    email?:string;
    agentAddress?:string;
    agentTourPackages?:Agenttourpackage[];
}
