import { FormEvent, RefObject } from 'react';

type Props = {
  inputDistrict: RefObject<HTMLSelectElement | null>;
  inputNumber: RefObject<HTMLInputElement | null>;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export const GameDialogForm = ({ inputDistrict, inputNumber, onSubmit }: Props) => {
  return (
    <form onSubmit={onSubmit} className="h-full w-full flex flex-wrap h-full gap-2 items-center">
      <label className="text-sm font-semibold text-gray-700" htmlFor="district">
        Локация:
      </label>
      <select
        ref={inputDistrict}
        id="district"
        className="p-2 border border-gray-500 rounded text-sm flex-1 min-w-[100px]"
      >
        <option value="">Выберите</option>
        <option value="А">А — Аптаун</option>
        <option value="Д">Д — Даунтаун</option>
        <option value="И">И — Исттаун</option>
        <option value="Н">Н — Нортсайд</option>
        <option value="Р">Р — Ривертаун</option>
        <option value="С">С — Саутсайд</option>
        <option value="Т">Т — Торговый район</option>
        <option value="У">У — Университет</option>
        <option value="Ф">Ф — Френч-хилл</option>
      </select>

      <label className="text-sm font-semibold text-gray-700" htmlFor="location">
        Код:
      </label>
      <input
        type="number"
        min="1"
        max="100"
        id="location"
        ref={inputNumber}
        className="p-2 border border-gray-500 rounded text-sm w-20"
        placeholder="№"
      />

      <button
        type="submit"
        className="px-4 py-2 bg-[#8b5e3c] hover:bg-[#6b3f22] text-white text-sm font-bold rounded shadow whitespace-nowrap"
      >
        Перейти
      </button>
    </form>
  );
};
