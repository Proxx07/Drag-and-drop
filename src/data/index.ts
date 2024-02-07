import type {IAccordionItem} from "@/types";
export const list: IAccordionItem[] = [
  {
    id: 'Mastercard',
    title: 'Mastercard',
    childs: [
      {
        id: 'MastercardStandart',
        title: 'Mastercard (Standart)',
      },
      {
        id: 'MastercardWorld',
        title: 'Mastercard (World)',
      },
      {
        id: 'MastercardPlatinum',
        title: 'Mastercard (Platinum)'
      },
      {
        id: 'MastercardGold',
        title: 'Mastercard (Gold)'
      },
      {
        id: 'MastercardTest',
        title: 'Mastercard (Test)'
      }

    ]
  },

  {
    id: 'Deposits',
    title: 'Вклады',
    childs: [
      {
        id: 'DepositsChild-1',
        title: 'Максимал фойда (Нац. валюта)',
      },
      {
        id: 'DepositsChild-2',
        title: 'On-line (Нац. валюта)'
      },
      {
        id: 'DepositsChild-3',
        title: 'Аванс (Нац. валюта)',
      },
      {
        id: 'DepositsChild-4',
        title: 'Максимал фойда (Ин. валюта)',
      },

      {
        id: 'DepositChild-5',
        title: 'On-line (Ин. валюта)',
      },

      {
        id: 'DepositChild-6',
        title: 'Аванс (Ин. валюта)'
      }
    ]
  },

  {
    id: 'ItemWithChilds',
    title: 'Item with childs',
    childs: [
      {
        id: "child-1",
        title: "ChildTitle-1"
      },
      {
        id: "child-2",
        title: "ChildTitle-2"
      },
      {
        id: "child-3",
        title: "ChildTitle-3",
        childs: [
          {
            id: "child-3-1",
            title: "ChildTitle-3-1",
          },
          {
            id: "child-3-2",
            title: "ChildTitle-3-2",
          }
        ]
      }
    ]
  },

  {
    id: 'SingleItem',
    title: 'Bla bla bla'
  }
]