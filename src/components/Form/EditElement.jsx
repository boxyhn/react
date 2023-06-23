import { useState } from "react";

export const EditElement = ({
  element,
  formData,
  setFormData,
  handleFormData,
  handleUpdateInfoSubmit,
}) => {
  const [editElement, setEditElement] = useState(false);
  const [originalValue, setOriginalValue] = useState(null);
  const elementName = element;

  return (
    <div className="w-full px-10 mt-4">
      <label htmlFor={elementName} className="label text-lg font-bold ">
        {elementName}
      </label>
      <div className="mt-1">
        {editElement ? (
          <div className="flex">
            <input
              required
              type={elementName}
              id={elementName}
              className="input"
              onChange={handleFormData}
              value={formData[elementName]}
            />
            <button
              className="bg-black text-white font-medium hover:text-black rounded-xl text-lg p-3.5
              ml-5"
              onClick={(e) => {
                e.preventDefault();
                setEditElement(false);
                setFormData({ ...formData, [elementName]: originalValue });
              }}
            >
              Back
            </button>
            <button
              className="bg-black text-white font-medium hover:text-black rounded-xl text-lg p-3.5
              ml-5"
              onClick={() => {
                setEditElement(false);
                handleUpdateInfoSubmit(formData);
              }}
            >
              Done
            </button>
          </div>
        ) : (
          <div className="flex">
            <p className="border-b-2 border-white w-full px-6 py-3 text-white bg-transparent placeholder-opacity-50 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent">
              {formData[elementName]}
            </p>
            <button
              className="bg-black text-white font-medium hover:text-black rounded-xl text-lg p-3.5
              ml-5"
              onClick={(e) => {
                e.preventDefault();
                setEditElement(true);
                setOriginalValue(formData[elementName]);
              }}
            >
              Edit
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
