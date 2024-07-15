import React, { useState } from "react";
import FileUpload from "./components/FileUpload";
import { processCSVData } from "./lib";
import ProgressionChart from "./components/ProgressionChart";

import "./index.css";

const ExerciseProgressionApp = () => {
  const [exerciseData, setExerciseData] = useState(null);
  const [selectedExercise, setSelectedExercise] = useState(null);

  const handleFileUpload = async (file) => {
    try {
      const { exerciseData, exercisesWithMoreThan10Entries } =
        await processCSVData(file);
      setExerciseData({
        data: exerciseData,
        exercises: exercisesWithMoreThan10Entries,
      });
      if (exercisesWithMoreThan10Entries.length > 0) {
        setSelectedExercise(exercisesWithMoreThan10Entries[0]);
      }
    } catch (error) {
      console.error("Error processing CSV file:", error);
    }
  };

  const prepareChartData = (data, volumeCalculation = false) => {
    return data
      .map((entry) => ({
        date: entry.date,
        weight: volumeCalculation ? entry.weight * entry.reps : entry.weight,
      }))
      .sort((a, b) => new Date(a.date) - new Date(b.date));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Exercise Progression Tracker</h1>
      {!exerciseData && <FileUpload onFileUpload={handleFileUpload} />}
      {exerciseData && (
        <div>
          <select
            className="mb-4 p-2 border rounded"
            value={selectedExercise}
            onChange={(e) => setSelectedExercise(e.target.value)}
          >
            {exerciseData.exercises.map((exercise) => (
              <option key={exercise} value={exercise}>
                {exercise}
              </option>
            ))}
          </select>
          {selectedExercise && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ProgressionChart
                data={prepareChartData(exerciseData.data[selectedExercise])}
                title={`${selectedExercise} - Best Set`}
                yAxisLabel="Weight (lbs)"
              />
              <ProgressionChart
                data={prepareChartData(
                  exerciseData.data[selectedExercise],
                  true,
                )}
                title={`${selectedExercise} - Total Volume`}
                yAxisLabel="Volume (lbs)"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ExerciseProgressionApp;
