import React from "react";

interface TextInputProps {
  label: string;
  value: string | number | undefined;
  onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
  tailwindInputStyle?: string;
  disabled?: boolean;
}

function TextInput({
  label,
  value,
  onChange,
  tailwindInputStyle = "",
  disabled = false,
}: TextInputProps) {
  return (
    <div>
      <p className="text-sm">{label}</p>

      <input
        disabled={disabled}
        type="text"
        className={`border border-black rounded-sm ${tailwindInputStyle}`}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default TextInput;
