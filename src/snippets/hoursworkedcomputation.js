const grouped = data.reduce((acc, record) => {
  const { machine, timestamps, status } = record;

  // Extract just the date part: "YYYY-MM-DD"
  const date = timestamps.split(" ")[0];

  // Create machine group if not exists
  if (!acc[machine]) acc[machine] = {};

  // Create date group inside machine
  if (!acc[machine][date]) acc[machine][date] = [];

  acc[machine][date].push(record);

  return acc;
}, {});

const result = {};

for (const machine in grouped) {
  result[machine] = [];

  for (const date in grouped[machine]) {
    const logs = grouped[machine][date];

    // Sort logs by timestamps to make sure In is before Out
    logs.sort((a, b) => new Date(a.timestamps) - new Date(b.timestamps));

    const inRecord = logs.find((log) => log.status === "0");
    const outRecord = logs.find((log) => log.status === "1");

    if (inRecord && outRecord) {
      const inTime = new Date(inRecord.timestamps);
      const outTime = new Date(outRecord.timestamps);
      const diffMs = outTime - inTime; // Milliseconds
      const diffHours = diffMs / 1000 / 60 / 60;

      result[machine].push({
        date,
        in: inRecord.timestamps,
        out: outRecord.timestamps,
        hoursWorked: parseFloat(diffHours.toFixed(2)),
      });
    }
  }
}

console.log(result);
