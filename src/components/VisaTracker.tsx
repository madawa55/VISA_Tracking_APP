"use client";

import { useState, useEffect } from "react";
import type { VisaStep, Document, DocumentStatus, StepStatus } from "@/lib/visaData";

// ─── localStorage hook ─────────────────────────────────────────────────────────

function usePersistedSteps(key: string, initialSteps: VisaStep[]): [VisaStep[], React.Dispatch<React.SetStateAction<VisaStep[]>>] {
  const [steps, setSteps] = useState<VisaStep[]>(() => {
    if (typeof window === "undefined") return initialSteps;
    try {
      const saved = localStorage.getItem(key);
      if (saved) return JSON.parse(saved) as VisaStep[];
    } catch {
      // ignore parse errors
    }
    return initialSteps;
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(steps));
    } catch {
      // ignore storage errors (e.g. private browsing quota)
    }
  }, [key, steps]);

  return [steps, setSteps];
}

// ─── Status helpers ────────────────────────────────────────────────────────────

const stepStatusConfig: Record<StepStatus, { label: string; color: string; bg: string; ring: string }> = {
  "not-started": { label: "Not Started", color: "text-gray-400", bg: "bg-gray-700", ring: "ring-gray-600" },
  "in-progress": { label: "In Progress", color: "text-yellow-400", bg: "bg-yellow-900/40", ring: "ring-yellow-500" },
  completed: { label: "Completed", color: "text-green-400", bg: "bg-green-900/40", ring: "ring-green-500" },
  blocked: { label: "Blocked", color: "text-red-400", bg: "bg-red-900/40", ring: "ring-red-500" },
};

const docStatusConfig: Record<DocumentStatus, { label: string; color: string; dot: string }> = {
  pending: { label: "Pending", color: "text-gray-400", dot: "bg-gray-500" },
  collected: { label: "Collected ✓", color: "text-blue-400", dot: "bg-blue-500" },
  submitted: { label: "Submitted ✓", color: "text-yellow-400", dot: "bg-yellow-500" },
  approved: { label: "Approved ✓", color: "text-green-400", dot: "bg-green-500" },
};

// ─── Document Row ──────────────────────────────────────────────────────────────

function DocumentRow({
  doc,
  onStatusChange,
  onEdit,
  onDelete,
}: {
  doc: Document;
  onStatusChange: (id: string, status: DocumentStatus) => void;
  onEdit: (id: string, updated: Partial<Document>) => void;
  onDelete: (id: string) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [editName, setEditName] = useState(doc.name);
  const [editDesc, setEditDesc] = useState(doc.description);
  const [editRequired, setEditRequired] = useState(doc.required);

  const cfg = docStatusConfig[doc.status];

  const handleSave = () => {
    onEdit(doc.id, {
      name: editName.trim() || doc.name,
      description: editDesc.trim(),
      required: editRequired,
    });
    setEditing(false);
  };

  const handleCancel = () => {
    setEditName(doc.name);
    setEditDesc(doc.description);
    setEditRequired(doc.required);
    setEditing(false);
  };

  if (editing) {
    return (
      <div className="py-3 border-b border-white/5 last:border-0">
        <div className="flex flex-col gap-2">
          {/* Name */}
          <input
            type="text"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            placeholder="Document name"
            className="text-sm bg-gray-900 border border-blue-500/50 rounded px-2 py-1 text-white focus:outline-none focus:ring-1 focus:ring-blue-500 w-full"
          />
          {/* Description */}
          <textarea
            value={editDesc}
            onChange={(e) => setEditDesc(e.target.value)}
            placeholder="Description (optional)"
            rows={2}
            className="text-xs bg-gray-900 border border-white/10 rounded px-2 py-1 text-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 w-full resize-none"
          />
          {/* Required toggle */}
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <div
              onClick={() => setEditRequired(!editRequired)}
              className={`w-8 h-4 rounded-full transition-colors duration-200 flex items-center px-0.5 ${
                editRequired ? "bg-red-500" : "bg-gray-600"
              }`}
            >
              <div
                className={`w-3 h-3 rounded-full bg-white shadow transition-transform duration-200 ${
                  editRequired ? "translate-x-4" : "translate-x-0"
                }`}
              />
            </div>
            <span className="text-xs text-gray-400">
              {editRequired ? "Required" : "Optional"}
            </span>
          </label>
          {/* Actions */}
          <div className="flex gap-2 mt-1">
            <button
              onClick={handleSave}
              className="text-xs bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 rounded transition-colors"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="text-xs bg-gray-700 hover:bg-gray-600 text-gray-300 px-3 py-1 rounded transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => onDelete(doc.id)}
              className="text-xs bg-red-900/50 hover:bg-red-800/60 text-red-300 px-3 py-1 rounded transition-colors ml-auto"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-3 py-2 border-b border-white/5 last:border-0 group">
      <span className={`mt-1.5 w-2 h-2 rounded-full flex-shrink-0 ${cfg.dot}`} />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm text-white font-medium">{doc.name}</span>
          {doc.required && (
            <span className="text-xs bg-red-900/50 text-red-300 px-1.5 py-0.5 rounded">Required</span>
          )}
        </div>
        {doc.description && (
          <p className="text-xs text-gray-400 mt-0.5">{doc.description}</p>
        )}
      </div>
      {/* Edit button — visible on hover */}
      <button
        onClick={() => setEditing(true)}
        title="Edit document"
        className="opacity-0 group-hover:opacity-100 text-gray-500 hover:text-blue-400 transition-all flex-shrink-0 mt-0.5 text-xs px-1.5 py-0.5 rounded hover:bg-blue-900/30"
      >
        ✏️
      </button>
      <select
        value={doc.status}
        onChange={(e) => onStatusChange(doc.id, e.target.value as DocumentStatus)}
        className="text-xs bg-gray-800 border border-white/10 rounded px-2 py-1 text-gray-300 cursor-pointer flex-shrink-0 focus:outline-none focus:ring-1 focus:ring-blue-500"
      >
        <option value="pending">Pending</option>
        <option value="collected">Collected</option>
        <option value="submitted">Submitted</option>
        <option value="approved">Approved</option>
      </select>
    </div>
  );
}

// ─── Add Document Form ─────────────────────────────────────────────────────────

function AddDocumentForm({ onAdd }: { onAdd: (doc: Omit<Document, "id">) => void }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [required, setRequired] = useState(false);

  const handleAdd = () => {
    if (!name.trim()) return;
    onAdd({ name: name.trim(), description: desc.trim(), status: "pending", required });
    setName("");
    setDesc("");
    setRequired(false);
    setOpen(false);
  };

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="mt-2 w-full text-xs text-blue-400 hover:text-blue-300 border border-dashed border-blue-500/30 hover:border-blue-400/50 rounded-lg py-2 transition-colors flex items-center justify-center gap-1"
      >
        <span>+</span> Add Document
      </button>
    );
  }

  return (
    <div className="mt-2 bg-gray-900/60 border border-blue-500/30 rounded-lg p-3 flex flex-col gap-2">
      <p className="text-xs font-semibold text-blue-400 mb-1">New Document</p>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Document name *"
        className="text-sm bg-gray-900 border border-white/10 rounded px-2 py-1 text-white focus:outline-none focus:ring-1 focus:ring-blue-500 w-full"
        autoFocus
      />
      <textarea
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        placeholder="Description (optional)"
        rows={2}
        className="text-xs bg-gray-900 border border-white/10 rounded px-2 py-1 text-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 w-full resize-none"
      />
      <label className="flex items-center gap-2 cursor-pointer select-none">
        <div
          onClick={() => setRequired(!required)}
          className={`w-8 h-4 rounded-full transition-colors duration-200 flex items-center px-0.5 ${
            required ? "bg-red-500" : "bg-gray-600"
          }`}
        >
          <div
            className={`w-3 h-3 rounded-full bg-white shadow transition-transform duration-200 ${
              required ? "translate-x-4" : "translate-x-0"
            }`}
          />
        </div>
        <span className="text-xs text-gray-400">{required ? "Required" : "Optional"}</span>
      </label>
      <div className="flex gap-2 mt-1">
        <button
          onClick={handleAdd}
          disabled={!name.trim()}
          className="text-xs bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed text-white px-3 py-1 rounded transition-colors"
        >
          Add
        </button>
        <button
          onClick={() => { setOpen(false); setName(""); setDesc(""); setRequired(false); }}
          className="text-xs bg-gray-700 hover:bg-gray-600 text-gray-300 px-3 py-1 rounded transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

// ─── Step Card ─────────────────────────────────────────────────────────────────

function StepCard({
  step,
  onDocStatusChange,
  onStepStatusChange,
  onDocEdit,
  onDocDelete,
  onDocAdd,
  isLast,
}: {
  step: VisaStep;
  onDocStatusChange: (stepId: string, docId: string, status: DocumentStatus) => void;
  onStepStatusChange: (stepId: string, status: StepStatus) => void;
  onDocEdit: (stepId: string, docId: string, updated: Partial<Document>) => void;
  onDocDelete: (stepId: string, docId: string) => void;
  onDocAdd: (stepId: string, doc: Omit<Document, "id">) => void;
  isLast: boolean;
}) {
  const [expanded, setExpanded] = useState(step.status === "in-progress");
  const cfg = stepStatusConfig[step.status];

  const totalDocs = step.documents.length;
  const doneDocs = step.documents.filter((d) => d.status === "collected" || d.status === "submitted" || d.status === "approved").length;
  const progress = totalDocs > 0 ? Math.round((doneDocs / totalDocs) * 100) : 0;

  return (
    <div className="flex gap-4">
      {/* Timeline */}
      <div className="flex flex-col items-center">
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ring-2 flex-shrink-0 ${cfg.bg} ${cfg.ring} ${cfg.color}`}
        >
          {step.status === "completed" ? "✓" : step.stepNumber}
        </div>
        {!isLast && <div className="w-0.5 flex-1 bg-white/10 mt-1" />}
      </div>

      {/* Card */}
      <div className={`flex-1 mb-6 rounded-xl border border-white/10 overflow-hidden ${cfg.bg}`}>
        {/* Header */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full text-left px-5 py-4 flex items-start justify-between gap-3 hover:bg-white/5 transition-colors"
        >
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-white font-semibold">{step.title}</h3>
              <span className={`text-xs px-2 py-0.5 rounded-full bg-black/20 ${cfg.color}`}>{cfg.label}</span>
            </div>
            <p className="text-sm text-gray-400 mt-1">{step.description}</p>
            {step.estimatedDays && (
              <p className="text-xs text-gray-500 mt-1">⏱ Estimated: {step.estimatedDays}</p>
            )}
            {/* Progress bar */}
            {totalDocs > 0 && (
              <div className="mt-3 flex items-center gap-2">
                <div className="flex-1 h-1.5 bg-black/30 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 rounded-full transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <span className="text-xs text-gray-400 flex-shrink-0">
                  {doneDocs}/{totalDocs} docs
                </span>
              </div>
            )}
          </div>
          <span className="text-gray-400 text-lg mt-0.5">{expanded ? "▲" : "▼"}</span>
        </button>

        {/* Expanded content */}
        {expanded && (
          <div className="px-5 pb-5 border-t border-white/10">
            {/* Status control */}
            <div className="flex items-center gap-3 mt-4 mb-4">
              <span className="text-xs text-gray-400">Step Status:</span>
              <select
                value={step.status}
                onChange={(e) => onStepStatusChange(step.id, e.target.value as StepStatus)}
                className="text-xs bg-gray-800 border border-white/10 rounded px-2 py-1 text-gray-300 cursor-pointer focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="not-started">Not Started</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="blocked">Blocked</option>
              </select>
            </div>

            {/* Documents */}
            <div className="mb-4">
              <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Documents Checklist
              </h4>
              <div className="bg-black/20 rounded-lg px-3 py-1">
                {step.documents.length === 0 && (
                  <p className="text-xs text-gray-500 py-2 text-center">No documents yet. Add one below.</p>
                )}
                {step.documents.map((doc) => (
                  <DocumentRow
                    key={doc.id}
                    doc={doc}
                    onStatusChange={(docId, status) => onDocStatusChange(step.id, docId, status)}
                    onEdit={(docId, updated) => onDocEdit(step.id, docId, updated)}
                    onDelete={(docId) => onDocDelete(step.id, docId)}
                  />
                ))}
              </div>
              <AddDocumentForm onAdd={(doc) => onDocAdd(step.id, doc)} />
            </div>

            {/* Tips */}
            {step.tips && step.tips.length > 0 && (
              <div>
                <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                  💡 Tips
                </h4>
                <ul className="space-y-1">
                  {step.tips.map((tip, i) => (
                    <li key={i} className="text-xs text-gray-400 flex gap-2">
                      <span className="text-blue-400 flex-shrink-0">•</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Overall Progress Bar ──────────────────────────────────────────────────────

function OverallProgress({ steps }: { steps: VisaStep[] }) {
  const completed = steps.filter((s) => s.status === "completed").length;
  const inProgress = steps.filter((s) => s.status === "in-progress").length;
  const total = steps.length;
  const pct = Math.round((completed / total) * 100);

  const allDocs = steps.flatMap((s) => s.documents);
  const collectedDocs = allDocs.filter(
    (d) => d.status === "collected" || d.status === "submitted" || d.status === "approved"
  ).length;

  return (
    <div className="bg-gray-800/60 rounded-2xl p-5 mb-6 border border-white/10">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-white font-semibold">Overall Progress</h3>
        <span className="text-2xl font-bold text-blue-400">{pct}%</span>
      </div>
      <div className="h-3 bg-gray-700 rounded-full overflow-hidden mb-3">
        <div
          className="h-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-full transition-all duration-700"
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="flex gap-4 text-xs text-gray-400 flex-wrap">
        <span>
          <span className="text-green-400 font-medium">{completed}</span> steps completed
        </span>
        <span>
          <span className="text-yellow-400 font-medium">{inProgress}</span> in progress
        </span>
        <span>
          <span className="text-blue-400 font-medium">{collectedDocs}</span>/{allDocs.length} documents collected
        </span>
      </div>
    </div>
  );
}

// ─── Main Tracker Component ────────────────────────────────────────────────────

export default function VisaTracker({
  title,
  subtitle,
  initialSteps,
  accentColor = "blue",
  storageKey,
}: {
  title: string;
  subtitle: string;
  initialSteps: VisaStep[];
  accentColor?: "blue" | "purple";
  storageKey?: string;
}) {
  const [steps, setSteps] = usePersistedSteps(storageKey ?? `visa-tracker-${title}`, initialSteps);

  const handleDocStatusChange = (stepId: string, docId: string, status: DocumentStatus) => {
    setSteps((prev) =>
      prev.map((step) =>
        step.id === stepId
          ? {
              ...step,
              documents: step.documents.map((doc) =>
                doc.id === docId ? { ...doc, status } : doc
              ),
            }
          : step
      )
    );
  };

  const handleDocEdit = (stepId: string, docId: string, updated: Partial<Document>) => {
    setSteps((prev) =>
      prev.map((step) =>
        step.id === stepId
          ? {
              ...step,
              documents: step.documents.map((doc) =>
                doc.id === docId ? { ...doc, ...updated } : doc
              ),
            }
          : step
      )
    );
  };

  const handleDocDelete = (stepId: string, docId: string) => {
    setSteps((prev) =>
      prev.map((step) =>
        step.id === stepId
          ? { ...step, documents: step.documents.filter((doc) => doc.id !== docId) }
          : step
      )
    );
  };

  const handleDocAdd = (stepId: string, doc: Omit<Document, "id">) => {
    const newDoc: Document = {
      ...doc,
      id: `${stepId}-doc-${Date.now()}`,
    };
    setSteps((prev) =>
      prev.map((step) =>
        step.id === stepId
          ? { ...step, documents: [...step.documents, newDoc] }
          : step
      )
    );
  };

  const handleStepStatusChange = (stepId: string, status: StepStatus) => {
    setSteps((prev) =>
      prev.map((step) => (step.id === stepId ? { ...step, status } : step))
    );
  };

  const gradient = accentColor === "purple"
    ? "from-purple-600 to-purple-400"
    : "from-blue-600 to-blue-400";

  return (
    <div>
      {/* Section header */}
      <div className="mb-6">
        <h2 className={`text-2xl font-bold bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>
          {title}
        </h2>
        <p className="text-gray-400 mt-1 text-sm">{subtitle}</p>
      </div>

      <OverallProgress steps={steps} />

      {/* Steps */}
      <div>
        {steps.map((step, idx) => (
          <StepCard
            key={step.id}
            step={step}
            onDocStatusChange={handleDocStatusChange}
            onStepStatusChange={handleStepStatusChange}
            onDocEdit={handleDocEdit}
            onDocDelete={handleDocDelete}
            onDocAdd={handleDocAdd}
            isLast={idx === steps.length - 1}
          />
        ))}
      </div>
    </div>
  );
}
