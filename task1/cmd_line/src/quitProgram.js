function quitProgramWithErrorMessage(error) {
  console.error(error);
  process.exit(1);
}

export default quitProgramWithErrorMessage;