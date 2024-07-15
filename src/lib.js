import Papa from "papaparse";

export const processCSVData = (file) => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      complete: (results) => {
        const data = results.data;
        const headers = data[0];
        const exerciseData = {};

        for (let i = 1; i < data.length; i++) {
          const row = data[i];
          const exerciseName = row[headers.indexOf("Exercise Name")];
          const date = new Date(row[headers.indexOf("Date")]);
          const weight = parseFloat(row[headers.indexOf("Weight")]);
          const reps = parseInt(row[headers.indexOf("Reps")]);

          if (!exerciseData[exerciseName]) {
            exerciseData[exerciseName] = [];
          }

          exerciseData[exerciseName].push({ date, weight, reps });
        }

        const exercisesWithMoreThan10Entries = Object.keys(exerciseData).filter(
          (exercise) => exerciseData[exercise].length > 10,
        );

        resolve({ exerciseData, exercisesWithMoreThan10Entries });
      },
      error: (error) => {
        reject(error);
      },
    });
  });
};
