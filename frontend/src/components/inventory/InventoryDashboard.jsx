import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import frameImg from "../../assets/frame.png";
import SearchBar from "../common/SearchBar";
import { IoClose, IoArrowBack } from "react-icons/io5";
import Button from "../common/Button";
import InventoryModal from "./InventoryModal";

const InventoryDashboard = () => {
  const location = useLocation();
  const jobsite = location.state?.jobsite;
  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingCell, setEditingCell] = useState(null);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchInventory = async () => {
      if (!selectedCategory) return setRows([]);
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/inventory?category=${
            selectedCategory.value
          }`
        );

        const data = await res.json();
        setRows(data);
      } catch (err) {
        console.error("Failed to fetch inventory:", err);
        setRows([]);
      }
    };

    fetchInventory();
  }, [selectedCategory]);

  const handleDoubleClick = (index) => {
    setEditingCell(index);
    setShowModal(true);
  };

  const handleSaveEdit = async (updatedRow) => {
    const newRows = [...rows];
    newRows[editingCell] = updatedRow;
    setRows(newRows);
    setShowModal(false);

    try {
      await fetch(`${import.meta.env.VITE_API_URL}/api/inventory`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          category: selectedCategory.value,
          rows: newRows,
        }),
      });
    } catch (err) {
      console.error("Failed to save changes:", err);
    }
  };

  return (
    <div className="bg-grey min-h-screen p-2 space-y-4">
      <div className="flex flex-col md:flex-row md:h-[80vh] gap-4">
        <div className="bg-white pb-[15px] items-center w-full md:w-1/4 flex flex-col rounded-lg shadow-[0px_1px_4px_0px_#00000040]">
          <div className="p-4 bg-[#F8F8FA] w-full text-center mb-2 ">
            <p className="text-lg font-semibold tracking-wider mb-2 text-left">
              {jobsite.name}
            </p>
          </div>
          <div className="flex flex-wrap gap-2 mb-6 w-full justify-center">
            {jobsite.categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat)}
                className="bg-grey px-2 py-1 rounded-[5px] w-[95%]"
              >
                {cat.label}
              </button>
            ))}
          </div>
          <Button
            text="Go Back"
            icon={<IoArrowBack size={23} />}
            color="bg-blue"
            onClick={() => navigate("/")}
            className="mt-auto"
          />
        </div>

        <div className="w-full md:w-3/4 bg-white overflow-auto rounded-lg shadow-[0px_1px_4px_0px_#00000040]">
          <div className="flex flex-col md:flex-row justify-between items-center mb-4 p-3 bg-[#F8F8FA]">
            <p className="text-lg font-semibold tracking-wider">
              {selectedCategory ? selectedCategory.label : "Data Grid"}
            </p>
            <div className="flex items-center gap-2">
              <SearchBar
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              {selectedCategory && (
                <IoClose
                  className="cursor-pointer"
                  size={20}
                  onClick={() => setSelectedCategory(null)}
                />
              )}
            </div>
          </div>

          {selectedCategory ? (
            <table className="min-w-full table-fixed border-collapse text-center">
              <thead className="bg-white sticky top-0">
                <tr>
                  <th>Nr.</th>
                  <th>Item</th>
                  <th>Quantity</th>
                  <th>Description</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                {rows
                  .filter((row) =>
                    row.item.toLowerCase().includes(search.toLowerCase())
                  )
                  .map((row, i) => (
                    <tr key={i} className="odd:bg-[#F5F5F7]">
                      <td>{i + 1}</td>
                      <td onDoubleClick={() => handleDoubleClick(i)}>
                        {row.item}
                      </td>
                      <td onDoubleClick={() => handleDoubleClick(i)}>
                        {row.quantity}
                      </td>
                      <td onDoubleClick={() => handleDoubleClick(i)}>
                        {row.description}
                      </td>
                      <td onDoubleClick={() => handleDoubleClick(i)}>
                        {row.notes}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          ) : (
            <div className="flex flex-col items-center justify-center h-full md:h-[70%] text-center">
              <img src={frameImg} alt="frame" className="w-48 mb-4" />
              <p className="text-xl font-semibold">No Service Selected</p>
              <p>Please select a service on your left to proceed.</p>
            </div>
          )}
        </div>

        {showModal && editingCell !== null && (
          <InventoryModal
            row={rows[editingCell]}
            index={editingCell}
            rows={rows}
            setRows={setRows}
            onClose={() => setShowModal(false)}
            onSave={handleSaveEdit}
          />
        )}
      </div>
    </div>
  );
};

export default InventoryDashboard;
