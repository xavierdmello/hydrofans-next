"use client";
export const logo = "/logo.png";
export const mostWaterIntakeUsers = [
  {
    rank: 1,
    name: "William",
    waterIntake: 2900,
    metric: 30,
    profilePic: "https://via.placeholder.com/32",
  },
  {
    rank: 2,
    name: "Rian",
    waterIntake: 2600,
    metric: 25,
    profilePic: "https://via.placeholder.com/32",
  },
  {
    rank: 3,
    name: "Ibrakhim",
    waterIntake: 2400,
    metric: 24,
    profilePic: "https://via.placeholder.com/32",
  },
  {
    rank: 4,
    name: "Xavier",
    waterIntake: 2200,
    metric: 34,
    profilePic: "https://via.placeholder.com/32",
  },
];
export const enum STEPS {
  NOT_STARTED,
  RECORDING,
  DONE,
}

export const stepsToStatus = (steps: STEPS): string => {
  switch (steps) {
    case STEPS.NOT_STARTED:
      return "Not Started";
    case STEPS.RECORDING:
      return "Recording";
    case STEPS.DONE:
      return "Complete!";
    default:
      return "Unknown";
  }
};
