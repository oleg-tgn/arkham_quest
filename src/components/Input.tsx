type Props = {
  name: string;
  ref?: React.Ref<HTMLInputElement>;
  placeholder?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const Input = ({ name, ref, placeholder, onChange }: Props) => {
  return (
    <input
      name={name}
      type="text"
      className="p-2 border-b-2 border-[#6b3f22] w-full text focus:outline-none focus:ring-0"
      placeholder={placeholder}
      ref={ref}
      onChange={onChange}
    />
  );
};
