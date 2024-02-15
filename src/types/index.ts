export interface IAccordionItem {
  id: string
  title: string
  childs?: IAccordionItem[]
}

export interface IAccordionHeadings {
  name: string,
  value: string | number,
  icon?: string,
  boldName?: boolean
}