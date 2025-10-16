
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import axios from "axios";

interface Test {
  _id?: string;
  testName: string;
  price: string;
  precaution: string;
  description: string;
  category?: string;
  customCategory?: string;
}

interface PostTestResponse {
  tests: Test[];
  message: string;
}

interface LabDashboardContext {
  labId: string | null;
}

interface UpdateTestResponse {
  updatedTest: Test;
  message: string;
}

const categories = [
  "Liver",
  "Kidney",
  "Diabetes",
  "Fever",
  "Vitamin",
  "Pregnancy",
  "Heart",
  "Other",
];

const LabTests: React.FC = () => {
  const { labId } = useOutletContext<LabDashboardContext>();

  const [form, setForm] = useState<Test>({
    testName: "",
    price: "",
    precaution: "",
    description: "",
    category: "",
    customCategory: "",
  });

  const [tests, setTests] = useState<Test[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch existing tests
  useEffect(() => {
    if (!labId) return;

    const fetchTests = async () => {
      setLoading(true);
      try {
        const res = await axios.get<{ tests: Test[] }>(
          `http://localhost:3000/api/lab/getAllTestByLabId/${labId}`
        );
        setTests(res.data.tests || []);
      } catch (err) {
        console.error("Error fetching tests:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTests();
  }, [labId]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add or Update Test
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!labId) return alert("Lab ID not found!");

    try {
      if (form._id) {
        // Update existing test
        const res = await axios.put<UpdateTestResponse>(
          `http://localhost:3000/api/lab/updateLabTest/${form._id}`,
          {
            testName: form.testName,
            price: Number(form.price),
            precaution: form.precaution,
            description: form.description,
            category:
              form.category === "Other" ? form.customCategory : form.category,
          }
        );

        // Now TypeScript knows the type of res.data
        setTests((prev) =>
          prev.map((t) => (t._id === form._id ? res.data.updatedTest : t))
        );

        alert("Test updated successfully!");
      } else {
        // Add new test
        const payload = [
          {
            testName: form.testName,
            price: Number(form.price),
            precaution: form.precaution,
            description: form.description,
            category:
              form.category === "Other" ? form.customCategory : form.category,
            labId,
          },
        ];
        const res = await axios.post<PostTestResponse>(
          `http://localhost:3000/api/lab/addTest`,
          payload
        );
        setTests((prev) => [...prev, ...res.data.tests]);
        alert("Test added successfully!");
      }

      // Reset form
      setForm({
        testName: "",
        price: "",
        precaution: "",
        description: "",
        category: "",
        customCategory: "",
      });
    } catch (err) {
      console.error("Error adding/updating test:", err);
      alert("Failed to add/update test!");
    }
  };

  // Delete test
  const handleDelete = async (testId: string) => {
    if (!window.confirm("Are you sure you want to delete this test?")) return;

    try {
      await axios.delete(
        `http://localhost:3000/api/lab/deleteLabTest/${testId}`
      );
      setTests((prev) => prev.filter((t) => t._id !== testId));
      alert("Test deleted successfully!");
    } catch (err) {
      console.error("Error deleting test:", err);
      alert("Failed to delete test.");
    }
  };

  // Edit test
  const handleEdit = (test: Test) => {
    setForm({
      testName: test.testName,
      price: test.price.toString(),
      precaution: test.precaution,
      description: test.description,
      category: test.category,
      customCategory:
        test.category === "Other" ? test.customCategory || "" : "",
      _id: test._id,
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">
        {form._id ? "Edit Lab Test" : "Add Lab Test"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
        <input
          className="w-full border p-2 rounded"
          name="testName"
          placeholder="Test Name"
          value={form.testName}
          onChange={handleChange}
        />
        <input
          className="w-full border p-2 rounded"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
        />
        <input
          className="w-full border p-2 rounded"
          name="precaution"
          placeholder="Precautions"
          value={form.precaution}
          onChange={handleChange}
        />
        <textarea
          className="w-full border p-2 rounded"
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        />

        <select
          className="w-full border p-2 rounded"
          name="category"
          value={form.category}
          onChange={handleChange}
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        {form.category === "Other" && (
          <input
            className="w-full border p-2 rounded"
            name="customCategory"
            placeholder="Enter custom category"
            value={form.customCategory}
            onChange={handleChange}
          />
        )}

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {form._id ? "Update Test" : "Save Test"}
        </button>
      </form>

      {/* Existing Tests */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-3">Existing Tests</h3>

        {loading ? (
          <p>Loading tests...</p>
        ) : tests.length > 0 ? (
          <ul className="space-y-2">
            {tests.map((test) => (
              <li
                key={test._id}
                className="border p-3 rounded bg-gray-50 flex flex-col sm:flex-row sm:justify-between sm:items-center"
              >
                <div className="mb-2 sm:mb-0">
                  <div className="font-bold">{test.testName}</div>
                  <div>₹{test.price}</div>
                  <div className="text-sm text-gray-600">
                    {test.description}
                  </div>
                  <div className="text-sm text-gray-500 italic">
                    Category: {test.category}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(test)}
                    className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(test._id!)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No tests added yet.</p>
        )}
      </div>
    </div>
  );
};



























export default LabTests;