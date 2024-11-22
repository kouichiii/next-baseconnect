type CheckboxProps = {
    label: string;
    onChange: (label: string, isChecked: boolean) => void
};

export default async function Checkbox(props:CheckboxProps){

  
    return (
      <label className="inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
        //   checked={isChecked}
        //   onChange={handleChange}
          className=
          "appearance-none h-4 w-4 border-2 border-gray-300  checked:bg-blue-500 checked:border-transparent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200"
        />
        <span className="ml-2 text-gray-700">{props.label}</span>
      </label>
    );
}