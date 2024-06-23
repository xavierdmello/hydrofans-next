"use client";
export const logo = "/logo.png";
export const mostWaterIntakeUsers = [
  {
    rank: 1,
    name: "William",
    waterIntake: 2900,
    metric: 30,
    profilePic:
      "https://paradepets.com/.image/t_share/MTkxMzY1Nzg4MTM5MjAyMTQ2/quokka-on-rottnest-island---western-australia.jpg",
  },
  {
    rank: 2,
    name: "Rian",
    waterIntake: 2600,
    metric: 35,
    profilePic:
      "https://smv.org/media/images/2021.03.10_AnimalCuteness_Getty.width-1000.jpg",
  },
  {
    rank: 3,
    name: "Ibrakhim",
    waterIntake: 2400,
    metric: 24,
    profilePic:
      "https://factanimal.com/wp-content/uploads/2023/03/cute-red-panda.jpg",
  },
  {
    rank: 4,
    name: "Xavier",
    waterIntake: 2200,
    metric: 34,
    profilePic:
      "https://www.travelandleisure.com/thmb/Im8wBNb8RcDKo5-PBiVE5Tsrqps=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/happy-puppy-dog-corgi-SYDPORT1218-b32a3888db1040db801c46450f9c02ff.jpg",
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
