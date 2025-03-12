import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';

interface PainPointsEditorProps {
  painPoints: string[];
  onChange: (painPoints: string[]) => void;
}

export function PainPointsEditor({ painPoints, onChange }: PainPointsEditorProps) {
  const [newPoint, setNewPoint] = useState('');

  const handleAddPoint = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPoint.trim()) {
      onChange([...painPoints, newPoint.trim()]);
      setNewPoint('');
    }
  };

  const handleRemovePoint = (index: number) => {
    const updatedPoints = painPoints.filter((_, i) => i !== index);
    onChange(updatedPoints);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Pain Points</h3>
      
      <div className="space-y-2">
        {painPoints.map((point, index) => (
          <div
            key={index}
            className="flex items-center gap-2 p-3 bg-gray-50 rounded-md group"
          >
            <p className="flex-1">{point}</p>
            <button
              onClick={() => handleRemovePoint(index)}
              className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X size={18} />
            </button>
          </div>
        ))}
      </div>

      <form onSubmit={handleAddPoint} className="flex gap-2">
        <input
          type="text"
          value={newPoint}
          onChange={(e) => setNewPoint(e.target.value)}
          placeholder="Add a new pain point..."
          className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-blue-700"
        >
          <Plus size={20} />
          Add
        </button>
      </form>
    </div>
  );
}