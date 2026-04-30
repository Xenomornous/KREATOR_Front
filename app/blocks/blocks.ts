
export type Option = {
  id: string;
  label: string;
};

export type TextBlock = {
  description: string;
  answer: string;
};

export type RadioBlock = {
  description: string;
  options: Option[];
  selected: string | null; // 👈 FIX
};

export type CheckboxBlock = {
  description: string;
  options: Option[];
  selected: string[];
};

export type Block =
  | { id: string; type: "text"; content: TextBlock; position: number }
  | { id: string; type: "radio"; content: RadioBlock; position: number }
  | { id: string; type: "checkbox"; content: CheckboxBlock; position: number };

export const blockTypes = [
  {
    type: "text",
    label: "Tekst (opis + input)",
    defaultContent: {
      description: "Wpisz opis",
      answer: ""
    }
  },

  {
    type: "radio",
    label: "Radio (1 z wielu)",
    defaultContent: {
      description: "Wybierz jedną opcję",
      options: [
        { id: crypto.randomUUID(), label: "Opcja 1" },
        { id: crypto.randomUUID(), label: "Opcja 2" }
      ],
      selected: null // 👈 FIX
    }
  },

  {
    type: "checkbox",
    label: "Checkbox",
    defaultContent: {
      description: "Zaznacz poprawne",
      options: [
        { id: crypto.randomUUID(), label: "Opcja 1" },
        { id: crypto.randomUUID(), label: "Opcja 2" }
      ],
      selected: []
    }
  }
];

