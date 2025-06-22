import Modal from "../common/Modal";
import Select from "react-select";
import { FaCheck } from "react-icons/fa";
import Button from "../common/Button";
import { itemOptions } from "../common/SelectOptions";


const InventoryModal = ({
  row,
  index,
  rows,
  setRows,
  onClose,
  onSave,
}) => {
  const handleChange = (field, value) => {
    setRows((prev) =>
      prev.map((r, i) => (i === index ? { ...r, [field]: value } : r))
    );
  };

  return (
    <Modal onClose={onClose}>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block font-medium text-sm">Item</label>
          <Select
            options={itemOptions}
            value={
              itemOptions.find((option) => option.value === row.item) || null
            }
            onChange={(selectedOption) =>
              handleChange("item", selectedOption ? selectedOption.value : "")
            }
            styles={{
              control: (base) => ({
                ...base,
                backgroundColor: "#f4f5f6",
                border: "none",
              }),
              indicatorSeparator: () => ({ display: "none" }),
            }}
            placeholder="Search & Select item"
            isClearable
          />
        </div>
        <div>
          <label className="block font-medium text-sm">Quantity</label>
          <input
            type="text"
            className="w-full bg-grey p-2 rounded-[6px]"
            value={row.quantity}
            onChange={(e) => handleChange("quantity", e.target.value)}
          />
        </div>
      </div>

      <div className="mt-4">
        <label className="block font-medium text-sm">Description</label>
        <input
          type="text"
          className="w-full bg-grey p-2 rounded-[6px] h-[80px]"
          placeholder="Type a description..."
          value={row.description}
          onChange={(e) => handleChange("description", e.target.value)}
        />
      </div>

      <div className="mt-2">
        <label className="block font-medium text-sm">Notes</label>
        <input
          type="text"
          placeholder="Type a note..."
          className="w-full bg-grey p-2 rounded-[6px] h-[80px]"
          value={row.notes}
          onChange={(e) => handleChange("notes", e.target.value)}
        />
      </div>

      <div className="flex justify-end gap-2 mt-4">
        <Button
          text="Save Changes"
          icon={<FaCheck />}
          color="bg-green"
          onClick={() => onSave(row)}
        />
      </div>
    </Modal>
  );
};

export default InventoryModal;
