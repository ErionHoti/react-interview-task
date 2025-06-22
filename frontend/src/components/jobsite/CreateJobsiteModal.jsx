import Modal from "../common/Modal";
import Select, { components } from "react-select";
import { RiInformation2Fill } from "react-icons/ri";
import { IoClose, IoCheckmarkSharp } from "react-icons/io5";
import { FaTimes, FaCheck } from "react-icons/fa";
import Button from "../common/Button";
import React, { useState } from "react";
import { statusOptions, categoryOptions } from "../common/SelectOptions";
const MultiValue = () => null;

const Option = (props) => {
  const { data, isSelected, isFocused, innerRef, innerProps } = props;

  return (
    <div
      ref={innerRef}
      {...innerProps}
      style={{
        backgroundColor: isSelected
          ? data.color
          : isFocused
          ? "#f3f4f6"
          : "white",
        color: isSelected ? "white" : "black",
        padding: "8px 12px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        cursor: "pointer",
      }}
    >
      <span>{data.label}</span>
      {isSelected && <IoCheckmarkSharp color="white" />}
    </div>
  );
};

const SingleValue = ({ data, ...props }) => (
  <components.SingleValue {...props}>
    <span
      style={{
        display: "inline-block",
        width: 10,
        height: 10,
        borderRadius: "50%",
        backgroundColor: data.color,
        marginRight: 6,
      }}
    />
    {data.label}
  </components.SingleValue>
);

const CreateJobsiteModal = ({ onClose, onAddJobsite }) => {
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [status, setStatus] = useState(null);
  const handleSave = async () => {
    if (!name || !status) {
      alert("Please enter a name and select a status.");
      return;
    }

    const newJobsite = {
      name,
      status: status.value,
      categories,
    };

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/jobsites`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newJobsite),
      });

      const savedJobsite = await res.json();

      onAddJobsite(savedJobsite);
      onClose();
    } catch (err) {
      console.error("Failed to save jobsite:", err);
      alert("Failed to save jobsite. Try again.");
    }
  };

  return (
    <Modal onClose={onClose}>
      <div>
        <div className="px-4 space-y-1">
          <div>
            <label className="font-semibold tracking-wider text-sm ml-2">
              Name
            </label>
            <input
              type="text"
              className="mt-1 w-full bg-gray-200 border border-gray-300 px-2 py-1 rounded"
              placeholder="Type the jobsite's name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="flex flex-col md:flex-row gap-3">
            <div className="w-full md:w-2/3">
              <label className="font-semibold tracking-wider text-sm ml-2">
                Category Included
              </label>
              <Select
                options={categoryOptions}
                isMulti
                placeholder="Select"
                onChange={setCategories}
                value={categories}
                components={{ MultiValue, Option }}
                closeMenuOnSelect={false}
                hideSelectedOptions={false}
                styles={{
                  control: (base, state) => ({
                    ...base,
                    backgroundColor: "#e5e7eb",
                    borderColor: state.isFocused ? "#9ca3af" : "#d1d5db",
                    boxShadow: "none",
                    "&:hover": {
                      borderColor: "#9ca3af",
                    },
                  }),
                  indicatorSeparator: () => ({ display: "none" }),
                }}
              />

              {categories.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {categories.map((cat) => (
                    <div
                      key={cat.value}
                      className="flex items-center gap-2 px-2 py-1 text-sm cursor-default select-none"
                    >
                      <span
                        style={{
                          display: "inline-block",
                          width: 10,
                          height: 10,
                          borderRadius: "50%",
                          backgroundColor: cat.color,
                        }}
                      />

                      <span>{cat.label}</span>

                      <IoClose
                        className="cursor-pointer bg-red text-white "
                        size={18}
                        onClick={() =>
                          setCategories(
                            categories.filter((c) => c.value !== cat.value)
                          )
                        }
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="w-full md:w-1/3">
              <label className="font-semibold tracking-wider text-sm ml-2">
                Status
              </label>
              <Select
                options={statusOptions}
                placeholder="Select one"
                onChange={setStatus}
                value={status}
                components={{ SingleValue }}
                styles={{
                  control: (base) => ({
                    ...base,
                    backgroundColor: "#e5e7eb",
                    borderColor: "#d1d5db",
                    boxShadow: "none",
                  }),
                  indicatorSeparator: () => ({ display: "none" }),
                  option: (base, { data, isFocused }) => ({
                    ...base,
                    backgroundColor: isFocused ? data.color : "white",
                    color: isFocused ? "white" : "black",
                    cursor: "pointer",
                    marginBottom: "2px",
                  }),
                }}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 p-4 mt-22">
          <Button
            text="Cancel Changes"
            icon={<FaTimes />}
            color="bg-red"
            onClick={onClose}
          />
          <Button
            text="Save Changes"
            icon={<FaCheck />}
            color="bg-green"
            onClick={handleSave}
          />
        </div>
      </div>
    </Modal>
  );
};

export default CreateJobsiteModal;
