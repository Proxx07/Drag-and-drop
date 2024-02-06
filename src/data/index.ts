import type {IAccordionItem} from "@/types";
export const list: IAccordionItem[] = [
  {
    id: 'item-1',
    title: 'Accordion title 1',
    childs: [
      {
        id: 'subitem-1-1',
        title: 'Subitem title 1-1',
      },
      {
        id: 'subitem-1-2',
        title: 'Subitem title 1-2',
      }
    ]
  },

  {
    id: 'item-2',
    title: 'Accordion title 2',
    childs: [
      {
        id: 'subitem-2-1',
        title: 'Subitem title 2-1',
      },
      {
        id: 'subitem-2-2',
        title: 'Subitem title 2-2',
        childs: [
          {
            id: 'subitem-2-2-1',
            title: 'Subitem title 2-2-1',
          },
          {
            id: 'subitem-2-2-2',
            title: 'Subitem title 2-2-2',
          }
        ]
      }
    ]
  },

  {
    id: 'item-3',
    title: 'Accordion title 3',
  },
]