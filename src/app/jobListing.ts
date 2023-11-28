export interface JobListing{
    id: number;
    companyName : string;
    roleName: string;
    city: string;
    country: string;
    aboutCompany: string;
    aboutRole: string;
    skills: string[];
    responsibilities: string[];
    niceToHave: string[];
  }