export type MetricMap=Record<string,string>

export interface Project{
  id:number
  title:string
  subtitle:string
  description:string
  category:string
  technologies:string[]
  link?:string
  github?:string
  images?:string[]
  features:string[]
  metrics:MetricMap
  year:string
  status:string
}

