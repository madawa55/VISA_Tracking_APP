"use client";

import { useState } from "react";
import VisaTracker from "@/components/VisaTracker";
import { dependentVisaSteps } from "@/lib/visaData";

interface DependentTracker {
  id: string;
  name: string;
}

const DEFAULT_DEPENDENTS: DependentTracker[] = [
  { id: "husband", name: "Husband" },
  { id: "daughter", name: "Daughter" }
];

export default function DependentVisaSection() {
  const [dependents, setDependents] = useState<DependentTracker[]>(DEFAULT_DEPENDENTS);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newName, setNewName] = useState("");

  const addDependent = () => {
    if (newName.trim()) {
      const id = newName.toLowerCase().replace(/\s+/g, "-") + "-" + Date.now();
      setDependents([...dependents, { id, name: newName.trim() }]);
      setNewName("");
      setShowAddForm(false);
    }
  };

  const removeDependent = (id: string) => {
    if (confirm("Are you sure you want to remove this dependent visa tracker? All data will be lost.")) {
      setDependents(dependents.filter(d => d.id !== id));
      // Also clear from localStorage
      localStorage.removeItem(`nz-dependent-visa-tracker-${id}`);
    }
  };

  return (
    <section className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">👨‍👩‍👧 Dependent Visas</h2>
          <p className="text-gray-400 mt-1">
            Track visa applications for your family members (spouse/partner, children)
          </p>
        </div>
        
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors"
        >
          <span>+</span> Add Dependent
        </button>
      </div>

      {/* Add Dependent Form */}
      {showAddForm && (
        <div className="bg-purple-950/30 border border-purple-800/30 rounded-xl p-4">
          <div className="flex gap-3 items-end">
            <div className="flex-1">
              <label className="block text-sm font-medium text-purple-300 mb-1">
                Dependent Name
              </label>
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="e.g., Wife, Son, Daughter"
                className="w-full px-3 py-2 bg-gray-900 border border-purple-800/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                onKeyDown={(e) => e.key === "Enter" && addDependent()}
              />
            </div>
            <button
              onClick={addDependent}
              disabled={!newName.trim()}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors"
            >
              Add
            </button>
            <button
              onClick={() => {
                setShowAddForm(false);
                setNewName("");
              }}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Dependent Trackers */}
      <div className="space-y-6">
        {dependents.map((dependent) => (
          <div key={dependent.id} className="relative">
            <VisaTracker
              title={`👤 ${dependent.name}`}
              subtitle={`Dependent visa application for ${dependent.name}`}
              initialSteps={dependentVisaSteps}
              accentColor="purple"
              storageKey={`nz-dependent-visa-tracker-${dependent.id}`}
            />
            
            {/* Remove Button */}
            <button
              onClick={() => removeDependent(dependent.id)}
              className="absolute top-4 right-4 px-3 py-1 text-xs bg-red-600/20 hover:bg-red-600/40 text-red-400 rounded-lg transition-colors"
              title="Remove this dependent tracker"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {dependents.length === 0 && (
        <div className="text-center py-12 bg-gray-900/50 rounded-xl border border-dashed border-gray-700">
          <p className="text-gray-500">No dependent visa trackers yet.</p>
          <button
            onClick={() => setShowAddForm(true)}
            className="mt-2 text-purple-400 hover:text-purple-300 font-medium"
          >
            Add your first dependent
          </button>
        </div>
      )}
    </section>
  );
}
