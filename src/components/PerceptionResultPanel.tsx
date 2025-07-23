import React from "react";

interface Props {
  isLoading: boolean;
  predictionResult: {
    priority: string;
    confidence: number;
    category: string;
  } | null;
}

const PerceptionResultPanel: React.FC<Props> = ({ isLoading, predictionResult }) => {
  if (isLoading) {
    return (
      <div className="p-4 border rounded-md shadow bg-gray-50 animate-pulse">
        <p className="text-sm text-gray-500">Analyzing image...</p>
      </div>
    );
  }

  if (!predictionResult) return null;

  return (
    <div className="p-4 border rounded-md shadow bg-white mt-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">AI Prediction</h3>
      <p><strong>Category:</strong> {predictionResult.category}</p>
      <p><strong>Priority:</strong> {predictionResult.priority}</p>
      <p><strong>Confidence:</strong> {(predictionResult.confidence * 100).toFixed(2)}%</p>
    </div>
  );
};

export default PerceptionResultPanel;
